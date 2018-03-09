import React from 'react';
import Square from '../../atoms/Square';
import * as c from '../../../config/constants';
import PropTypes from 'prop-types';

const FoodPiece = () => <Square backgroundColor={c.FOOD_COLOR} />;

FoodPiece.PropTypes = {
  backgroundColor: PropTypes.string
};

export default FoodPiece;
