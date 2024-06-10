import { createAsyncThunk } from '@reduxjs/toolkit';
import { boardInstance, columnInstance } from '../../api/axiosConfig';

export const fetchCurrentBoard = createAsyncThunk(
  'boards/fetchCurrentBoard',
  async (boardId, thunkAPI) => {
    try {
      const response = await boardInstance.get(`/${boardId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (boardData, thunkAPI) => {
    try {
      const response = await boardInstance.post('/', boardData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  'boards/addColumn',
  async ({ boardId, columnTitle }, thunkAPI) => {
    try {
      const response = await columnInstance.post('/', { boardId, title: columnTitle });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchAllBoards = createAsyncThunk(
  'boards/fetchAllBoards',
  async (_, thunkAPI) => {
    try {
      // const response = await boardInstance.get('/');
      const response = { data: []};
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// export const addContact = createAsyncThunk(
//   "contacts/addContact",
//   async (contact, thunkAPI) => {
//     try {
//       const response = await axios.post("/contacts", contact);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const updateContact = createAsyncThunk(
//   "contacts/updateContact",
//   async (contact, thunkAPI) => {
//     try {
//       const response = await axios.patch(`/contacts/${contact.id}`, {
//         name: contact.name,
//         number: contact.number,
//       });
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const deleteContact = createAsyncThunk(
//   "contacts/deleteContact",
//   async (contactId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`/contacts/${contactId}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
