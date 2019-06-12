import React, { Component } from 'react';
import Customer from './components/customer/Customer';
import Manager from './components/manager/Manager';
import Login from './components/login/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render(){
    return(
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/Customer" component={Customer} />
            <Route path="/Manager" component={Manager} />
          </Switch>
        </BrowserRouter>
    )
  }
}


export default App;
