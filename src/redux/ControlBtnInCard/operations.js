import { createAsyncThunk } from '@reduxjs/toolkit';

import { deleteCardApi, moveCardApi } from '../../api/cardsApi/cardsApi';
// axios.defaults.baseURL = 'https://taskpro-final-project.onrender.com';

export const deleteCard = createAsyncThunk(
  'controlCards/deleteCard',
  async (cardId, thunkAPI) => {
    try {
      const response = await deleteCardApi(cardId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const moveCard = createAsyncThunk(
  'controlCards/moveCard',
  async ({ cardId, newColumnId }, thunkAPI) => {
    try {
      const response = await moveCardApi(cardId, newColumnId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
