import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],  
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
      state.products.push(action.payload._id);
    },
    allProducts: (state, action) => {
      state.items = action.payload.products; 
      state.products = action.payload.products.map((product) => product._id); 
    },
  },
});

export const { addProduct, allProducts } = productSlice.actions;
export const selectProducts = (state) => state.products.items;

export default productSlice.reducer;
