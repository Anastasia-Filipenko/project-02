import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    photo: '/path/to/photo.jpg',
  },
  reducers: {
    updateUserProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
