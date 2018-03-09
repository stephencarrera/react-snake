import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Square = ({ backgroundColor }) => (
  <StyledSquare backgroundColor={backgroundColor} />
);

export const StyledSquare = styled.div`
  width: '20px';
  height: '20px';
  margin: '0px';
  display: 'inline-block';
  background: ${props => props.backgroundColor};
`;

Square.propTypes = {
  backgroundColor: PropTypes.string
};

export default Square;
