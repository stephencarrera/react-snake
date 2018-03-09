import React from 'react';
import Square from '../../atoms/Square';
import * as c from '../../../config/constants';
import PropTypes from 'prop-types';

const Food = () => <Square backgroundColor={c.FOOD_COLOR} />;

Food.PropTypes = {
  backgroundColor: PropTypes.string
};

export default Food;
