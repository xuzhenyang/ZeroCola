import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Posts from "./routes/admin/Posts.js";
import PostEditPage from "./routes/admin/PostEditPage.js";

import AdminPage from "./routes/admin/AdminPage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/admin" component={AdminPage} >
        <Route path="posts" component={Posts} />
        <Route path="postEditor" component={PostEditPage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
