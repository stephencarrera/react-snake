import React, { Component } from 'react';
import * as c from '../../../config/constants';
import BoardPiece from '../../molecules/BoardPiece';
import SnakePiece from '../../molecules/SnakePiece';
import FoodPiece from '../../molecules/FoodPiece';
import GameArea from '../../atoms/GameArea';
import { makeApple } from '../../../helpers/makeApple';
class Game extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      squares: this.getNewBoard(),
      snakeCoordinates: [this.getInitialHeadCoordinates()],
      foodCoordinates: null,
      currentDirection: c.RIGHT,
      isRunning: true
    };
    this.state = this.initialState;
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.setState({ foodCoordinates: makeApple(this.state) });
    this.updateIntervalId = window.setInterval(() => {
      this.updateBoard();
    }, 133);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event) {
    console.log(event);
    if (event.key === 'p') {
      this.setState(prevState => ({ isRunning: !prevState.isRunning }));
    }
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
    }
    let { currentDirection } = this.state;
    switch (event.key) {
      case 'ArrowUp':
        if (currentDirection !== c.DOWN) {
          this.setState({ currentDirection: c.UP });
        }
        break;
      case 'ArrowRight':
        if (currentDirection !== c.LEFT) {
          this.setState({ currentDirection: c.RIGHT });
        }
        break;
      case 'ArrowDown':
        if (currentDirection !== c.UP) {
          this.setState({ currentDirection: c.DOWN });
        }
        break;
      case 'ArrowLeft':
        if (currentDirection !== c.RIGHT) {
          this.setState({ currentDirection: c.LEFT });
        }
        break;
    }
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
  gameOver() {
    this.setState(prevState => ({
      ...this.initialState,
      foodCoordinates: makeApple(prevState)
    }));
  }
  updateBoard() {
    const newHeadPosition = {
      ...this.state.snakeCoordinates[this.state.snakeCoordinates.length - 1]
    };
    let foodCoordinatesUpdate = {};
    let newSnakePositions;
    const { foodCoordinates } = this.state;
    if (!this.state.isRunning) {
      return;
    }
    switch (this.state.currentDirection) {
      case c.UP:
        newHeadPosition.y--;
        break;
      case c.RIGHT:
        newHeadPosition.x++;
        break;
      case c.DOWN:
        newHeadPosition.y++;
        break;
      case c.LEFT:
        newHeadPosition.x--;
        break;
      default:
        break;
    }

    // Game Over Conditions - Hit Wall / Hit Self

    if (newHeadPosition.x < 0) {
      this.gameOver();
      return;
    } else if (newHeadPosition.x > c.BOARD_WIDTH - 1) {
      this.gameOver();
      return;
    }
    if (newHeadPosition.y < 0) {
      this.gameOver();
      return;
    } else if (newHeadPosition.y > c.BOARD_HEIGHT - 1) {
      this.gameOver();
      return;
    }
    this.state.snakeCoordinates.forEach(position => {
      if (
        position.x === newHeadPosition.x &&
        position.y === newHeadPosition.y
      ) {
        this.gameOver();
        return;
      }
    });

    if (
      newHeadPosition.x === foodCoordinates.x &&
      newHeadPosition.y === foodCoordinates.y
    ) {
      newSnakePositions = [...this.state.snakeCoordinates];
      foodCoordinatesUpdate = { foodCoordinates: makeApple(this.state) };
    } else {
      const currentTailPosition = this.state.snakeCoordinates[0];
      newSnakePositions = this.state.snakeCoordinates.filter(position => {
        return (
          position.x !== currentTailPosition.x ||
          position.y !== currentTailPosition.y
        );
      });
    }
    this.setState({
      snakeCoordinates: [...newSnakePositions, newHeadPosition],
      ...foodCoordinatesUpdate
    });
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
    switch (piece) {
      case c.SNAKE:
        return <SnakePiece key={squareId} />;
      case c.FOOD:
        return <FoodPiece key={squareId} />;
      default:
        return <BoardPiece key={squareId} />;
    }
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
    return <GameArea>{board}</GameArea>;
  }
}

export default Game;
