import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  logOut,
  refreshUser,
  registered,
  updateUserAvatar,
} from './operations';
import { updateUserInfo } from '../../redux/auth/operations';
import { changeTheme } from '../theme/operations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
      userId: null,
      avatar: null,
      theme: 'dark',
      password: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
  },
  reducers: {
    setAvatar: (state, action) => {
      state.user.avatar = action.payload;
    },
    setUser: (state, action) => {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(registered.pending, state => {
        state.isLoading = true;
      })
      .addCase(registered.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload.id;
        state.user.theme = action.payload.theme;
        state.user.avatar = action.payload.avatarURL;
        state.user.password = action.payload.password;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(registered.rejected, state => {
        state.isLoading = false;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload.id;
        state.user.avatar = action.payload.avatarURL;
        state.user.theme = action.payload.theme;
        state.user.password = action.payload.password;
        (state.token = action.payload.token), (state.isLoggedIn = true);
        state.isLoading = false;
      })
      .addCase(login.rejected, state => {
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = {
          name: null,
          email: null,
          userId: null,
          avatar: null,
          theme: 'dark',
          password: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload.id;
        state.user.avatar = action.payload.avatarURL;
        state.user.password = action.payload.password;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(updateUserInfo.pending, state => {
        state.isLoading = false;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload._id;
        state.user.avatar = action.payload.avatarURL;
        state.user.password = action.payload.password;
      })
      .addCase(updateUserInfo.rejected, state => {
        state.isLoading = false;
      })
      .addCase(updateUserAvatar.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload.avatarURL;
        state.isLoading = false;
      })
      .addCase(updateUserAvatar.rejected, state => {
        state.isLoading = false;
      })
      .addCase(changeTheme.fulfilled, (state, action) => {
        state.user.theme = action.payload.theme;
        state.user.avatar = action.payload.avatarURL;
      }),
});

export const { setTheme, setAvatar, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
