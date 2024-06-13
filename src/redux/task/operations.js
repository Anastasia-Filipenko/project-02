// import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCardApi, deleteCardApi } from '../../api/cardsApi/cardsApi.js';

export const getAllCardsInBoard = createAsyncThunk(
    "api/getAllCardsInBoard",
    async (_, thunkAPI) => {
        try {
            // we need board id, by this id get all columns, then get all cards by column id's
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// its working
export const createCard = createAsyncThunk(
    "api/createCard",
    async (cardInfo, thunkAPI) => {
        try {
            console.log("cardInfo: ", cardInfo);
            const response = await createCardApi(cardInfo);
            console.log("response.data", response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// its not working
export const deleteCard = createAsyncThunk(
    "api/deleteCard",
    async (cardId, thunkAPI) => {
        try {
            const response = await deleteCardApi(cardId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);






