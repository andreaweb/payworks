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
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { styles, theme } from '../../common/MuiTheme.js';
import './Repos.scss';

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

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Repo Name' },
  { id: 'language', numeric: false, disablePadding: false, label: 'Programming Language' },
  { id: 'forks', numeric: true, disablePadding: false, label: 'Forks' },
  { id: 'open_issues', numeric: true, disablePadding: false, label: 'Issues' },
  { id: 'stargazers_count', numeric: true, disablePadding: false, label: 'Stars' }
];

class Repos extends Component {
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
        {this.props.error && 
          <ErrorAlert 
            resetError={this.props.resetError} 
            error={this.props.error}
            errorMsg={this.props.errorMsg}
          />
        }
        {this.props.repos &&
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
                    .filter(
                      (r) => r.language ? //not all projects have a language
                      r.language.toLowerCase().includes(this.state.query)
                      : true
                    )
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
                            <Link 
                              to={`/repository-details/${repo.owner.login}/${repo.name}`}
                            >
                            {repo.name}
                            </Link>
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={this.props.repos.length}
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

Repos.propTypes = {
  repos: PropTypes.array,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  resetError: PropTypes.func,
  open: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(Repos);
