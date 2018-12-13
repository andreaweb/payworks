import React from 'react';
import ReactDOM from 'react-dom';
import Details from './Details';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Results from '../Results/Results';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

const matchProps = {params: {org: 'payworks', name: 'slate'}};
const branches = [
  {
    "name": "dev",
    "sha": "63650ce30b986bd2ae9bcb4d0377196c10e12179",
    "url": "https://api.github.com/repos/payworks/slate/commits/63650ce30b986bd2ae9bcb4d0377196c10e12179"
  },
  {
    "name": "gh-pages",
    "sha": "c4b4c0b8f83e891ca9fab6bbe9a1a88d5fe41292",
    "url": "https://api.github.com/repos/payworks/slate/commits/c4b4c0b8f83e891ca9fab6bbe9a1a88d5fe41292"
  },
  {
    "name": "master",
    "sha": "de496848c1e7b7116371ae25944aced1c22c47a9",
    "url": "https://api.github.com/repos/payworks/slate/commits/de496848c1e7b7116371ae25944aced1c22c47a9"
  }
]

it('renders correctly', () => {
  const tree = renderer.create(
  	<Router><Details match={matchProps} /></Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders errorAlert only when there is an error', () => {
	const wrapper = mount(<Router><Details match={matchProps} /></Router>);
	expect(wrapper.find(ErrorAlert).length).toBe(0);
	wrapper.find(Details).setState({error: true});
	wrapper.update();
	expect(wrapper.find(ErrorAlert).length).toBe(1);
	wrapper.unmount();
})

it('renders results only when there are results (branches)', () => {
	const wrapper = mount(<Router><Details match={matchProps} /></Router>);
	expect(wrapper.find(Results).length).toBe(0);
	wrapper.find(Details).setState({branches: branches});
	expect(wrapper.find(Results).length).toBe(1);
	wrapper.unmount();
})

it('does not render loading when there are results', () => {
	const wrapper = mount(<Router><Details match={matchProps} /></Router>);
	expect(wrapper.find(CircularProgress).length).toBe(1);
	wrapper.find(Details).setState({branches: branches});
	expect(wrapper.find(CircularProgress).length).toBe(0);
	wrapper.unmount();
})

it('shows the correct link back to repositories', () => {
	const wrapper = mount(<Router><Details match={matchProps} /></Router>);
	const headerLink = wrapper.find(Button).find(Link);
	expect(headerLink.getDOMNode().attributes.getNamedItem('href').value)
		.toEqual(`/${matchProps.params.org}`);
	wrapper.unmount();
});