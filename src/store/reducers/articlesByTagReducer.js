import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

}

const articlesByTagSlice = createSlice({
  name: 'articlesListByTag',
  initialState,
  reducers: {
    articlesByTagLoaded: (state, action) => {
      state.articlesByTag = action.payload
    },
    articlesTag: (state, action) => {
      state.tag = action.payload
    }
  }
})

export const { articlesByTagLoaded, articlesTag } = articlesByTagSlice.actions;
export default articlesByTagSlice.reducer;

export const selectArticlesByTag = (state) => state.articlesListByTag.articlesByTag;
export const selectTag = (state) => state.articlesListByTag.tag;