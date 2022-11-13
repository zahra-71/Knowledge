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
      state.error = action.payload.errors
      state.redirect = `/article/${state.newArticle.slug}`
      console.log(state.error)
    },
    addNewArticleUnLoaded: (state, action) => {
      state.redirect = null
    },
    deleteArticle: (state, action) => {
      state.deleteArticle = action.payload
    }
  }
})

export const { articleLoaded, addNewComment, deleteComment, addNewArticleLoaded,
addNewArticleUnLoaded, deleteArticle } = articleSlice.actions;
export default articleSlice.reducer;

export const selectArticle = (state) => state.article.article;
export const selectComments = (state) => state.article.comments;
export const selectRedirect = (state) => state.article.redirect;