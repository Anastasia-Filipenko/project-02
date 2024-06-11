import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'Alina',
    email: 'alina@gmail.com',
    password: '1234qwer',
  },
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});
export const selectUserName = state => state.user.name;
export const selectUserEmail = state => state.user.email;
export const selectUserPassword = state => state.user.password;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
