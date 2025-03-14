import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Reducers/authSlice';
import productReducer from './Reducers/productSlice';
// import userReducer from './Reducers/userSlice';

const store = configureStore({
    reducer: {
      auth: authReducer,
      product: productReducer,
      // user: userReducer,
    },
  });
  
  export default store;