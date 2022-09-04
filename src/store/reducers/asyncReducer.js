import { createSlice } from "@reduxjs/toolkit"

export const initialState = {

}

export const asyncSlice = createSlice({
    name: 'async',
    initialState,
    reducers: {
        asyncStart: (state, sction) => {
            state.inProgress = true;
        },
        asyncEnd: (state, action) => {
            state.inProgress = false;
        }
    }
})

export const { asyncStart, asyncEnd } = asyncSlice.actions;

export default asyncSlice.reducer;