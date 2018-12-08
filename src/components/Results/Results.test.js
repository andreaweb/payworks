const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import Results from './Results';
import repos from '../../helpers/repos.json';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Results />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should reorder the repos according to the state', () => {
		const arr = [repos.repo0, repos.repo1];
    const comp = shallow(<Results repos={arr}/>);
    comp.setState({ order: 'asc' });
    //the default is desc, which would return 'Larger Numbers'
    const firstRow = 
    comp.find(TableBody).find(TableCell).find('.repo-name').at(0).children();
    expect(firstRow.text()).toEqual('Smaller Numbers');
});