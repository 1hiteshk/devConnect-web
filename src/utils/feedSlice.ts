import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: [] ,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            const newFeed = state.filter((user:any) => user._id !== action.payload )
            return newFeed;
        }
    }
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;