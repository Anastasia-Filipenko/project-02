import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { allBoards, addTestBoard, getOneBoard } from './tempBackend';

export const fetchCurrentBoard = createAsyncThunk(
  'boards/fetchCurrentBoard',
  async (boardTitle, thunkAPI) => {
    try {
      // const response = await axios.get(`/boards?id=${boardId}`);
      const response = getOneBoard(boardTitle);
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
      // const response = await axios.get(`/boards?id=${boardId}`);
      // const response = {
      //   data: {
      //     name: 'TestBoard',
      //     columns: [
      //       { name: 'first' },
      //       { name: 'second' },
      //       { name: 'third column' },
      //     ],
      //   },
      // };
      addTestBoard(boardData);
      return boardData;
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
