import { createSlice } from '@reduxjs/toolkit';
import { createCard } from './operations.js';

const slice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  extraReducers: builder =>
    builder
      .addCase(createCard.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        // state.cards.items.push(action.payload);
      })
      .addCase(createCard.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export default slice.reducer;
