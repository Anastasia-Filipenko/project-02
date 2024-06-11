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
        console.log('updateUserInfo.fulfilled payload:', action.payload);
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.userId = action.payload._id;
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

//  _id: '6668b9505fbb99b8843d509a',
//   name: 'alinacccc',
//   password: '1234qwer',
//   email: 'test25@gmail.com',
//   theme: 'dark',
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjhiOTUwNWZiYjk5Yjg4NDNkNTA5YSIsImlhdCI6MTcxODEzOTIyNywiZXhwIjoxNzE4MjI1NjI3fQ.jMir16tBQ-fvlgjAkvo-AGF4Wuibp7N2sbSEzus6iDc',
//   avatarURL: '//www.gravatar.com/avatar/e41b8452ea5903c1a6aac7a1869a55eb',
//   verify: false,
//   verificationToken: 'Sey8Bn467M2gN_XwWm3l9',
//   createdAt: '2024-06-11T20:53:36.794Z',
//   updatedAt: '2024-06-11T20:55:17.659Z'
