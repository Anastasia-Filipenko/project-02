import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrentBoard,
  fetchAllBoards,
  addBoard,
  deleteBoards,
  editBoard,
} from './operations';
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
  backgrounds: [],
  initialState: {
    boards: [],
    currentBoard: {
      _id: undefined,
      title: undefined,
      icon: undefined,
      background: undefined,
      columns: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentBoard(state, action) {
      state.currentBoard = action.payload;
    },
    setBackgrounds(state, action) {
      state.backgrounds = action.payload;
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
      .addCase(addBoard.rejected, handleRejected)
      .addCase(editBoard.pending, handlePending)
      .addCase(editBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const boardIndex = state.boards?.findIndex(
          b => b._id === action.payload._id
        );
        if (boardIndex > -1) {
          state.boards[boardIndex] = action.payload;
          state.currentBoard = action.payload;
        }
      })
      .addCase(editBoard.rejected, handleRejected)
      .addCase(deleteBoards.pending, handlePending)
      .addCase(deleteBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.boards = state.boards.filter(
          board => board._id !== action.meta.arg
        );
      })
      .addCase(deleteBoards.rejected, handleRejected);
    // .addCase(logOut.fulfilled, state => {
    //   state.board = {};
    // })
  },
});

export const boardsActions = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
export const { setCurrentBoard } = boardsSlice.actions;
export const { setBackgrounds } = boardsSlice.actions;
