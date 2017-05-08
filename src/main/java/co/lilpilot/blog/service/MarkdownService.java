package co.lilpilot.blog.service;

import org.markdown4j.Markdown4jProcessor;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * Created by lilpilot on 2017/5/8.
 */
@Service
public class MarkdownService {

    private Markdown4jProcessor markdown4jProcessor = new Markdown4jProcessor();

    public String markdownToHtml(String markdownSource){
        String html = "";
        try {
            html = this.markdown4jProcessor.process(markdownSource);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return html;
    }
}
