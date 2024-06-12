import { createSlice } from '@reduxjs/toolkit';
import { updateUserInfo } from './operations';
import { login, refreshUser, registered } from '../auth/operations';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
    password: null,
    userId: null,
    avatar: null,
  },
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.id;
      state.avatar = action.payload.avatarURL;
      state.password = action.payload.password;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(registered.fulfilled, (state, action) => {
        console.log('registered.fulfilled payload:', action.payload);
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.userId = action.payload.id;
        state.avatar = action.payload.avatarURL;
        state.password = action.payload.password;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        console.log('updateUserInfo.fulfilled payload:', action.payload);
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.avatar = action.payload.avatarURL;
        state.password = action.payload.password;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.userId = action.payload.id;
        state.avatar = action.payload.avatarURL;
        state.password = action.payload.password;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.userId = action.payload.id;
        state.avatar = action.payload.avatarURL;
        state.password = action.payload.password;
      }),
});
export const selectUserName = state => state.user.name;
export const selectUserEmail = state => state.user.email;
export const selectUserPassword = state => state.user.password;
export const selectUserId = state => state.user.userId;
export const selectUserAvatar = state => state.user.avatar;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
