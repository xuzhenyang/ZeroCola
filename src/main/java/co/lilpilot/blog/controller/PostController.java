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
 * Created by lilpilot on 2017/5/8.
 */
@RestController
@RequestMapping("/api/v1")
@Slf4j
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/posts")
    @ApiOperation(value = "获取所有文章（打开状态）")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "当前页数", defaultValue = "1", dataType = "Integer", paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页条目数", defaultValue = "10", dataType = "Integer", paramType = "query")
    })
    public Result<CustomPage<PostListVO>> getOpenPosts(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        page = page < 1 ? 0 : page - 1;
        Page<Post> posts = postService.getOpenPosts(page, pageSize);
        //convert PostPage -> PostListVOPage
        CustomPage<PostListVO> customPage = new CustomPage<>(posts.getNumber() + 1, posts.getSize(), posts.getTotalPages(), (int) posts.getTotalElements(), posts.getContent().stream().map(post -> {
            PostListVO postListVO = new PostListVO();
            BeanUtils.copyProperties(post, postListVO);
            return postListVO;
        }).collect(Collectors.toList()));
        return Result.success(customPage);
    }

    @GetMapping("/posts/{id}")
    @ApiOperation(value = "获取指定id的文章", notes = "根据文章id获取文章")
    @ApiImplicitParam(name = "id", value = "文章id", required = true, dataType = "Long", paramType = "path")
    public Result<Post> getPostById(@PathVariable Long id) {
        Post post = postService.getOpenPostById(id);
        if (post == null) {
            return Result.fail("500", "文章不存在");
        }
        return Result.success(post);
    }

    @GetMapping("/posts/keyword/{keyword}")
    @ApiOperation(value = "模糊查询文章", notes = "根据关键词keyword获取文章")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "keyword", value = "关键词keyword", required = true, dataType = "String", paramType = "path"),
            @ApiImplicitParam(name = "page", value = "当前页数", defaultValue = "1", dataType = "Integer", paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页条目数", defaultValue = "10", dataType = "Integer", paramType = "query")
    })
    public Result<Page<Post>> getPostByTitle(
            @PathVariable String keyword,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        page = page < 1 ? 0 : page - 1;
        return Result.success(postService.getOpenPostsByKeyword(keyword, page, pageSize));
    }

}
