// export const selectCards = state => state.cards.cards;

export const selectCards = state => {
  // console.log(state);
  return state.controlCards.cards;
};

export const selectColumns = state => {
  // console.log(state);
  return state.controlCards.columns;
};
