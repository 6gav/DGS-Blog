import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    const App = () => (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/admin/login' component={Login}/>
      </Switch>
    );
    return (
      <Route>
        <App/>
      </Route>
    );
  }
}

export default App;
