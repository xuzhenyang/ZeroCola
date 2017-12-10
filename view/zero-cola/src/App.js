import React, { Component } from 'react';
import IndexPage from './pages/IndexPage';
import './App.css';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={IndexPage} />
        <Route path="/index" component={IndexPage} />
      </div>
    );
  }
}

export default App;
