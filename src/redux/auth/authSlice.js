import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  logOut,
  refreshUser,
  registered,
  updateUserAvatar,
} from './operations';
import { updateUserInfo } from '../../redux/auth/operations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
      userId: null,
      avatar: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder =>
    builder
      .addCase(registered.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload.id;
        state.user.avatar = action.payload.avatarURL;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload.id;
        state.user.avatar = action.payload.avatarURL;
        (state.token = action.payload.token), (state.isLoggedIn = true);
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload.id;
        state.user.avatar = action.payload.avatarURL;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload._id;
        state.user.avatar = action.payload.avatarURL;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload.avatarURL;
      }),
});

export const selectUserName = state => state.auth.user.name;
export const selectUserEmail = state => state.auth.user.email;
export const selectUserId = state => state.auth.user.userId;
export const selectUserAvatar = state => state.auth.user.avatar;

export const authReducer = authSlice.reducer;
