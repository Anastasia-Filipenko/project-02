export const selectCards = state => state.cards.items;
export const selectLoading = state => state.cards.loading;
export const selectError = state => state.cards.error;
export const selectCardsForColumn = (state, columnId) => {
  return state.cards?.items?.find(c => c.columnId === columnId)?.cards || [];
};
