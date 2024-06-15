import { needHelpApi } from '../../api/userApi/userApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendEmail = createAsyncThunk(
  'help/sendEmail',
  async (data, thunkAPI) => {
    try {
      const response = await needHelpApi(data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
