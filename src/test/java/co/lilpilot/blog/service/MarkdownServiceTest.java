package co.lilpilot.blog.service;

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
 * MarkdownService Tester.
 *
 * @author <Authors name>
 * @version 1.0
 * @since <pre>05/08/2017</pre>
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class MarkdownServiceTest {

    @Autowired
    private MarkdownService markdownService;

    @Before
    public void before() throws Exception {

    }

    @After
    public void after() throws Exception {

    }

    /**
     * Method: markdownToHtml(String markdownSource)
     */
    @Test
    public void testMarkdownToHtml() throws Exception {
        String content = "## test";
        String result = markdownService.markdownToHtml(content);
        Assert.assertEquals("<h2>test</h2>\n", result);
    }
}
