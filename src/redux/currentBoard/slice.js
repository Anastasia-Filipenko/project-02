import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentBoard,
} from "./operations";
// import {
//   logOut
// } from "../auth/operations";
import toast from "react-hot-toast";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  toast.error(action.payload);
};

const currentBoardSlice = createSlice({
  name: "currentBoard",
  initialState: {
    board: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentBoard.pending, handlePending)
      .addCase(fetchCurrentBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.board = action.payload;
      })
      .addCase(fetchCurrentBoard.rejected, handleRejected)
      // .addCase(logOut.fulfilled, state => {
      //   state.board = {};
      // })
  },
});

export const currentBoardActions = currentBoardSlice.actions;
export const currentBoardReducer = currentBoardSlice.reducer;
