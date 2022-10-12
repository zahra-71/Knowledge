import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  appName: 'Knowledge',
  token: null,
  viewChangeCounter: 0,
  currentUser: null,
  appLoaded: false,
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    appLoaded: (state, action) => {
      state.token =  action.payload.token;
      state.appLoaded = true;
      state.currentUser = action.payload.user;
    },
    homeUnLoaded: (state, action) => {
      state.viewChangeCounter = state.viewChangeCounter + 1;
    },
    logOut: (state, action) => {
      state.token =  null;
      state.currentUser = null;
    }
  }
})

export const { appLoaded, homeUnLoaded, logOut } = commonSlice.actions;
export default commonSlice.reducer;

export const SelectCurrentUser = (state) => state.common.currentUser