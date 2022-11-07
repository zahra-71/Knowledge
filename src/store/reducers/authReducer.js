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
      state.redirectTo = action.payload.errors ? null : '/';
      state.errors = action.payload.errors ? "نام کاربری یا رمز عبور اشتباه است" : null;
    },
    loginUnloaded: (state, action) => {
      state.redirectTo = null;
    },
    register: (state, action) => {
      state.username = action.payload.user ? action.payload.user.username : null;
      state.token = action.payload.user ? action.payload.user.token : null;
      state.errorsEmail = action.payload.errors["email"]? "ایمیل موجود است" : null;
      state.errorsUsername = action.payload.errors["username"]? "نام کاربری موجود است" : null;
      state.redirectTo = action.payload.errors ? null : '/';
    },
    registerUnloaded: (state, action) => {
      state.errorsEmail = null;
      state.errorsUsername = null;
      state.errors = null;
      state.redirectTo = null;
    },
    logOuteAouth: (state, action) => {
      state.username = null;
      state.token = null;
      state.redirectTo = '/';
    },
    logOutUnloaded: (state, action) => {
      state.redirectTo = null;
    }
  }
})

export const { login, loginUnloaded, register, logOuteAouth, logOutUnloaded, registerUnloaded } = authSlice.actions;
export default authSlice.reducer;

export const SelectToken = (state) => state.auth.token
export const SelectUser = (state) => state.auth.username
export const SelectErrors = (state) => state.auth.errors
export const SelectErrorsEmail = (state) => state.auth.errorsEmail
export const SelectErrorsUsername = (state) => state.auth.errorsUsername
export const SelectRedirectTo = (state) => state.auth.redirectTo
export const SelectIsAuthunticated = (state) => state.auth.isAuthunticated