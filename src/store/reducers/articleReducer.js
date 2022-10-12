import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers:{
    articlesLoaded: (state, action) => {
      state.feedArticles = action.payload;
      state.feedArticlesCount = action.payload.articlesCount;
    }

  }
})

export const { articlesLoaded } = articleSlice.actions;
export default articleSlice.reducer;

export const selectFeedArticles = (state) => state.article.feedArticles ; 
export const selectFeedArticlesCount = (state) => state.article.feedArticlesCount ; 