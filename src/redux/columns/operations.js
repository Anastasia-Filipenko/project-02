import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addColumnApi,
  editColumnApi,
  deleteColumnApi,
} from '../../api/columnApi/columnApi';

export const addColumn = createAsyncThunk(
  'boards/addColumn',
  async ({ boardId, columnTitle }, thunkAPI) => {
    try {
      const response = await addColumnApi({
        boardId,
        title: columnTitle,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editColumn = createAsyncThunk(
  'boards/editColumn',
  async ({ boardId, columnTitle, columnId }, thunkAPI) => {
    try {
      const response = await editColumnApi({
        boardId,
        title: columnTitle,
        columnId,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'boards/deleteColumn',
  async ({ boardId, columnId }, thunkAPI) => {
    try {
      await deleteColumnApi({ columnId });
      return { _id: columnId };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
