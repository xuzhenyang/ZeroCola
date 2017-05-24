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
POST /login
GET /logout

GET /api/v1/posts?page={page}&pageSize={pageSize}
GET /api/v1/posts/{id}
GET /api/v1/posts/keyword/{keyword}?page={page}&pageSize={pageSize}
POST /api/v1/posts
PUT /api/v1/posts/{id}
DELETE /api/v1/posts/{id}

GET /api/v1/tags
GET /api/v1/tags/{id}
POST /api/v1/tags
PUT /api/v1/tags/{id}

GET /api/v1/comments
GET /api/v1/comments/{id}
POST /api/v1/comments

// 访客记录
GET /api/v1/records
```