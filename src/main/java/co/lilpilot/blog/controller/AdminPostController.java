package co.lilpilot.blog.controller;

import co.lilpilot.blog.model.CustomPage;
import co.lilpilot.blog.model.Post;
import co.lilpilot.blog.model.enums.PostState;
import co.lilpilot.blog.model.vo.PostListVO;
import co.lilpilot.blog.service.PostService;
import co.lilpilot.blog.util.Result;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

/**
 * Created by lilpilot on 2017/5/25.
 */
@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
public class AdminPostController {

    @Autowired
    private PostService postService;

    @GetMapping("/posts")
    @ApiOperation(value = "获取所有文章")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "当前页数", defaultValue = "1", dataType = "Integer", paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页条目数", defaultValue = "10", dataType = "Integer", paramType = "query")
    })
    public Result<CustomPage<PostListVO>> getAllPosts(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        page = page < 1 ? 0 : page - 1;
        Page<Post> posts = postService.getPosts(page, pageSize);
        //convert PostPage -> PostListVOPage
        CustomPage<PostListVO> customPage = new CustomPage<>(posts.getNumber() + 1, posts.getSize(), posts.getTotalPages(), (int) posts.getTotalElements(), posts.getContent().stream().map(post -> {
            PostListVO postListVO = new PostListVO();
            BeanUtils.copyProperties(post, postListVO);
            postListVO.setStatusDesc(PostState.getDescByValue(postListVO.getStatus()));
            return postListVO;
        }).collect(Collectors.toList()));
        return Result.success(customPage);
    }

    @GetMapping("/posts/{id}")
    @ApiOperation(value = "获取指定id的文章", notes = "根据文章id获取文章")
    @ApiImplicitParam(name = "id", value = "文章id", required = true, dataType = "Long", paramType = "path")
    public Result<Post> getPostById(@PathVariable Long id) {
        Post post = postService.getById(id);
        if (post == null) {
            return Result.fail("500", "文章不存在");
        }
        return Result.success(post);
    }

    @PostMapping("/posts")
    @ApiOperation(value = "创建文章")
    @ApiImplicitParam(name = "post", value = "文章POJO", required = true, dataType = "Post", paramType = "body")
    public Result<Post> createPost(@RequestBody Post post) {
        log.info("创建文章 title : {}", post.getTitle());
        return Result.success(postService.createPost(post));
    }

    @PutMapping("/posts/{id}")
    @ApiOperation(value = "更新文章")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "文章id", required = true, dataType = "Long", paramType = "path"),
            @ApiImplicitParam(name = "post", value = "文章POJO", required = true, dataType = "Post", paramType = "body")
    })
    public Result<Post> updatePost(
            @PathVariable Long id,
            @RequestBody Post post) {
        log.info("更新文章 title : {}", post.getTitle());
        return Result.success(postService.updatePost(post));
    }

    @DeleteMapping("/posts/{id}")
    @ApiOperation(value = "删除文章")
    @ApiImplicitParam(name = "id", value = "文章id", required = true, dataType = "Long", paramType = "path")
    public Result<Post> closePost(@PathVariable Long id) {
        Post post = postService.getById(id);
        if (post == null) {
            return Result.fail("500", "文章不存在");
        }
        log.info("删除文章 title : {}", post.getTitle());
        return Result.success(postService.close(post));
    }

}
