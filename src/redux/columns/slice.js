import { createSlice } from '@reduxjs/toolkit';
import {
  addColumn,
  editColumn,
  deleteColumn
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

const columnsSlice = createSlice({
  name: 'columns',
  initialState: {
    boardId: undefined,
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setColumns(state, action) {
      state.boardId = action.payload.boardId;
      state.items = action.payload.columns;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addColumn.pending, handlePending)
      .addCase(addColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log('adding columns', action.payload)
        state.items && state.items.length > 0
          ? (state.items = [
              ...state.items,
              action.payload,
            ])
          : (state.items = [action.payload]);
          console.log('added column', state.items)
      })
      .addCase(addColumn.rejected, handleRejected)
      .addCase(editColumn.pending, handlePending)
      .addCase(editColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const columnIndex = state.items?.findIndex(c => c._id === action.payload._id);
        if (columnIndex > -1) {
          state.items[columnIndex] = action.payload;
        }
      })
      .addCase(editColumn.rejected, handleRejected)
      .addCase(deleteColumn.pending, handlePending)
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const columnIndex = state.items?.findIndex(c => c._id === action.payload._id);
        if (columnIndex > -1) {
          state.items.splice(columnIndex, 1);
        }
      })
      .addCase(deleteColumn.rejected, handleRejected);
    // .addCase(logOut.fulfilled, state => {
    //   state.board = {};
    // })
  },
});

export const columnsActions = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
export const { setColumns } = columnsSlice.actions;
