import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import Results from '../Results/Results';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../common/MuiTheme.js';
import './Repos.scss';

class Repos extends Component {
  state = {
    order: 'desc',
    orderBy: 'open_issues',
    query: '',
    page: 0,
    rowsPerPage: 10,
  }
  componentDidMount(){
    if(!this.props.repos){
      this.props.openModal();
    }
  }
  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };
  handleSearch = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    this.setState({query: lowerCase});
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };
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
            repos={this.props.repos} 
            openModal={this.props.openModal}
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
