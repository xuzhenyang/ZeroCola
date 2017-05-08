package co.lilpilot.blog.controller;

import co.lilpilot.blog.model.Post;
import co.lilpilot.blog.service.PostService;
import co.lilpilot.blog.util.Result;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by lilpilot on 2017/5/8.
 */
@RestController
@RequestMapping("/api/v1")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/posts/{id}")
    @ApiOperation(value = "获取文章信息", notes = "根据文章id获取文章信息")
    @ApiImplicitParam(name = "id", value = "文章id", required = true, dataType = "Long", paramType = "path")
    public Result<Post> getPostById(@PathVariable Long id) {
        Post post = postService.getById(id);
        if (post == null) {
            return Result.fail("500", "文章不存在");
        }
        return Result.success(post);
    }
}
