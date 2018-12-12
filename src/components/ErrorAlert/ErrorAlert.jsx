import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { theme } from '../../common/MuiTheme.js';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.dark,
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
});

class ErrorAlert extends Component {
	componentDidMount(){
		if(this.props.redirect){
			setTimeout(this.redirectToHome,5000);
		}
		if(this.props.openModal){
			setTimeout(this.props.openModal,1000);
		}
	}
	redirectToHome = () => {
		this.props.history.push(`/${this.props.org}`);
	}
	render(){
		return(
			<MuiThemeProvider theme={theme}>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={this.props.error}
					onClose={this.handleClose}
				>
					<SnackbarContent
						aria-describedby="client-snackbar"
						message={
							<span id="client-snackbar">
								<ErrorIcon />
								<span className="error-msg">{this.props.errorMsg}</span>
							</span>
						}
						action={[
							<IconButton
								key="close"
								aria-label="Close"
								color="inherit"
								onClick={this.props.resetError}
							>
								<CloseIcon />
							</IconButton>
						]}
					/>
				</Snackbar>
			</MuiThemeProvider>
		);
	}
}
ErrorAlert.propTypes = {
	error: PropTypes.bool,
	errorMsg: PropTypes.string,
	redirect: PropTypes.bool,
	resetError: PropTypes.func,
	history: PropTypes.object,
	org: PropTypes.string,
	openModal: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(ErrorAlert);