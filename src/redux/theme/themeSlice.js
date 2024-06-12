import { createSlice } from '@reduxjs/toolkit';
import { changeTheme } from './operations';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'dark',
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: builder =>
    builder.addCase(changeTheme.fulfilled, (state, action) => {
      state.theme = action.payload.theme;
    }),
});

// Export actions
export const { setTheme } = themeSlice.actions;

// Export selector
export const selectTheme = state => state.theme.theme;

// Export reducer
export default themeSlice.reducer;
