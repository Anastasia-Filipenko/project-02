import { createSlice } from '@reduxjs/toolkit';
import { login } from '../auth/operations';
import { updateUserInfo } from './userOperations';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
    password: '1234qwer',
    userId: null,
    avatar: null,
  },
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.id;
      state.avatar = action.payload.avatarURL;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.userId = action.payload.id;
        state.avatar = action.payload.avatarURL;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.userId = action.payload.id;
        state.avatar = action.payload.avatarURL;
      }),
});
export const selectUserName = state => state.user.name;
export const selectUserEmail = state => state.user.email;
export const selectUserPassword = state => state.user.password;
export const selectUserId = state => state.user.userId;
export const selectUserAvatar = state => state.user.avatar;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
