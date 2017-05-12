import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import nextMoveAction from './nextMoveAction';
import gameReducer from './gameReducer';
import './index.css';

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
  handleClick(i) {
    const squares = this.props.squares.slice();
    if (squares[i]) {
      return;
    }
    squares[i] = this.props.marker;

    this.props.dispatch(nextMoveAction(squares));
  }

  render() {

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.props.squares}
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{ this.props.status }</div>
        </div>
      </div>
    );
  }
}

Game = connect(state => state)(Game);

const store = createStore(gameReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {console.log(store.getState())});

// ========================================

ReactDOM.render(
  <Provider store={store}><Game /></Provider>,
  document.getElementById('root')
);
