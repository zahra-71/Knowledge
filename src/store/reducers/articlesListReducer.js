import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

}

export const articlesListSlice = createSlice({
  name: 'articlesList',
  initialState,
  reducers:{
    articlesListLoaded: (state, action) => {
      state.feedArticles = action.payload;
      state.feedArticlesCount = action.payload.articlesCount;
    },
    favoriteArticle: (state, action) => {
      state.favorited = action.payload.article.favorited;
      state.favoritedCount = action.payload.article.favoritesCount;
    },
  }
})

export const { articlesListLoaded, favoriteArticle } = articlesListSlice.actions;
export default articlesListSlice.reducer;

export const selectFeedArticles = (state) => state.articlesList.feedArticles ; 
export const selectFeedArticlesCount = (state) => state.articleSlist.feedArticlesCount ; 
export const selectFavorited = (state) => state.articlesList.favorited ; 
export const selectFavoritedCount = (state) => state.articlesList.favoritedCount ; 