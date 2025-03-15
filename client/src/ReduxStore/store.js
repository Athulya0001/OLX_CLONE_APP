import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Reducers/authSlice';
import productReducer from './Reducers/productSlice';

const store = configureStore({
    reducer: {
      auth: authReducer,
      product: productReducer,
    },
  });
  
  export default store;