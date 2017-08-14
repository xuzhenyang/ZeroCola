package co.lilpilot.blog.controller;

import co.lilpilot.blog.model.Tag;
import co.lilpilot.blog.service.TagService;
import co.lilpilot.blog.util.Result;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lilpilot on 2017/5/25.
 */
@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
public class AdminTagController {

    @Autowired
    private TagService tagService;

    @PostMapping("/tags")
    @ApiOperation(value = "创建新标签")
    @ApiImplicitParam(name = "tag", value = "标签类", required = true, dataType = "Tag", paramType = "body")
    public Result<Tag> createTag(@RequestBody Tag tag) {
        log.info("创建标签 name : {}", tag.getName());
        return Result.success(tagService.saveOrUpdate(tag));
    }

    @PutMapping("/tags/{id}")
    @ApiOperation(value = "更新标签")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "标签ID", required = true, dataType = "Long", paramType = "path"),
            @ApiImplicitParam(name = "tag", value = "标签类", required = true, dataType = "Tag", paramType = "body")
    })
    public Result<Tag> updateTag(
            @PathVariable Long id,
            @RequestBody Tag tag) {
        log.info("更新标签 name : {}", tag.getName());
        return Result.success(tagService.saveOrUpdate(tag));
    }

    @DeleteMapping("/tags/{id}")
    @ApiOperation(value = "删除标签")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "标签ID", required = true, dataType = "Long", paramType = "path")
    })
    public Result<Tag> deleteTag(
            @PathVariable Long id) {
        Tag tag = tagService.getById(id);
        if (tag == null) {
            return Result.fail("500", "标签不存在");
        }
        log.info("删除标签 name : {}", tag.getName());
        return Result.success(tagService.delete(tag));
    }

}
