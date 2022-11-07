import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

}

export const authorProfileSlice = createSlice({
  name: 'authorProfile',
  initialState,
  reducers: {
    authorProfileLoaded: (state, action) => {
      state.authorProfile = action.payload["0"];
      state.authorProfileArticles = action.payload["1"];
    },
    authorProfileUnLoaded: (state, action) => {

    },
    authorProfileFollow: (state, action) => {
      state.follow = action.payload
      console.log(state.follow)
    },
    authorProfileChangePage: (state, action) => {
      state.authorProfileArticles = action.payload
    }
  }
})

export const { authorProfileLoaded, authorProfileUnLoaded, authorProfileFollow, authorProfileChangePage } = authorProfileSlice.actions;
export default authorProfileSlice.reducer;

export const selectAuthorProfile = (state) => state.authorProfile.authorProfile;
export const selectAuthorProfileArticles = (state) => state.authorProfile.authorProfileArticles;