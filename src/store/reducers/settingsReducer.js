import { createSlice } from "@reduxjs/toolkit"

export const initialState = {

}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers:{
    userLoaded: (state, action) => {
      state.user = action.payload.user;
    },
    userUpdatedLoaded: (state, action) => {
      state.userUpdated = action.payload.user
      state.userUpdatedText = state.userUpdated? "اطلاعات شما تغییر یافت" : ""
      state.error = action.payload.error? "مجدادا تلاش کنید" : ""
    },
    userUpdatedUnloaded: (state, action) => {
      state.userUpdated = null
      state.userUpdatedText = null
      state.error = null
    }
  }
})

export const { userLoaded, userUpdatedLoaded, userUpdatedUnloaded } = settingsSlice.actions
export default settingsSlice.reducer;

export const selectUser = (state) => state.settings.user
export const selectuserUpdatedText = (state) => state.settings.userUpdatedText
export const selectUserError = (state) => state.settings.error