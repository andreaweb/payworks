import { createMuiTheme } from '@material-ui/core/styles';

export const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		width: '100%'
	},
	textField: {
		width: '100%',
	}
});

export const theme = createMuiTheme({
	overrides: {
		MuiOutlineInput: {
			root:{
				border: '1px solid #fff',
				marginBottom: '10px',
				color:'#fff',
				borderRadius: '4px',
				'&$focused': {
					borderColor: '#000'
				}
			}
		},
		MuiFormLabel: {
			root: {
				color:'#fff',
				'&$focused':{
					color: '#fff'
				}
			},
		},
		MuiSnackbarContent:{
			root:{
				MuiSvgIcon: {
					root: {
						'marginRight': '10px'
					}
				}
			}
		},
		MuiSvgIcon: {
			root: {
				top: '.1em',
				position: 'relative'
			}
		},
		MuiButtonBase: {
			root: {
				fontSize: '1.0714em'
			}
		},
		MuiButton: {
			label:{
				fontSize: '1.0714em',
				padding: '6px 0'
			},
			contained: {
				marginTop: '12px',
				marginLeft: '20px'
			}
		}
	},
	palette: {
		primary: { main: '#ffffff' }
	},
	typography: { useNextVariants: true },
});