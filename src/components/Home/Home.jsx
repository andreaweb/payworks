import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import './Home.scss';

class Home extends Component {
  handleSubmit = () => {
    if(this.props.org.length > 1){
      this.props.fetchRepos();
    }
  }

  render() {
    return (
      <div className="home">
        <main className="home-content">
          <h1 className="home-title">Search for an organization</h1>
          <h2>to see its repos in Github</h2>
          <TextField
            label="Organization"
            name="organization"
            value={this.props.org}
            onChange={this.props.handleChange}
            margin="normal"
            variant="outlined"
          />
          <button type="submit" onClick={this.handleSubmit}>GO</button>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  handleChange: PropTypes.func.isRequired,
  fetchRepos: PropTypes.func,
  org: PropTypes.string
};

export default Home;
