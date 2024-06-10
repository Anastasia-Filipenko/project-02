import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { allBoards } from './tempBackend';

axios.defaults.baseURL = 'https://taskpro-final-project.onrender.com/api/';
axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjVjNjQxODZlOWJkMzk1OTdhMTE4OSIsImlhdCI6MTcxNzk0NTkyOCwiZXhwIjoxNzE4MDMyMzI4fQ.OHu8kN5nmzicmlm3S_huW-HjH_Mx0p_8AAorxDjAC1I`;

export const fetchCurrentBoard = createAsyncThunk(
  'boards/fetchCurrentBoard',
  async (boardId, thunkAPI) => {
    try {
      const response = await axios.get(`/board/${boardId}`);
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
      const response = await axios.post('/board', boardData);
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
      const response = await axios.post('/column', { boardId, title: columnTitle });
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
      // const response = await axios.get(`/boards?id=${boardId}`);
      const response = allBoards();
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
