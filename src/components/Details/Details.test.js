import React from 'react';
import ReactDOM from 'react-dom';
import RepositoryDetails from './RepositoryDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RepositoryDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});
