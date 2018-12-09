import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Home.scss';

class Home extends Component {
  handleSubmit = () => {
    if(this.props.org.length > 1){
      this.props.fetchRepos();
    }
  }

  render() {
    return (
      <main className="home">
        <section className="home-content">
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
          <Button type="submit"
          variant="contained"
          style={{marginTop: '25px', marginLeft: '25px'}} 
          onClick={this.handleSubmit}>
          GO
          </Button>
        </section>
      </main>
    );
  }
}

Home.propTypes = {
  handleChange: PropTypes.func.isRequired,
  fetchRepos: PropTypes.func,
  org: PropTypes.string
};

export default Home;
