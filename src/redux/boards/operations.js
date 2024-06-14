import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addBoardApi,
  currentBoardApi,
  deleteBoardApi,
} from '../../api/boardApi/boardApi';
import { setColumns } from '../columns/slice';
import { getAllUserDataApi } from '../../api/authApi/authApi';

export const fetchCurrentBoard = createAsyncThunk(
  'boards/fetchCurrentBoard',
  async (boardId, thunkAPI) => {
    try {
      const response = await currentBoardApi(boardId);
      thunkAPI.dispatch(
        setColumns({ boardId, columns: response.data?.columns })
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (boardData, thunkAPI) => {
    try {
      const response = await addBoardApi(boardData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchAllBoards = createAsyncThunk(
  'boards/fetchAllBoards',
  async (_, thunkAPI) => {
    try {
      const response = await getAllUserDataApi();

      const simpleBoards = response.data?.map(b => {
        const { columns: _, ...s } = b;
        return s;
      });
      return simpleBoards;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteBoards = createAsyncThunk(
  'boards/deleteBoards',
  async (id, thunkAPI) => {
    try {
      const response = await deleteBoardApi(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
