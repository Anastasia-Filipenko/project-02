import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { deleteCardApi, moveCardApi } from '../../api/cardsApi/cardsApi';
// axios.defaults.baseURL = 'https://taskpro-final-project.onrender.com';

export const deleteCard = createAsyncThunk(
  'controlCards/deleteCard',
  async (cardId, thunkAPI) => {
    try {
      const response = await deleteCardApi(`/${cardId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const moveCard = createAsyncThunk(
  'controlCards/moveCard',
  async ({ cardId, targetColumnId }, thunkAPI) => {
    try {
      const response = await moveCardApi(`${cardId}/move`, {
        targetColumnId,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchCards = createAsyncThunk(
//   'controlCards/fetchCards',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('/api/card');
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
// export const getIdCard = createAsyncThunk(
//   'controlCards/getIdCard',
//   async (_, thunkAPI) => {
//     try {
//       const result = await axios.get('/api/card');
//       console.log(result);
//       return result;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// /api/card/{id}

// export const updateCard = createAsyncThunk(
//   'controlCard/updateCard',
//   async (cardId, body) => {
//     try {
//       const { data } = await axios.put(`${cardId}`, body);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
