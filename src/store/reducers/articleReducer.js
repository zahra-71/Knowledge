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
    },
    articleUnloaded: (state, action) => {
      state.article = null;
      state.comments = null
    },
    addNewComment: (state, action) => {
      state.newComment = action.payload.comment || null;
      state.comments.comments.unshift(state.newComment)
    },
    deleteComment: (state, action) => {
      state.deleteCommentIndex = action.payload;
      state.comments.comments.splice( state.deleteCommentIndex, 1)
    },
    addNewArticleLoaded: (state, action) => {
      state.newArticle = action.payload.article
      state.redirect = state.newArticle && `/article/${state.newArticle.slug}`
      state.error = action.payload.errors? "عنوان تکراری است" : ""
      console.log(state.error)
    },
    addNewArticleUnLoaded: (state, action) => {
      state.redirect = null;
      state.updateArticle = null;
    },
    deleteArticle: (state, action) => {
      state.deleteArticle = action.payload
    },
    updateArticle: (state, action) => {
      state.updateArticle = action.payload.article
      // console.log(state.updateArticle)
    },
    updatedArticle: (state, action) => {
      state.updatedArticle = action.payload.article;
      state.redirect = `/article/${state.updatedArticle.slug}`
      // console.log(state.redirect)
    },
  }
})

export const { articleLoaded, articleUnloaded, addNewComment, deleteComment, addNewArticleLoaded,
addNewArticleUnLoaded, deleteArticle, updateArticle,
updatedArticle } = articleSlice.actions;
export default articleSlice.reducer;

export const selectArticle = (state) => state.article.article;
export const selectComments = (state) => state.article.comments;
export const selectRedirect = (state) => state.article.redirect;
export const selectUpdateArticle = (state) => state.article.updateArticle;
export const selectError = (state) => state.article.error;