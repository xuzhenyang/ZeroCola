package co.lilpilot.blog.service;

import co.lilpilot.blog.model.Post;
import co.lilpilot.blog.repository.PostRepository;
import com.google.common.base.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lilpilot on 2017/5/2.
 */
@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private MarkdownService markdownService;

    public Page<Post> getAllPosts(Integer page, Integer pageSize) {
        return postRepository.findAll(new PageRequest(page, pageSize));
    }

    public Page<Post> getAllOpenPosts(Integer page, Integer pageSize) {
        return postRepository.findAllOpenPosts(new PageRequest(page, pageSize));
    }

    public Page<Post> getOpenPostsByKeyword(String keyword, Integer page, Integer pageSize) {
        if(Strings.isNullOrEmpty(keyword)) {
            throw new IllegalArgumentException("keyword is null or empty");
        }
        return postRepository.findOpenPostsByKeyword(keyword, new PageRequest(page, pageSize));
    }

    public Post getById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("id is null");
        }
        return postRepository.findOne(id);
    }

    public Post getByTitle(String title) {
        if (Strings.isNullOrEmpty(title)) {
            throw new IllegalArgumentException("title is null or empty");
        }
        return postRepository.findByTitle(title);
    }

    public Post saveOrUpdate(Post post) {
        if (post == null) {
            throw new IllegalArgumentException("post is null");
        }
        //render markdown content
        post.setRenderedContent(markdownService.markdownToHtml(post.getContent()));
        return postRepository.save(post);
    }

    public Post close(Post post) {
        if (post == null) {
            throw new IllegalArgumentException("post is null");
        }
        // 0:close 1:open
        post.setStatus(0);
        return postRepository.save(post);
    }

}
