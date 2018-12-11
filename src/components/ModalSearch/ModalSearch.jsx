import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { styles, theme } from '../../common/MuiTheme.js';
import './ModalSearch.scss';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
		position: 'absolute',
		width: '60vw',
		height: '40vh',
		padding: '20px',
		display: 'grid',
		gridAutoRows: '7vh 7vh auto',
		color: '#fff',
		backgroundColor: '#6573c3'
	};
}

class ModalSearch extends Component {
	state = {
		org: ''
	}
	handleSubmit = () => {
		if(this.state.org.length > 1){
			this.props.fetchRepos(this.state.org);
		}
	}
	handleChange = (e) => {
		this.setState({org: e.target.value});
	}
	render() {
		return (
			<section className="home-content" style={getModalStyle()}>
				<h1 className="home-title">Search for an organization</h1>
				<h2 className="home-subtitle">to see its repos in Github</h2>
				<div className="row">
					<MuiThemeProvider theme={theme}>
						<TextField
							label="Organization"
							name="organization"
							value={this.state.org}
							onChange={this.handleChange}
							margin="normal"
							variant="outlined"
							className="flex-item"
						/>
						<Button type="submit"
						variant="contained"
						onClick={this.handleSubmit}>
						GO
						</Button>
					</MuiThemeProvider>
				</div>
			</section>
		);
	}
}

ModalSearch.propTypes = {
	handleChange: PropTypes.func.isRequired,
	fetchRepos: PropTypes.func,
	org: PropTypes.string
};
export default withStyles(styles, { withTheme: true })(ModalSearch);
