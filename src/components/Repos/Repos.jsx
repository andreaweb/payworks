import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import Results from '../Results/Results';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../common/MuiTheme.js';
import './Repos.scss';

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Repo Name' },
  { id: 'language', numeric: false, disablePadding: false, label: 'Programming Language' },
  { id: 'forks', numeric: true, disablePadding: false, label: 'Forks' },
  { id: 'issues', numeric: true, disablePadding: false, label: 'Issues' },
  { id: 'stars', numeric: true, disablePadding: false, label: 'Stars' }
];

class Repos extends Component {
  state = {
    query: ''
  }
  componentDidMount(){
    if(!this.props.repos){
      this.props.openModal();
    }
  }
  handleSearch = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    this.setState({query: lowerCase});
  }
  render() {
    return (
      <main>
        {this.props.error && 
          <ErrorAlert 
            resetError={this.props.resetError} 
            error={this.props.error}
            errorMsg={this.props.errorMsg}
          />
        }
        {this.props.repos &&
          <Results
            arr={this.props.repos} 
            openModal={this.props.openModal}
            rows={rows}
          />
        }
      </main>
    );
  }
}

Repos.propTypes = {
  repos: PropTypes.array,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  resetError: PropTypes.func,
  open: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(Repos);
