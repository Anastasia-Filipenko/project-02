import { createSlice } from "@reduxjs/toolkit";
import { login, logOut, refreshUser, registered } from "./operations";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: null,
            email: null,
        },
        token: null,
        isLoggedIn: false,
        isRefreshing: false,
    },
    extraReducers: builder => 
    builder
    .addCase(registered.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token,
        state.isLoggedIn = true;
    })
    .addCase(logOut.fulfilled, (state, action) => {
        state.user = { name: null, email: null};
        state.token = null;
        state.isLoggedIn = false;
    })
    .addCase(refreshUser.pending, (state, action) => {
        state.isRefreshing = true;
    })
    .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
    })
    .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
    })
})

export const authReducer = authSlice.reducer;