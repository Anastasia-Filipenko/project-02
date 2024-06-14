import { createAsyncThunk } from '@reduxjs/toolkit';
import { changeUserThemeApi } from '../../api/userApi/userApi';

export const changeTheme = createAsyncThunk(
  'user/changeTheme',
  async ({ _id, theme }, thunkAPI) => {
    try {
      const response = await changeUserThemeApi(_id, { theme });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
