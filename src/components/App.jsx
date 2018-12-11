import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Results from './Results/Results.jsx';
import RepositoryDetails from './RepositoryDetails/RepositoryDetails.jsx';
import Modal from '@material-ui/core/Modal';
import ModalSearch from './ModalSearch/ModalSearch.jsx';
import './App.scss';

class App extends Component {
  state = {
    org: '',
    repos: null, 
    isModalOpen: false,
    error: false,
    errorMsg: ''
  }
  closeModal = () => {
    this.setState({isModalOpen: false});
  }
  openModal = () => {
    this.setState({isModalOpen: true});
  }
  handleClose = () => {
    if(!this.repos){
      //show error in modal
    }else{
      this.closeModal();
    }
  }
  fetchRepos = (org) => {
    fetch(`http://api.github.com/orgs/${org}/repos`)
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
      this.setState({repos: data,isModalOpen: false,error: false});
    })
    .catch(err => {
      console.log(err);
      this.setState({error: true, errorMsg: String(err)});
    });
  }
  resetError = () => {
    this.setState({error: false});
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
                    resetError={this.resetError}
                    error={this.state.error}
                    errorMsg={this.state.errorMsg}
                  />  
          }/>
          <Route exact path='/results' render={
            ()=><Results repos={this.state.repos} />
          }/>
          <Route 
            path='/repository-details/:org/:name' 
            render={() => 
                  <RepositoryDetails 
                    resetError={this.resetError}
                    error={this.state.error}
                    errorMsg={this.state.errorMsg}
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
            fetchRepos={this.fetchRepos}  
          />
        </Modal>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
