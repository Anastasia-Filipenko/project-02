// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  logOutApi,
  loginApi,
  refreshApi,
  registerApi,
} from '../../api/authApi/authApi';

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
