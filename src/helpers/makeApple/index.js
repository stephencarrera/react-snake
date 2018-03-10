export const makeApple = state => {
  const emptySquares = state.squares.reduce((prev = [], next) => {
    let filteredNext = next.filter(square => {
      let isEmpty = true;
      state.snakeCoordinates.forEach(position => {
        if (
          position.x === square.position.x &&
          position.y === square.position.y
        ) {
          isEmpty = false;
          return;
        }
      });
      return isEmpty;
    });
    return [...prev, ...filteredNext];
  });
  const foodPositionIndex = Math.round(Math.random() * emptySquares.length);
  return emptySquares[foodPositionIndex].position;
};
