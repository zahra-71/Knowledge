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
    }
  }
})

export const { articleLoaded, addNewComment, deleteComment } = articleSlice.actions;
export default articleSlice.reducer;

export const selectArticle = (state) => state.article.article;
export const selectComments = (state) => state.article.comments;