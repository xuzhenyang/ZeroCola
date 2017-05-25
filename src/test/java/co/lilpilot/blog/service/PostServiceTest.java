package co.lilpilot.blog.service;

import co.lilpilot.blog.model.Post;
import co.lilpilot.blog.model.Tag;
import org.junit.Assert;
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * PostService Tester.
 *
 * @author <Authors name>
 * @version 1.0
 * @since <pre>05/07/2017</pre>
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class PostServiceTest {

    @Autowired
    private PostService postService;
    @Autowired
    private TagService tagService;

    @Before
    public void before() throws Exception {

    }

    @After
    public void after() throws Exception {

    }

    public static Post createPost(String title) {
        Post post = new Post();
        post.setTitle(title);
        return post;
    }

    public static Post createPost(String title, String content) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        return post;
    }

    public static Post createPost(String title, String content, Integer status) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setStatus(status);
        return post;
    }

    public static Post createPost(String title, String content, Tag tag) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.addTag(tag);
        return post;
    }

    /**
     * Method: getById(Long id)
     */
    @Test
    public void testGetById() throws Exception {
        Post post = createPost("test");
        Post result = postService.saveOrUpdate(post);
        Assert.assertEquals(result, postService.getById(result.getId()));
    }

    /**
     * Method: getAllPosts()
     */
    @Test
    public void testGetAllPosts() throws Exception {
        Assert.assertEquals(0, postService.getAllPosts(0, 10).getContent().size());
        Post post_1 = createPost("test1");
        Post post_2 = createPost("test2");
        postService.saveOrUpdate(post_1);
        postService.saveOrUpdate(post_2);
        Assert.assertEquals(2, postService.getAllPosts(0, 10).getContent().size());
        // test for pageable
        Assert.assertEquals(1, postService.getAllPosts(0, 1).getContent().size());
    }

    /**
     *
     * Method: getAllOpenPosts(Integer page, Integer pageSize)
     *
     */
    @Test
    public void testGetAllOpenPosts() throws Exception {
        Assert.assertEquals(0, postService.getAllOpenPosts(0, 10).getContent().size());
        Post post_1 = createPost("test1", "hello", 1);
        Post post_2 = createPost("test2", "hello", 0);
        Post post_3 = createPost("test2", "hello", 1);
        postService.saveOrUpdate(post_1);
        postService.saveOrUpdate(post_2);
        postService.saveOrUpdate(post_3);
        Assert.assertEquals(2, postService.getAllOpenPosts(0, 10).getContent().size());
        // test for pageable
        Assert.assertEquals(1, postService.getAllPosts(0, 1).getContent().size());

    }

    /**
     *
     * Method: getOpenPostsByKeyword(String keyword, Integer page, Integer pageSize)
     *
     */
    @Test
    public void testGetOpenPostsByKeyword() throws Exception {
        Assert.assertEquals(0, postService.getOpenPostsByKeyword("test", 0, 10).getContent().size());
        Post post_1 = createPost("test", "hello", 1);
        //closed post
        Post post_2 = createPost("test2333", "hello", 0);
        Post post_3 = createPost("test6", "hello", 1);
        //keyword not mapped
        Post post_4 = createPost("hello", "test", 1);
        postService.saveOrUpdate(post_1);
        postService.saveOrUpdate(post_2);
        postService.saveOrUpdate(post_3);
        postService.saveOrUpdate(post_4);
        Assert.assertEquals(4, postService.getAllPosts(0, 10).getContent().size());
        Assert.assertEquals(2, postService.getOpenPostsByKeyword("test", 0, 10).getContent().size());
    }

    /**
     *
     * Method: getOpenPostById(Long id)
     *
     */
    @Test
    public void testGetOpenPostById() throws Exception {
        Post post = createPost("test", "test", 0);
        post = postService.saveOrUpdate(post);
        Assert.assertNotNull(postService.getById(post.getId()));
        Assert.assertNull(postService.getOpenPostById(post.getId()));
    }


    /**
     * Method: getByTitle(String title)
     */
    @Test
    public void testGetByTitle() throws Exception {
        Assert.assertNull(postService.getByTitle("test"));
        Post post = createPost("test", "hello world");
        Tag tag = new Tag();
        tag.setName("tag_test");
        post.addTag(tag);
        postService.saveOrUpdate(post);
        Assert.assertNotNull(postService.getByTitle("test"));
    }

    /**
     * Method: saveOrUpdate(Post post)
     */
    @Test
    public void testSaveOrUpdate() throws Exception {
        //test save
        Assert.assertNull(postService.getByTitle("test"));
        Post post = createPost("test", "hello world");
        Tag tag = new Tag();
        tag.setName("tag_test");
        post.addTag(tag);
        postService.saveOrUpdate(post);
        Assert.assertNotNull(postService.getByTitle("test"));
        Assert.assertNotNull(tagService.getByName("tag_test"));

        //测试保存post 其中属性已包含tags
        Assert.assertNull(postService.getByTitle("test_2"));
        post = createPost("test_2", "hello world");
        tag = new Tag();
        tag.setName("tag_test_2");
        List<Tag> tagList = new ArrayList<>();
        tagList.add(tag);
        post.setTags(tagList);
        postService.saveOrUpdate(post);
        Assert.assertNotNull(postService.getByTitle("test_2").getTags());
        Assert.assertEquals(1, postService.getByTitle("test_2").getTags().size());
        Assert.assertNotNull(tagService.getByName("tag_test_2"));
        Assert.assertNotNull(tagService.getByName("tag_test_2").getPosts());

        //test update
        Assert.assertNull(postService.getByTitle("update_test"));
        post.setTitle("update_test");
        postService.saveOrUpdate(post);
        Assert.assertNotNull(postService.getByTitle("update_test"));
    }

    /**
     *
     * Method: close(Post post)
     *
     */
    @Test
    public void testClose() throws Exception {
        Post post = createPost("test", "hello world", 1);
        post = postService.saveOrUpdate(post);
        Assert.assertEquals(1, postService.getAllOpenPosts(0, 10).getContent().size());
        postService.close(post);
        Assert.assertEquals(0, postService.getAllOpenPosts(0, 10).getContent().size());
    }



}
