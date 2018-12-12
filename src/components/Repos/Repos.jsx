import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import Results from '../Results/Results';
import { styles, theme } from '../../common/MuiTheme.js';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import { MuiThemeProvider,withStyles } from '@material-ui/core/styles';
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
    if(!this.props.repos && !this.props.match){
      this.props.openModal();
    }
    if(this.props.match && !this.props.error){
      if(this.props.match.params){
        this.props.fetchRepos(this.props.match.params.org);
      }
    }
    // if(this.props.error){
    //   this.props.openModal();
    // }
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
            openModal={this.props.openModal}
          />
        }
        {this.props.repos &&
          <section>
            <div className="row">
              <button 
                onClick={this.props.openModal} 
                component="button" 
                tabIndex="0"
                className="repos-title"
              >
                <span className="lighter">Showing results of </span>
                <span className="company">{this.props.repos[0].owner} </span>
                <EditIcon className="blink" />
              </button>
              <MuiThemeProvider theme={theme}>
                <TextField
                  label="Search by Language"
                  name="filter"
                  value={this.state.query}
                  onChange={this.handleSearch}
                  margin="normal"
                  variant="outlined"
                />
              </MuiThemeProvider>
            </div>
            <Results
              arr={this.props.repos} 
              openModal={this.props.openModal}
              rows={rows}
              query={this.state.query}
            />
          </section>
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
  closeModal: PropTypes.func,
  fetchRepos: PropTypes.func,
  match: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Repos);
