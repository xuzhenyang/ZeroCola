## swagger解析PathVariable

使用@ApiImplicitParam注解，并标注paramType为path

例如：  
@ApiImplicitParam(name = "id", value = "文章id", required = true, dataType = "Long", paramType = "path")

---

