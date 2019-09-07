import React, { Component } from 'react';
import { history } from '../history';
import { Router, Switch, Route } from 'react-router-dom';
import Users from './Users/UserContainer';

class Routes extends Component {

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/' component={Users} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
