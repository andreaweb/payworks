import React from 'react';
import ReactDOM from 'react-dom';
import Details from './Details';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders correctly', () => {
    const tree = renderer.create(
    	<Router><Details match={{params: {org: 'payworks', name: 'slate'}}} /></Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});