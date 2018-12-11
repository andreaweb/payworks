import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { styles, theme } from '../../common/MuiTheme.js';
import './Results.scss';

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc' 
	? (a, b) => desc(a, b, orderBy) 
	: (a, b) => -desc(a, b, orderBy);
}

class Results extends Component {
	state = {
		order: 'desc',
		orderBy: 'stars',
		query: '',
		page: 0,
		rowsPerPage: 10,
	}
	createSortHandler = property => event => {
		this.handleRequestSort(event, property);
	};
	handleSearch = (e) => {
		const lowerCase = e.target.value.toLowerCase();
		this.setState({query: lowerCase});
	}
	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};
	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}
		this.setState({ order, orderBy });
	};
	render() {
		const { rowsPerPage, page, order, orderBy } = this.state;
		return (
			<main>
				{this.props.arr &&
				<section>
					<div className="row">
						<button 
							onClick={this.props.openModal} 
							component="button" 
							tabIndex="0"
							className="results-title"
						>
							<span className="lighter">Showing results of </span>
							<span className="company">{this.props.arr[0].owner.login} </span>
							<EditIcon className="blink" />
						</button>
						<MuiThemeProvider theme={theme}>
							<TextField
								label="Search by Language"
								name="filter"
								value={this.state.query}
								onChange={this.handleSearch}
								margin="normal"
								variant="outlined"
							/>
						</MuiThemeProvider>
					</div>
					<Paper>
						<div className="table-container">
							<Table aria-labelledby="tableTitle">
								<TableHead>
									<TableRow>
										{this.props.rows.map(row => {
											return (
												<TableCell
													key={row.id}
													numeric={row.numeric}
													padding={row.disablePadding ? 'none' : 'default'}
													sortDirection={orderBy === row.id ? order : false}
												>
													<Tooltip
														title="Sort"
														placement={row.numeric ? 'bottom-end' : 'bottom-start'}
														enterDelay={300}
													>
														<TableSortLabel
															active={orderBy === row.id}
															direction={order}
															onClick={this.createSortHandler(row.id)}
														>
															{row.label}
														</TableSortLabel>
													</Tooltip>
												</TableCell>
											);
										}, this)}
									</TableRow>
								</TableHead>
								<TableBody>
									{ stableSort(this.props.arr, getSorting(order, orderBy))
										.filter(
											(r) => r.language ? //not all projects have a language
											r.language.toLowerCase().includes(this.state.query)
											: true
										)
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(arrItem => {
											return (
												<TableRow
													hover
													key={arrItem.id}
													tabIndex={-1}
													role="checkbox"
												>
													<TableCell component="th" className="repo-name" scope="row">
														<Link 
															to={`/repository-details/${arrItem.owner.login}/
															${arrItem.name}`}
														>
														{arrItem.name}
														</Link>
													</TableCell>
													<TableCell component="th" scope="row">
														{arrItem.language}
													</TableCell>
													<TableCell numeric>{arrItem.forks}</TableCell>
													<TableCell numeric>{arrItem.issues}</TableCell>
													<TableCell numeric>{arrItem.stars}</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</div>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={this.props.arr.length}
							rowsPerPage={rowsPerPage}
							page={page}
							backIconButtonProps={{
								'aria-label': 'Previous Page',
							}}
							nextIconButtonProps={{
								'aria-label': 'Next Page',
							}}
							onChangePage={this.handleChangePage}
							onChangeRowsPerPage={this.handleChangeRowsPerPage}
						/>
					</Paper>
				</section>
				}
			</main>
		);
	}
}

Results.propTypes = {
	arr: PropTypes.array,
	open: PropTypes.bool,
	openModal: PropTypes.func,
	closeModal: PropTypes.func,
	rows: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(Results);
