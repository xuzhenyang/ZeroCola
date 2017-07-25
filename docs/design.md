## 需求

### 展示

代码高亮
搜索
评论（邮件）
分享到微信

### 管理

Markdown编辑器
文章暂存
tag多选（编辑文章时）
游客访问记录（ip 时间 可视化？）

### 部署

日志
数据库备份
自动化部署
Docker?

---

## API

```
//admin
POST /admin/login
GET /admin/logout

//后台对文章（所有状态可见）
GET /api/v1/admin/posts?page={page}&pageSize={pageSize}
GET /api/v1/admin/posts/{id}
POST /api/v1/admin/posts
PUT /api/v1/admin/posts/{id}
DELETE /api/v1/admin/posts/{id}

//用户对文章（仅开放状态可见）
GET /api/v1/posts?page={page}&pageSize={pageSize}
GET /api/v1/posts/{id}
GET /api/v1/posts/keyword/{keyword}?page={page}&pageSize={pageSize}

//后台对标签
POST /api/v1/admin/tags
PUT /api/v1/admin/tags/{id}

//用户对标签
GET /api/v1/tags
GET /api/v1/tags/{id}

//后台对评论
DELETE /api/v1/admin/comments/{id}

//用户对评论
GET /api/v1/comments
GET /api/v1/comments/{id}
POST /api/v1/comments

// 访客记录
GET /api/v1/records
```

---

## 前端认证

### 访问页面前

Route的onEnter中，通过effects获取status中的认证flag，未认证则跳转login页面

### 异常处理

异常统一处理，401则跳转login页面