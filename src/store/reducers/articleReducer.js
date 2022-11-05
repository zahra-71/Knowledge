import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    articleLoaded: (state, action) => {
      state.article = action.payload["0"];
      state.comments = action.payload["1"];
    }
  }
})

export const { articleLoaded } = articleSlice.actions;
export default articleSlice.reducer;

export const selectArticle = (state) => state.article.article;
export const selectComments = (state) => state.article.comments;