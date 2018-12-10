import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	},
});

const rows = [
	{ id: 'name', numeric: false, disablePadding: false, label: 'Repo Name' },
	{ id: 'language', numeric: false, disablePadding: false, label: 'Programming Language' },
	{ id: 'forks', numeric: true, disablePadding: false, label: 'Forks' },
	{ id: 'open_issues', numeric: true, disablePadding: false, label: 'Issues' },
	{ id: 'stargazers_count', numeric: true, disablePadding: false, label: 'Stars' }
];

class Results extends Component {
	state = {
		order: 'desc',
		orderBy: 'open_issues',
		query: '',
		page: 0,
		rowsPerPage: 10,
	}
	componentDidMount(){
		if(!this.props.repos){
			this.props.openModal();
		}
	}
	createSortHandler = property => event => {
		this.handleRequestSort(event, property);
	};
	handleSearch = (e) => {
		const lowerCase = e.target.value.toLowerCase();
		this.setState({query: lowerCase});
	}
	handleClose = () => {
		if(!this.props.repos){
			//show error in modal
		}else{
			this.props.closeModal();
		}
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
				
				{this.props.repos === 404 && 
					<p onClick={this.props.openModal}>An error ocurred. Click to try again.</p>
				}
				{this.props.repos !== 404 &&
					this.props.repos &&
				<section>
					<div className="row">
						<button 
							onClick={this.props.openModal} 
							component="button" 
							tabIndex="0"
							className="results-title"
						>
							<span className="lighter">Showing results of </span>
							<span className="company">{this.props.repos[0].owner.login} </span>
							<EditIcon className="blink" />
						</button>
						<TextField
							label="Search by Language"
							name="filter"
							value={this.state.query}
							onChange={this.handleSearch}
							margin="normal"
							variant="outlined"
						/>
					</div>
					<Paper>
						<div className="table-container">
							<Table aria-labelledby="tableTitle">
								<TableHead>
									<TableRow>
										{rows.map(row => {
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
									{ stableSort(this.props.repos, getSorting(order, orderBy))
										.filter((r) => r.language.toLowerCase().includes(this.state.query))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(repo => {
											return (
												<TableRow
													hover
													key={repo.id}
													tabIndex={-1}
													role="checkbox"
												>
													<TableCell component="th" className="repo-name" scope="row">
														{repo.name}
													</TableCell>
													<TableCell component="th" scope="row">
														{repo.language}
													</TableCell>
													<TableCell numeric>{repo.forks_count}</TableCell>
													<TableCell numeric>{repo.open_issues_count}</TableCell>
													<TableCell numeric>{repo.stargazers_count}</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</div>
					</Paper>
				</section>
				}
			</main>
		);
	}
}

Results.propTypes = {
	repos: PropTypes.array,
	open: PropTypes.bool,
	openModal: PropTypes.func,
	closeModal: PropTypes.func
};

export default withStyles(styles)(Results);
