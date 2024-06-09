import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const selectUser = state => state.user;
export const { updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
