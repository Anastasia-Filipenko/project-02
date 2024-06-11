import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'comment',
  initialState: {
    email: '',
    comment: '',
  },

  reducers: {
    sendComment(state, action) {
      state.email = action.payload.email;
      state.comment = action.payload.comment;
    },
  },
});

export const { sendComment } = slice.actions;
export default slice.reducer;
export const selectEmail = state => state.comment.email;
export const selectComment = state => state.comment.comment;
