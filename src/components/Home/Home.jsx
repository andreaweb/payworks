import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Home.scss';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: 'absolute',
    width: '60vw',
    height: '40vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: '#6573c3'
  };
}

class Home extends Component {
  handleSubmit = () => {
    if(this.props.org.length > 1){
      this.props.fetchRepos();
    }
  }

  render() {
    return (
      <section className="home-content" style={getModalStyle()}>
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
    );
  }
}

Home.propTypes = {
  handleChange: PropTypes.func.isRequired,
  fetchRepos: PropTypes.func,
  org: PropTypes.string
};

export default Home;
