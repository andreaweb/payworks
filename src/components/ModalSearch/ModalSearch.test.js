import React from 'react';
import ReactDOM from 'react-dom';
import ModalSearch from './ModalSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalSearch requesting={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
