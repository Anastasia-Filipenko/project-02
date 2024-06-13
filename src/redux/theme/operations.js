import { createAsyncThunk } from '@reduxjs/toolkit';
import { changeUserThemeApi } from '../../api/userApi/userApi';

export const changeTheme = createAsyncThunk(
  'user/changeTheme',
  async ({ id, theme }, thunkAPI) => {
    try {
      console.log(id, theme);
      const response = await changeUserThemeApi(id, theme);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
