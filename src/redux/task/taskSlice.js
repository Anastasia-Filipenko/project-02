import { createSlice } from '@reduxjs/toolkit';
import { changeCard, createCard, deleteCard, moveCard } from './operations.js';

const slice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  reducers: {
    setCards(state, action) {
      state.items = action.payload?.columns.map(c => {
        return { columnId: c._id, cards: c.cards || [] };
      });
    },
    addEmptyColumn(state, action) {
      state.items.push({ columnId: action.payload.columnId, cards: [] });
    },
  },
  extraReducers: builder =>
    builder
      .addCase(createCard.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.loading = false;
        const columnIndex = state.items?.findIndex(
          c => c.columnId === action.payload.column
        );
        if (columnIndex > -1) {
          state.items[columnIndex].cards.push(action.payload);
        }
      })
      .addCase(createCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(moveCard.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        const columnIndex = state.items.findIndex(column =>
          column.cards.some(card => card._id === action.payload._id)
        );

        if (columnIndex !== -1) {
          const cardIndex = state.items[columnIndex].cards.findIndex(
            card => card._id === action.payload._id
          );
          if (cardIndex !== -1) {
            state.items[columnIndex].cards.splice(cardIndex, 1);
          }
        }

        const newColumnIndex = state.items.findIndex(
          c => c.columnId === action.payload.column
        );

        if (newColumnIndex !== -1) {
          state.items[newColumnIndex].cards.push(action.payload);
        }
      })
      .addCase(moveCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteCard.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const cardId = action.meta.arg;

        const columnIndex = state.items.findIndex(column =>
          column.cards.some(card => card._id === cardId)
        );

        if (columnIndex !== -1) {
          const cardIndex = state.items[columnIndex].cards.findIndex(
            card => card._id === cardId
          );
          if (cardIndex !== -1) {
            state.items[columnIndex].cards.splice(cardIndex, 1);
          }
        }
      })
      .addCase(deleteCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(changeCard.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(changeCard.fulfilled, (state, action) => {
        state.loading = false;
        const columnIndex = state.items.findIndex(
          c => c.columnId === action.payload.column
        );

        if (columnIndex !== -1) {
          const cardIndex = state.items[columnIndex].cards.findIndex(
            card => card._id === action.payload._id
          );

          if (cardIndex !== -1) {
            state.items[columnIndex].cards[cardIndex] = {
              ...state.items[columnIndex].cards[cardIndex],
              ...action.payload,
            };
          }
        }
      })
      .addCase(changeCard.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export const cardsActions = slice.actions;
export const cardsReducer = slice.reducer;
// export default slice.reducer;
export const { setCards } = slice.actions;
export const { addEmptyColumn } = slice.actions;
