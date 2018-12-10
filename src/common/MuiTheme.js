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
		primary: { main: '#ffffff' },
		secondary: { main: '#ff0669' },
		error: { main: '#ff0669' },
	},
	typography: { useNextVariants: true },
});