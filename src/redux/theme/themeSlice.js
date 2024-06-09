import { createSlice } from '@reduxjs/toolkit';



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
});

// Export actions
export const { setTheme } = themeSlice.actions;

// Export selector
export const selectTheme = state => state.theme.theme;

// Export reducer
export default themeSlice.reducer;

