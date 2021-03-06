import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Results from '../Results/Results';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../common/MuiTheme.js';
import './Details.scss';

const rows = [
  { id: 'branch', numeric: false, disablePadding: false, label: 'Branch Name' },
  { id: 'sha', numeric: false, disablePadding: false, label: 'Sha' },
  { id: 'url', numeric: false, disablePadding: false, label: 'Link' }
];

class Details extends Component {
	state = {
		branches: null,
		error: false,
		errorMsg: null
	};
	componentDidMount(){
		const repoName = this.props.match.params.name;
		const orgName = this.props.match.params.org;
		let fetchURL = `https://api.github.com/repos/${orgName}/${repoName}/branches`;
		this.fetchRepoDetails(fetchURL);
	}
	fetchRepoDetails = (url) => {
		fetch(url).then(res => {
      if(res.ok){
        return res.json();
      }else{
        this.setState({error: true});
        throw new Error(res.statusText); 
      }
    })
		.then(data => {
			console.log(data);
			let branches = data;
			let arr = [];
			branches.map(function(branch){
				const arrItem = {
					branch: branch.name,
					sha: branch.commit.sha,
					url: <a href={branch.commit.url}>Redirect to API</a>
				};
				arr.push(arrItem);
			});
			return arr;
		})
		.then(arr =>{
			this.props.closeModal();
			this.setState({branches: arr, error: false});
		})
		.catch(err =>{
			this.setState({error: true, errorMsg: String(err)});
		});
	}
	render() {
		return (
			<main>
				<MuiThemeProvider theme={theme}>
				<div className="row row--details">
					<span>
						<span className="lighter">Showing repositories of </span>
						<span className="company">
							{this.props.match.params.org}/
							{this.props.match.params.name} 
						</span>
					</span>
					
						<Button variant="outlined" color="primary">
							<Link to={`/${this.props.match.params.org}`} className="button-link">
								Back to Repositories
							</Link>
						</Button>
					
				</div>
				{!this.state.error && !this.state.branches &&
          <CircularProgress className="spinner" />
        }
				{this.state.error && 
					<ErrorAlert 
						resetError={this.props.resetError} 
						apiError={this.state.error}
						errorMsg={`${this.state.errorMsg}, redirecting to home...`}
						redirect={true}
						org={this.props.match.params.org}
						history={this.props.history}
					/>
				}
				{this.state.branches &&
					<Results 
						arr={this.state.branches} 
						openModal={this.props.openModal}
						rows={rows}
					/>
				}
				</MuiThemeProvider>
			</main>
		);
	}
}

Details.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object,
	error: PropTypes.bool,
	errorMsg: PropTypes.string,
	resetError: PropTypes.func,
	openModal: PropTypes.func,
	closeModal: PropTypes.func
};

export default Details;
