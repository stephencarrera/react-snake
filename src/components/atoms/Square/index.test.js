import React from 'react';
import Square, { StyledSquare } from './';
import { shallow } from 'enzyme';

it('Square renders without props', () => {
  const wrapper = shallow(<Square />);
  expect(wrapper).toMatchSnapshot();
});

it('StyledSquare matches its snapshot with color', () => {
  const wrapper = shallow(<StyledSquare backgroundColor="black" />);
  expect(wrapper).toMatchSnapshot();
});
