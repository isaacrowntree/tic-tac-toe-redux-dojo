const startingMarker = 'X';

const createStatus = (winner, marker = startingMarker) => {
  return (winner ? `Winner: ${winner}` : `Next player: ${marker}`);
};

const defaultState = {
  squares: Array(9).fill(null),
  marker: startingMarker,
  status: createStatus(false),
};

const currentPlayerMark = (marker) => {
  return (marker === 'X' ? 'O' : 'X');
};

const calculateWinner = (squares) => {
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

const gameReducer = (state = defaultState, action) => {
  if (action.type === 'NEXTMOVE') {
    const winner = calculateWinner(state.squares);
    if (winner) {
      return;
    }
    return Object.assign({}, state, {
      squares: action.squares,
      marker: currentPlayerMark(state.marker),
      status: createStatus(winner, currentPlayerMark(state.marker)),
    });
  }
  return state;
};

export default gameReducer;
