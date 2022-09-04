import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        homeLoaded: (state, action) => {
            state.tags = action.payload.tags
        },
        homeUnLoaded: () => {
        }

    }
})

export const { homeLoaded } = homeSlice.actions;

export const selectTags = (state) => state.home.tags;

export default homeSlice.reducer;