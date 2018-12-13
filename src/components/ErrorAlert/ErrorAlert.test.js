import React from 'react';
import ReactDOM from 'react-dom';
import ErrorAlert from './ErrorAlert';

const apiError = true;
const errorMsg = "failed to fetch";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ErrorAlert apiError={true} errorMsg={errorMsg} />, div);
  ReactDOM.unmountComponentAtNode(div);
});