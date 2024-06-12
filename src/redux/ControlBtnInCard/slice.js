import { createSlice } from '@reduxjs/toolkit';
import { moveCard, deleteCard } from './operations';

const controlBtnInCardSlice = createSlice({
  name: 'controlCards',
  initialState: {
    cards: [],
    columns: [],
    cardsError: null,
    isCardsLoading: false,
  },
  extraReducers: builder => {
    builder
      // .addCase(fetchCards.pending, state => {
      //   state.isCardsLoading = true;
      //   state.cardsError = null;
      // })
      // .addCase(fetchCards.fulfilled, (state, { payload }) => {
      //   state.cards = payload;
      //   state.isCardsLoading = false;
      //   state.cardsError = null;
      // })
      // .addCase(fetchCards.rejected, (state, { payload }) => {
      //   state.cardsError = payload;
      //   state.isCardsLoading = false;
      // })

      .addCase(moveCard.pending, state => {
        state.isCardsLoading = true;
        state.cardsError = null;
      })
      .addCase(moveCard.fulfilled, (state, { payload }) => {
        const columnId1 = payload[0].column;
        const columnId2 = payload[1]?.column;

        const index1 = state.cards.findIndex(
          column => column.column === columnId1
        );
        const index2 = state.cards.findIndex(
          column => column.column === columnId2
        );

        if (index1 !== -1 && index2 !== -1) {
          state.cards[index1] = {
            ...state.cards[index1],
            cards: payload[0].cards,
          };
          state.cards[index2] = {
            ...state.cards[index2],
            cards: payload[1].cards,
          };
        } else if (index1 !== -1 && !columnId2) {
          state.cards[index1] = {
            ...state.cards[index1],
            cards: payload[0].cards,
          };
        } else if (index1 !== -1 && index2 === -1) {
          state.cards[index1] = {
            ...state.cards[index1],
            cards: payload[0].cards,
          };
          state.cards.push(payload[1]);
        }

        state.isCardsLoading = false;
        state.cardsError = null;
      })
      .addCase(moveCard.rejected, (state, { payload }) => {
        state.cardsError = payload;
        state.isCardsLoading = false;
      })

      .addCase(deleteCard.pending, state => {
        state.isCardsLoading = true;
        state.cardsError = null;
      })
      .addCase(deleteCard.fulfilled, (state, { payload }) => {
        state.cards = state.cards.filter(card => card._id !== payload._id);
        state.isCardsLoading = false;
        state.cardsError = null;
      })
      .addCase(deleteCard.rejected, (state, { payload }) => {
        state.cardsError = payload;
        state.isCardsLoading = false;
      });
  },
});

export const cardsReducer = controlBtnInCardSlice.reducer;
