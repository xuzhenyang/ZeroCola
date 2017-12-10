import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={IndexPage} />
        <Route path="/index" component={IndexPage} />
        <Route path="/posts" component={PostListPage} />
        <Route path="/post/:id" component={PostDetailPage} />
      </div>
    );
  }
}

export default App;
