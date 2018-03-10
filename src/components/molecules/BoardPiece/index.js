import React from 'react';
import Square from '../../atoms/Square';
import * as c from '../../../config/constants';
import PropTypes from 'prop-types';

const BoardPiece = () => <Square backgroundColor={c.BOARD_COLOR} />;

BoardPiece.propTypes = {
  backgroundColor: PropTypes.string
};

export default BoardPiece;
