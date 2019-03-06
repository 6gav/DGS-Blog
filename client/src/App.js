import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    const App = () => (
      <Switch>
        <Route exact path='/' component={Home}/>
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
