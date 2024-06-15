// export const selectCards = state => state.cards.cards;

export const selectCards = state => {
  // console.log(state.controlCards.cards);
  return state.controlCards.cards;
};

export const selectColumns = state => {
  // console.log(state);
  return state.controlCards.columns;
};

export const selectCurrentColumn = state => state.boards.currentBoard.columns;
