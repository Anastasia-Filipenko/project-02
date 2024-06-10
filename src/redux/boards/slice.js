import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentBoard, fetchAllBoards, addBoard } from './operations';
// import {
//   logOut
// } from "../auth/operations";
// import toast from "react-hot-toast";

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  // toast.error(action.payload);
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    currentBoard: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentBoard(state, action) {
      state.currentBoard = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentBoard.pending, handlePending)
      .addCase(fetchCurrentBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentBoard = action.payload;
      })
      .addCase(fetchCurrentBoard.rejected, handleRejected)
      .addCase(fetchAllBoards.pending, handlePending)
      .addCase(fetchAllBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.boards = action.payload;
      })
      .addCase(fetchAllBoards.rejected, handleRejected)
      .addCase(addBoard.pending, handlePending)
      .addCase(addBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.boards = [action.payload, ...state.boards];
        state.currentBoard = action.payload;
      })
      .addCase(addBoard.rejected, handleRejected);
    // .addCase(logOut.fulfilled, state => {
    //   state.board = {};
    // })
  },
});

export const boardsActions = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
export const { setCurrentBoard } = boardsSlice.actions;
