import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';

const nextMove = (squares) => {return {type: 'NEXTMOVE', squares: squares}};

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    { value }
  </button>
);

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  get currentPlayerMark() {
    return this.props.xIsNext ? 'X' : 'O';
  }

  handleClick(i) {
    const squares = this.props.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.currentPlayerMark;

    this.props.dispatch(nextMove(squares));
  }

  render() {
    const winner = calculateWinner(this.props.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.currentPlayerMark}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.props.squares}
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ this.props.count }</ol>
        </div>
      </div>
    );
  }
}

Game = connect(state => state)(Game);

const defaultState = {
  xIsNext: true,
  squares: Array(9).fill(null)
};

const reducer = (state = defaultState, action) => {
  if (action.type === 'XISNEXT') {
    return Object.assign({}, state, {xIsNext: !state.xIsNext});
  }
  return state;
};

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {console.log(store.getState())});

// ========================================

ReactDOM.render(
  <Provider store={store}><Game /></Provider>,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
