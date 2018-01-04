import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import IndexPage from './pages/IndexPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import AdminPostListPage from './pages/admin/AdminPostListPage';
import AdminIndexPage from './pages/admin/AdminIndexPage';
import AdminPostCreatePage from './pages/admin/AdminPostCreatePage';
import AdminPostUpdatePage from './pages/admin/AdminPostUpdatePage';
import AdminTagListPage from './pages/admin/AdminTagListPage';
import './App.css';
import { auth } from './common';

const AdminRoute = ({ component: Component, ...rest }) => {
  return (<Route {...rest} render={renderProps => {
    return auth.isAdmin() ?
      <Component {...renderProps} />
      :
      <Redirect to={{
        pathname: "/login",
        state: { from: renderProps.location }
      }} />
  }} />
  )
}

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
          <AdminRoute path="/admin" exact component={AdminIndexPage} />
          <AdminRoute path="/admin/posts" exact component={AdminPostListPage} />
          <AdminRoute path="/admin/posts/new" exact component={AdminPostCreatePage} />
          <AdminRoute path="/admin/posts/edit/:id" exact component={AdminPostUpdatePage} />
          <AdminRoute path="/admin/tags" exact component={AdminTagListPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
