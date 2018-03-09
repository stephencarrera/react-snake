import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('should render with a class of App-intro', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.App-intro')).toHaveLength(1);
});
