import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState: null,
    reducers: {
        // the state will be null first refers to initial state
        // whatever we will return will update the state
        addUser: (state,action) => {
            return action.payload;
        },
        removeUser: (state,action) => {
            return null;
        }
    }
});

export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer;
