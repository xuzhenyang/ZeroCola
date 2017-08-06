package co.lilpilot.blog.controller;

import co.lilpilot.blog.model.Tag;
import co.lilpilot.blog.service.TagService;
import co.lilpilot.blog.util.Result;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by lilpilot on 2017/5/23.
 */
@RestController
@RequestMapping("/api/v1")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping("/tags")
    @ApiOperation(value = "获取所有标签")
    public Result<List<Tag>> getAllTags() {
        return Result.success(tagService.getAllTags());
    }

    @GetMapping("/tags/{id}")
    @ApiOperation(value = "获取指定ID的标签")
    @ApiImplicitParam(name = "id", value = "标签ID", required = true, dataType = "Long", paramType = "path")
    public Result<Tag> getTagById(@PathVariable Long id) {
        Tag tag = tagService.getById(id);
        if (tag == null) {
            return Result.fail("500", "标签不存在");
        }
        return Result.success(tag);
    }

}
