import { createSlice } from '@reduxjs/toolkit';
import { changeTheme } from './operations';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'dark',
  },
  extraReducers: builder =>
    builder.addCase(changeTheme.fulfilled, (state, action) => {
      state.theme = action.payload.theme;
    }),
});

export const { setTheme } = themeSlice.actions;

// export const selectTheme = state => state.theme.theme;

export default themeSlice.reducer;
