import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Posts from "./routes/admin/Posts.js";
import PostCreatePage from "./routes/admin/PostCreatePage.js";

import AdminPage from "./routes/admin/AdminPage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/admin" component={AdminPage} >
        <Route path="posts" component={Posts} />
        <Route path="postCreate" component={PostCreatePage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
