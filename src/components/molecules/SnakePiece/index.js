import React from 'react';
import Square from '../../atoms/Square';
import * as c from '../../../config/constants';
import PropTypes from 'prop-types';

const SnakePiece = () => <Square backgroundColor={c.SNAKE_COLOR} />;

SnakePiece.PropTypes = {
  backgroundColor: PropTypes.string
};

export default SnakePiece;
