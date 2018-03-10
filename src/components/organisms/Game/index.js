import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as c from '../../../config/constants';
import BoardPiece from '../../molecules/BoardPiece';
import SnakePiece from '../../molecules/SnakePiece';
import FoodPiece from '../../molecules/FoodPiece';

class Game extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      squares: this.getNewBoard(),
      snakeCoordinates: [this.getInitialHeadCoordinates()],
      foodCoordinates: null
    };
    this.state = this.initialState;
  }
  getNewBoard() {
    const board = [];
    for (let i = 0; i < c.BOARD_WIDTH; i++) {
      const row = [];
      for (let j = 0; j < c.BOARD_HEIGHT; j++) {
        row.push({
          position: {
            x: j,
            y: i
          }
        });
      }
      board.push(row);
    }
    return board;
  }
  getInitialHeadCoordinates() {
    return {
      x: 2,
      y: 2
    };
  }
  generatePieceComponent(square, squareId) {
    let piece = c.BOARD;
    const { foodCoordinates } = this.state;
    this.state.snakeCoordinates.forEach(position => {
      if (
        square.position.x === position.x &&
        square.position.y === position.y
      ) {
        piece = c.SNAKE;
        return;
      }
    });

    if (foodCoordinates) {
      if (
        square.position.x === foodCoordinates.x &&
        square.position.y === foodCoordinates.y
      ) {
        piece = c.FOOD;
      }
    }
    return <BoardPiece type={piece} key={squareId} />;
  }
  generateRow(row, rowId) {
    return (
      <div key={rowId}>
        {row.map((square, index) => this.generatePieceComponent(square, index))}
      </div>
    );
  }
  render() {
    let board = this.state.squares.map((row, index) => {
      return this.generateRow(row, index);
    });
    return <div>{board}</div>;
  }
}

export default Game;