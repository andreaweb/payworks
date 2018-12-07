import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Results.scss';

class Results extends Component {
  render() {
    return (
      <main>
        <h1>Results</h1>
        {this.props.repos.map((repo) => <p key={repo.id}>{repo.name}</p>)}
      </main>
    );
  }
}

Results.propTypes = {
	repos: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.number
	]),
};

export default Results;
