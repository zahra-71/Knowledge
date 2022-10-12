import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    homeLoaded: (state, action) => {
      state.tags = action.payload["0"];
      state.articles = action.payload["1"];
    },
    homeUnLoaded: () => {
    }
  }
})

export const { homeLoaded } = homeSlice.actions;
export default homeSlice.reducer;

export const selectTags = (state) => state.home.tags;
export const selectArticles = (state) => state.home.articles;
// export const selectFeedArticles = (state) => state.home.feedArticles;