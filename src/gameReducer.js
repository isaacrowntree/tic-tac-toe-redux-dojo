const defaultState = {
  xIsNext: true,
  squares: Array(9).fill(null)
};

const gameReducer = (state = defaultState, action) => {
  if (action.type === 'NEXTMOVE') {
    return Object.assign({}, state, {xIsNext: !state.xIsNext, squares: action.squares});
  }
  return state;
};

export default gameReducer;
