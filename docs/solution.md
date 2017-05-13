## swagger解析PathVariable

使用@ApiImplicitParam注解，并标注paramType为path

例如：  
@ApiImplicitParam(name = "id", value = "文章id", required = true, dataType = "Long", paramType = "path")

---

## 使用postman发起post请求 报415 HttpMediaTypeNotSupportedException

后端使用@RequestBody对json数据进行转换

在请求的headers里必须声明Content-Type:application/json

**目前仅存在于postman发起请求的过程中 尚未验证ajax请求**
