import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';

import HomePage from './routes/HomePage';
import IndexPage from './routes/IndexPage';
import PostListPage from './routes/PostListPage';
import PostPage from './routes/PostPage';

import AdminPage from "./routes/admin/AdminPage.js";
import AdminPostsPage from "./routes/admin/Posts.js";
import PostCreatePage from "./routes/admin/PostCreatePage.js";
import PostEditPage from "./routes/admin/PostEditPage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={HomePage} >
        <IndexRoute component={IndexPage} />
        <Route path="posts" component={PostListPage} />
        <Route path="posts/:id" component={PostPage} />
      </Route>
      <Route path="/admin" component={AdminPage} >
        <Route path="posts" component={AdminPostsPage} />
        <Route path="postCreate" component={PostCreatePage} />
        <Route path="postEdit/:id" component={PostEditPage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
