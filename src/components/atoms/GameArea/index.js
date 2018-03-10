import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GameArea = rest => <StyledGameArea {...rest} />;

export const StyledGameArea = styled.div`
  line-height: 0;
`;

GameArea.propTypes = {
  backgroundColor: PropTypes.string
};

export default GameArea;
