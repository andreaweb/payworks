import React from 'react';
import ReactDOM from 'react-dom';
import Results from './Results';
import repos from '../../helpers/repos.json';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Repo Name' },
  { id: 'language', numeric: false, disablePadding: false, label: 'Programming Language' },
  { id: 'forks', numeric: true, disablePadding: false, label: 'Forks' },
  { id: 'issues', numeric: true, disablePadding: false, label: 'Issues' },
  { id: 'stars', numeric: true, disablePadding: false, label: 'Stars' }
];

const arr = [repos.repo0, repos.repo1];

it('renders correctly', () => {
    const tree = renderer.create(<Results arr={arr} rows={rows} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('should reorder the repos according to click', () => {
    const wrapper = mount(
      <Router><Results arr={arr} rows={rows} query="" /></Router>
    );
    
    const beforeClick = wrapper.find(TableCell).find(Link).at(0).children();
    expect(beforeClick.text()).toEqual('Larger Numbers');

    wrapper.find('TableSortLabel#stars').simulate('click');

    const afterClick = wrapper.find(TableCell).find(Link).at(0).children();
    expect(afterClick.text()).toEqual('Smaller Numbers');
});