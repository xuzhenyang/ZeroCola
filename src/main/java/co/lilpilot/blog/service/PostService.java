package co.lilpilot.blog.service;

import co.lilpilot.blog.model.Post;
import co.lilpilot.blog.model.Tag;
import co.lilpilot.blog.model.enums.PostState;
import co.lilpilot.blog.repository.PostRepository;
import com.google.common.base.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Collections;
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
    @Autowired
    private TagService tagService;

    public Page<Post> getPosts(Integer page, Integer pageSize) {
        return postRepository.findAll(new PageRequest(page, pageSize));
    }

    public Page<Post> getOpenPosts(Integer page, Integer pageSize) {
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

    public Post getOpenPostById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("id is null");
        }
        return postRepository.findOpenPostById(id);
    }

    public Post getByTitle(String title) {
        if (Strings.isNullOrEmpty(title)) {
            throw new IllegalArgumentException("title is null or empty");
        }
        return postRepository.findByTitle(title);
    }

    public Post createPost(Post post) {
        if (post == null) {
            throw new IllegalArgumentException("post is null");
        }
        if (StringUtils.isEmpty(post.getTitle()) || StringUtils.isEmpty(post.getContent())) {
            throw new IllegalArgumentException("post is empty");
        }
        //默认开放状态
        if (post.getStatus() == null) {
            post.setStatus(PostState.OPEN.getValue());
        }
        post.setTags(getSavedTags(post.getTags()));
        //render markdown content
        post.setRenderedContent(markdownService.markdownToHtml(post.getContent()));
        return postRepository.save(post);
    }

    //TODO post内容不全会不会导致原有内容被覆盖
    public Post updatePost(Post post) {
        if (post == null) {
            throw new IllegalArgumentException("post is null");
        }
        if (StringUtils.isEmpty(post.getTitle()) || StringUtils.isEmpty(post.getContent())) {
            throw new IllegalArgumentException("post is empty");
        }
        post.setTags(getSavedTags(post.getTags()));
        //render markdown content
        post.setRenderedContent(markdownService.markdownToHtml(post.getContent()));
        return postRepository.save(post);
    }

    public Post close(Post post) {
        if (post == null || post.getId() == null) {
            throw new IllegalArgumentException("post is null");
        }
        Post target = getById(post.getId());
        target.setStatus(PostState.CLOSED.getValue());
        return postRepository.save(target);
    }

    /**
     * 查询并补全已存在的tag属性
     * @param tags
     * @return
     */
    private List<Tag> getSavedTags(List<Tag> tags) {
        List<Tag> result = new ArrayList<>();
        for (Tag tag : tags) {
            if (tag.getId() != null) {
                Tag savedTag = tagService.getById(tag.getId());
                if (savedTag == null) {
                    throw new IllegalArgumentException("tag不存在");
                }
                result.add(savedTag);
                continue;
            }
            result.add(tag);
        }
        return result;
    }

}
