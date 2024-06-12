import { createAsyncThunk } from '@reduxjs/toolkit';
import { changeUserProfileApi } from '../../api/userApi/userApi';

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await changeUserProfileApi(id, data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
