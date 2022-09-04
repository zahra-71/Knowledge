import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    username: null,
    token: null,
    redirectTo: null,
    inprogress: false,
    errors: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.user ? action.payload.user.username : null;
            state.token = action.payload.user ? action.payload.user.token : null;
            state.inprogress = false;
            state.redirectTo = action.payload.errors ? null : '/';
            state.errors = action.payload.errors ? "نام کاربری یا رمز عبور اشتباه است" : null;
        },
        loginUnloaded: (state, action) => {

        },
        register: (state, action) => {
            // state.user = action.payload.user;
            state.username = action.payload.user ? action.payload.user.username : null;
            state.token = action.payload.user ? action.payload.user.token : null;
            state.errors = action.payload.errors ? action.payload.errors : null;
            state.redirectTo = action.payload.errors ? null : '/';
        },
        logOut: (state, action) => {
            // state.redirectTo =  '/';
            state.username = null;
            state.token = null;

        }
    }
})

export const { login, loginUnloaded, register, logOut } = authSlice.actions;
export default authSlice.reducer;

export const SelectToken = (state) => state.auth.token
export const SelectUser = (state) => state.auth.username
export const SelectErrors = (state) => state.auth.errors
export const SelectRedirectTo = (state) => state.auth.redirectTo
export const SelectIsAuthunticated = (state) => state.auth.isAuthunticated