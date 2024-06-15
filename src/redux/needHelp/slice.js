import { createSlice } from '@reduxjs/toolkit';
import { sendEmail } from './operations';

const needHelpSlice = createSlice({
  name: 'help',
  initialState: {
    userEmail: '',
    comment: '',
  },

  extraReducers: builder =>
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      state.userEmail = action.payload.userEmail;
      state.comment = action.payload.comment;
    }),
});

export default needHelpSlice.reducer;
