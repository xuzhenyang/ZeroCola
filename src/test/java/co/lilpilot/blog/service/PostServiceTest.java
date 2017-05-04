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

import java.util.ArrayList;
import java.util.List;

/**
 * PostService Tester.
 *
 * @author <Authors name>
 * @version 1.0
 * @since <pre>���� 2, 2017</pre>
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class PostServiceTest {

    @Autowired
    private PostService postService;

    @Before
    public void before() throws Exception {
    }

    @After
    public void after() throws Exception {
    }

    /**
     * Method: getByTitle(String title)
     */
    @Test
    public void testGetByTitle() throws Exception {
        Assert.assertNull(postService.getByTitle("test"));
        Post post = new Post();
        post.setTitle("test");
        post.setContent("hello world");
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
        Post post = new Post();
        post.setTitle("test");
        post.setContent("hello world");
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
