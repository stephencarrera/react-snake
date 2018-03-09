import React from 'react';
import Square from '../../atoms/Square';
import * as c from '../../../config/constants';
import PropTypes from 'prop-types';

const Snake = () => <Square backgroundColor={c.SNAKE_COLOR} />;

Snake.PropTypes = {
  backgroundColor: PropTypes.string
};

export default Snake;
