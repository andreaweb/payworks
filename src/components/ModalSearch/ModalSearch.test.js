import React from 'react';
import ReactDOM from 'react-dom';
import ModalSearch from './ModalSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalSearch handleChange={() => true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
