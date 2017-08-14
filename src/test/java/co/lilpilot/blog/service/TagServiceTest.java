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
 * TagService Tester.
 *
 * @author <Authors name>
 * @version 1.0
 * @since <pre>05/07/2017</pre>
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class TagServiceTest {

    @Autowired
    private TagService tagService;
    @Autowired
    private PostService postService;

    @Before
    public void before() throws Exception {

    }

    @After
    public void after() throws Exception {

    }

    public static Tag createTag(String name) {
        Tag tag = new Tag();
        tag.setName(name);
        return tag;
    }

    /**
     * Method: getAllTags()
     */
    @Test
    public void testGetAllTags() throws Exception {
        Assert.assertEquals(0, tagService.getAllTags().size());
        Tag tag_1 = createTag("test1");
        Tag tag_2 = createTag("test2");
        tagService.saveOrUpdate(tag_1);
        tagService.saveOrUpdate(tag_2);
        Assert.assertEquals(2, tagService.getAllTags().size());
    }

    /**
     * Method: getByName(String name)
     */
    @Test
    public void testGetByName() throws Exception {
        Tag tag = createTag("test");
        tagService.saveOrUpdate(tag);
        Tag result = tagService.getByName("test");
        Assert.assertNotNull(result);
    }

    /*
    * test the link of post and test
    * */
    @Test
    public void testLink() {
        Tag tag = createTag("link_test");
        Post post_1 = PostServiceTest.createPost("test1", "hello1", tag);
        Post post_2 = PostServiceTest.createPost("test2", "hello2", tag);
        postService.createPost(post_1);
        postService.createPost(post_2);
        Tag result = tagService.getByName("link_test");
        Assert.assertEquals(2, result.getPosts().size());
    }

    /**
     * Method: saveOrUpdate(Tag tag)
     */
    @Test
    public void testSaveOrUpdate() throws Exception {
        //test save
        Assert.assertNull(tagService.getByName("test"));
        Tag tag = createTag("test");
        tagService.saveOrUpdate(tag);
        Tag result = tagService.getByName("test");
        Assert.assertNotNull(result);

        //test update
        Assert.assertNull(tagService.getByName("update_test"));
        tag.setName("update_test");
        tagService.saveOrUpdate(tag);
        result = tagService.getByName("update_test");
        Assert.assertNotNull(result);
    }

    /**
     * Method: delete(Tag tag)
     */
    @Test
    public void testDelete() throws Exception {
        Tag tag = createTag("tag_test");
        tag = tagService.saveOrUpdate(tag);
        Assert.assertNotNull(tag);
        tagService.delete(tag);
        Assert.assertNull(tagService.getByName("tag_test_1"));
    }

    @Test
    public void testDeleteLink() throws Exception {
        Tag tag1 = createTag("tag_test_1");
        Tag tag2 = createTag("tag_test_2");
        Post post = new Post();
        post.setTitle("test_post");
        post.setContent("content");
        post.addTag(tag1);
        post.addTag(tag2);
        Post result = postService.createPost(post);
        Assert.assertNotNull(result);
        Assert.assertEquals(2, result.getTags().size());
        tag1 = tagService.getByName("tag_test_1");
        tagService.delete(tag1);
        result = postService.getByTitle("test_post");
        System.out.println(result.getTags());
        Assert.assertNull(tagService.getByName("tag_test_1"));
        result = postService.getByTitle("test_post");
        Assert.assertEquals(1, result.getTags().size());
        Assert.assertEquals("tag_test_2", result.getTags().get(0).getName());
    }

} 
