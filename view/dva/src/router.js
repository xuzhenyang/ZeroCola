import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Posts from "./routes/admin/Posts.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/admin/posts" component={Posts} />
    </Router>
  );
}

export default RouterConfig;
