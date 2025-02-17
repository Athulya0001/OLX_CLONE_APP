import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Reducers/authSlice'

const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
  });
  
  export default store;