// import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCardApi,
  deleteCardApi,
  moveCardApi,
} from '../../api/cardsApi/cardsApi.js';

export const getAllCardsInBoard = createAsyncThunk(
  'api/getAllCardsInBoard',
  async (_, thunkAPI) => {
    try {
      // we need board id, by this id get all columns, then get all cards by column id's
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// its working
export const createCard = createAsyncThunk(
  'api/createCard',
  async (cardInfo, thunkAPI) => {
    try {
      const response = await createCardApi(cardInfo);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
