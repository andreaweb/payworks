import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Results from './Results/Results.jsx';
import RepositoryDetails from './RepositoryDetails/RepositoryDetails.jsx';
import Modal from '@material-ui/core/Modal';
import Home from './Home/Home.jsx';
import './App.scss';

class App extends Component {
  state = {
    org: '',
    repos: null, 
    isModalOpen: false,
    toResults: true
  }
  closeModal = () => {
    this.setState({isModalOpen: false});
  }
  openModal = () => {
    this.setState({isModalOpen: true});
  }
  fetchRepos = () => {
      fetch(`http://api.github.com/orgs/${this.state.org}/repos`)
      .then(res => {
        console.log(res);
        if(res.ok){
          return res.json();
        }else{
          return null; //render an error inside Results
        }
      })
      .then(data => {
        console.log(data);
        this.setState({repos: data, toResults: true});
      });
  }
  render() {
    return (
      <div>
      <Router>
        <Switch>
          <Route exact path='/' render={
            () => <Results 
                    repos={this.state.repos} 
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    open={this.state.isModalOpen}
                  />  
          }/>
          <Route exact path='/results' render={
            ()=><Results repos={this.state.repos} />
          }/>
          <Route exact path='/repository-details' render={
            ()=><RepositoryDetails />
          }/>
        </Switch>
      </Router>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.isModalOpen}
            onClose={this.handleClose}
          >
          <Home />
        </Modal>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
