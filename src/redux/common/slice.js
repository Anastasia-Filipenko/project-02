import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    currentScreen: 'desktop',
  },
  reducers: {
    setCurrentScreen(state, action) {
      state.currentScreen = action.payload
    }
  }
  
});

export const { setCurrentScreen } = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
