import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

}

const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileLoaded: (state, action) => {
      state.profile = action.payload["0"]
      state.profileArticles = action.payload["1"]
    },
    profileUnLoaded: (state, action) => {

    },
    profileFollow: (state, action) => {
      state.follow = action.payload
      console.log(state.follow)
    },
    profileChangePage: (state, action) => {
      state.profileArticles = action.payload
    }
  }
})

export const { profileLoaded, profileUnLoaded, profileFollow, profileChangePage } = ProfileSlice.actions;
export default ProfileSlice.reducer;

export const selectProfile = (state) => state.profile.profile;
export const selectProfileArticles = (state) => state.profile.profileArticles;