import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Results from './Results/Results.jsx';
import RepositoryDetails from './RepositoryDetails/RepositoryDetails.jsx';
import Home from './Home/Home.jsx';
import './App.scss';

class App extends Component {
  state = {
    org: '',
    repos: [],
    toResults: false
  }
  handleChange = (e) => {
    this.setState({org: e.target.value});
  }
  fetchRepos = () => {
    //go to Results and sort this out there
      console.log(this);
      fetch(`http://api.github.com/orgs/${this.state.org}/repos`)
      .then(res => {
        if(res.ok){
          return res.json();
        }else{
          return 404; //render an error inside Results
        }
      })
      .then(data => {
        console.log(data);
        this.setState({repos: data, toResults: true});
      });//show Repository(s)
      // .then(this.props.history.push('/results'));
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={
              this.state.toResults 
              ? <Results repos={this.state.repos} />
              : ()=>
                <Home 
                  org={this.state.org} 
                  fetchRepos={this.fetchRepos} 
                  handleChange={this.handleChange} 
                />
          }/>
          <Route exact path="/results" render={
            ()=><Results repos={this.state.repos} />
          }/>
          <Route exact path="/repository-details" render={
            ()=><RepositoryDetails />
          }/>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
