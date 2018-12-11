import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import './RepositoryDetails.scss';

class RepositoryDetails extends Component {
	state = {

	};
	componentDidMount(){
		const repoName = this.props.match.params.name;
		const orgName = this.props.match.params.org;
		let fetchURL = `https://api.github.com/repos/${orgName}/${repoName}/branches`;
		fetch(fetchURL)
		.then(res => {console.log(res.json());});
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
				<h1>Showing branches of</h1>
				
			</main>
		);
	}
}

RepositoryDetails.propTypes = {
	match: PropTypes.obj,
	error: PropTypes.bool,
	errorMsg: PropTypes.string,
	resetError: PropTypes.func
};

export default RepositoryDetails;
