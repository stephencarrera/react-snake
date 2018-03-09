import React from 'react';
import Square from '../../atoms/Square';
import * as c from '../../../config/constants';
import PropTypes from 'prop-types';

const Board = () => <Square backgroundColor={c.BOARD_COLOR} />;

Board.PropTypes = {
  backgroundColor: PropTypes.string
};

export default Board;
