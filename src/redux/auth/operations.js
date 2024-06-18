// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  logOutApi,
  loginApi,
  refreshApi,
  registerApi,
  updateCurrentBoardId,
} from '../../api/authApi/authApi';
import {
  changeUserProfileApi,
  changeUserAvatar,
} from '../../api/userApi/userApi';

// const setAuthHeader = token => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = ``;
// };

export const registered = createAsyncThunk(
  'auth/register',
  async (credential, thunkAPI) => {
    try {
      const response = await registerApi(credential);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credential, thunkAPI) => {
    try {
      const response = await loginApi(credential);
      //   setAuthHeader(response.data.token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (credential, thunkAPI) => {
    try {
      await logOutApi(credential);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      const response = await refreshApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async ({ id, data }, thunkAPI) => {
    try {
      console.log(data);
      const response = await changeUserProfileApi(id, data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'auth/updateUserAvatar',
  async (data, thunkAPI) => {
    try {
      console.log({ data });
      const response = await changeUserAvatar(data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateBoardId = createAsyncThunk(
  'auth/updateCurrentBoardId',
  async (boardId, thunkAPI) => {
    try {
      const data = await updateCurrentBoardId(boardId);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
