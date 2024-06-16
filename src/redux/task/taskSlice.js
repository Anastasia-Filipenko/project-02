import { createSlice } from '@reduxjs/toolkit';
import { createCard } from './operations.js';

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
      state.items.push({ columnId: action.payload.columnId , cards: []});
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
        const columnIndex = state.items?.findIndex(c => c.columnId === action.payload.column);
        if (columnIndex > -1) {
          state.items[columnIndex].cards.push(action.payload);
        }
      })
      .addCase(createCard.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export const cardsActions = slice.actions;
export const cardsReducer = slice.reducer;
// export default slice.reducer;
export const { setCards } = slice.actions;
export const { addEmptyColumn } = slice.actions;
