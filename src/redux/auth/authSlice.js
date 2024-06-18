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
      // console.log(action.payload);
    },
    setUser: (state, action) => {
      // console.log(action.payload);
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(registered.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registered.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload.id;
        state.user.theme = action.payload.theme;
        state.user.avatar = action.payload.avatarURL;
        state.isLoggedIn = true;
      })
      .addCase(registered.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload.id;
        state.user.avatar = action.payload.avatarURL;
        state.user.theme = action.payload.theme;
        (state.token = action.payload.token), (state.isLoggedIn = true);
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = { name: null, email: null, theme: 'dark' };
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
        console.log(action.payload);
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.userId = action.payload._id;
        state.user.avatar = action.payload.avatarURL;
        // state.user.theme = action.payload.theme;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.user.avatar = action.payload.avatar;
      })
      .addCase(changeTheme.fulfilled, (state, action) => {
        state.user.theme = action.payload.theme;
        state.user.avatar = action.payload.avatarURL;
      }),
});

export const { setTheme, setAvatar, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
