import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = ``
}

export const registered = createAsyncThunk('auth/register', async (credential, thunkAPI) => {
    try {
        const responce = await axios.post(
            'https://taskpro-final-project.onrender.com/auth/register',
            credential
        )
        console.log(responce)
        return responce.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const login = createAsyncThunk('auth/login', async (credential, thunkAPI) => {
    try {
        const responce = await axios.post(
            'https://taskpro-final-project.onrender.com/auth/login',
            credential
        )
        setAuthHeader(responce.data.token)
        return responce.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const logOut = createAsyncThunk('auth/logout', async (credential, thunkAPI) => {
    try {
           await axios.post(
            'https://taskpro-final-project.onrender.com/auth/logout',
            credential
        )
        clearAuthHeader()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
        return thunkAPI.rejectWithValue('Unable to fetch user')
    }
    try {
          setAuthHeader(persistedToken)
          const responce = await axios.get('https://taskpro-final-project.onrender.com/auth/current')
          return responce.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})