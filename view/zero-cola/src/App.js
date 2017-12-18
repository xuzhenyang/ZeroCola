import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import IndexPage from './pages/IndexPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import AdminPostListPage from './pages/admin/AdminPostListPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" exact component={IndexPage} />
          <Route path="/index" component={IndexPage} />
          <Route path="/posts" exact component={PostListPage} />
          <Route path="/posts/:id" component={PostDetailPage} />
          <Route path="/admin/posts" exact component={AdminPostListPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
