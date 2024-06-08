import { createSlice } from '@reduxjs/toolkit';

// Initial state
// const initialState = {
//   theme: 'dark', // default theme
// };

// Slice
const themeSlice = createSlice({
  name: 'theme',
  theme: 'dark',
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// Export actions
export const { setTheme } = themeSlice.actions;

// Export selector
export const selectTheme = state => state.theme;

// Export reducer
export default themeSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const themeSlice = createSlice({
//   name: 'theme',
//   initialState: 'dark',
//   reducers: {
//     setTheme: (state, action) => state.name =action.payload,
//   },
// });

// // export const filtersSlice = createSlice({
// //   name: 'filters',
// //   initialState,
// //   reducers: {
// //     changeFilter: (state, action) => {
// //       state.name = action.payload;
// //     },
// //   },
// // });
// export const { setTheme } = themeSlice.actions;
// export const selectTheme = state => state.name;
// export default themeSlice.reducer;
