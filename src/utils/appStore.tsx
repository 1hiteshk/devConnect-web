import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedSlice'

const appStore = configureStore({
  reducer: {
    // Define your reducers here
    user: userReducer, // Import your slice here
    feed: feedReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // Define your middleware here
  }),
  //devTools: process.env.NODE_ENV === "development", // Enable Redux DevTools in development mode
});

export default appStore;