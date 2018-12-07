import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Results from './Results/Results.jsx';
import RepositoryDetails from './RepositoryDetails/RepositoryDetails.jsx';
import Home from './Home/Home.jsx';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={()=><Home />} />
          <Route exact path="/results" render={
            ()=><Results />
          }/>
          <Route exact path="/repository-details" render={
            ()=><RepositoryDetails />
          }/>
        </Switch>
      </Router>
    );
  }
}

export default App;
