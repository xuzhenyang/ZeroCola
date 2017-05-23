package co.lilpilot.blog.controller;

import co.lilpilot.blog.model.Tag;
import co.lilpilot.blog.service.TagService;
import co.lilpilot.blog.util.Result;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lilpilot on 2017/5/23.
 */
@RestController
@RequestMapping("/api/v1")
public class TagController {

    /*
POST /api/v1/tags
PUT /api/v1/tags/{id}
DELETE /api/v1/tags/{id}
* */
    @Autowired
    private TagService tagService;

    @GetMapping("/tags")
    @ApiOperation(value = "获取所有标签")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "当前页数", defaultValue = "1", dataType = "Integer", paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页条目数", defaultValue = "10", dataType = "Integer", paramType = "query")
    })
    public Result<Page<Tag>> getAllTags(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        page = page < 1 ? 0 : page - 1;
        return Result.success(tagService.getAllTags(page, pageSize));
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

    @PostMapping("/tags")
    @ApiOperation(value = "创建新标签")
    @ApiImplicitParam(name = "tag", value = "标签类", required = true, dataType = "Tag", paramType = "body")
    public Result<Tag> createTag(@RequestBody Tag tag) {
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
        return Result.success(tagService.saveOrUpdate(tag));
    }

    //TODO deleteTag
}
