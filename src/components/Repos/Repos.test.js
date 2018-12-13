import React from 'react';
import ReactDOM from 'react-dom';
import Repos from './Repos';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Repos />, div);
  ReactDOM.unmountComponentAtNode(div);
});
