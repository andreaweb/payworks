import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Repos from './Repos/Repos.jsx';
import Details from './Details/Details.jsx';
import Modal from '@material-ui/core/Modal';
import ModalSearch from './ModalSearch/ModalSearch.jsx';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { styles, theme } from '../common/MuiTheme.js';
import './App.scss';

class App extends Component {
  state = {
    org: '',
    repos: null, 
    isModalOpen: false,
    error: false,
    errorMsg: '',
    requesting: false
  }
  closeModal = () => {
    this.setState({isModalOpen: false});
  }
  openModal = () => {
    this.setState({isModalOpen: true});
  }
  handleClose = () => {
    if(this.state.repos){
      this.closeModal();
    }
  }
  fetchRepos = (org) => {
    this.setState({requesting: true});
    fetch(`http://api.github.com/orgs/${org}/repos`)
    .then(res => {
      if(res.ok){
        return res.json();
      }else{
        this.setState({error: true});
        throw new Error(res.statusText); 
      }
    })
    .then(data => {
      let repos = data;
      let arr = [];
      repos.map(function(repo){
        const arrItem = {
          name: repo.name,
          stars: repo.stargazers_count,
          issues: repo.open_issues_count,
          forks: repo.forks_count,
          language: repo.language,
          owner: repo.owner.login,
          id: repo.id
        };
        arr.push(arrItem);
      });
      return arr;
    })
    .then(arr => {
      this.setState({repos: arr,isModalOpen: false,requesting: false,error: false});
    })
    .catch(err => {
      this.setState({error: true, requesting: false, errorMsg: String(err)});
    });
  }
  resetError = () => {
    this.setState({error: false});
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route 
            path='/repository-details/:org/:name' 
            render={(props) => 
                  <Details 
                    resetError={this.resetError}
                    openModal={this.openModal}
                    error={this.state.error}
                    errorMsg={this.state.errorMsg}
                    closeModal={this.closeModal}
                    {...props}
                  />
          }/>
          <Route 
            path={'/:org?'}
            render={(props) => 
                  <Repos 
                    repos={this.state.repos}
                    fetchRepos={this.fetchRepos}
                    openModal={this.openModal}
                    resetError={this.resetError}
                    error={this.state.error}
                    errorMsg={this.state.errorMsg}
                    {...props}
                  />  
          }/>
        </Switch>
      </Router>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.isModalOpen}
        onClose={this.handleClose}
      >
        <ModalSearch 
          requesting={this.state.requesting}
          fetchRepos={this.fetchRepos}
        />
      </Modal>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(App);
