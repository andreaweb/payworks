import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
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
		this.props.fetchRepos(this.state.org);
	}
	handleChange = (e) => {
		this.setState({org: e.target.value});
	}
	render() {
		return (
			<section className="home-content" style={getModalStyle()}>
				<h1 className="home-title">Search for an organization</h1>
				<h2 className="home-subtitle">to see its repos in Github</h2>
					<MuiThemeProvider theme={theme}>
					<ValidatorForm
						id="form"
						onSubmit={this.handleSubmit}
						onError={errors => console.log(errors)}
					>
					<div className="row">
						<TextValidator
							label="Organization"
							name="organization"
							validators={['required']}
							value={this.state.org}
							variant="outlined"
							errorMessages={['Required']}
							onChange={this.handleChange}
							id="organization"
							margin="normal"
							className="flex-item"
						/>
						<Button type="submit"
						variant="contained"
						>
							{!this.props.requesting &&
								'GO'
							}
							{this.props.requesting &&
								<CircularProgress />
							}
						</Button>
					</div>
				</ValidatorForm>
				</MuiThemeProvider>
			</section>
		);
	}
}

ModalSearch.propTypes = {
	handleChange: PropTypes.func.isRequired,
	fetchRepos: PropTypes.func,
	org: PropTypes.string,
	history: PropTypes.obj,
	requesting: PropTypes.bool
};
export default withStyles(styles, { withTheme: true })(ModalSearch);
