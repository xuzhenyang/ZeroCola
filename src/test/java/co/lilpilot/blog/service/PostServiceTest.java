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

    public static Post createPost(String title, String content, Tag tag) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.addTag(tag);
        return post;
    }

    /**
     * Method: getAllPosts()
     */
    @Test
    public void testGetAllPosts() throws Exception {
        Assert.assertEquals(0, postService.getAllPosts().size());
        Post post_1 = createPost("test1");
        Post post_2 = createPost("test2");
        postService.saveOrUpdate(post_1);
        postService.saveOrUpdate(post_2);
        Assert.assertEquals(2, postService.getAllPosts().size());
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

        //test update
        Assert.assertNull(postService.getByTitle("update_test"));
        post.setTitle("update_test");
        postService.saveOrUpdate(post);
        Assert.assertNotNull(postService.getByTitle("update_test"));
    }


}
