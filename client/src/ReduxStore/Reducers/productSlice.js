import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],  
    products: [],
    searchResults: [], 
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
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { addProduct, allProducts, setSearchResults } = productSlice.actions;
export const selectProducts = (state) => state.products.items;
export const selectSearchResults = (state) => state.products.searchResults;

export default productSlice.reducer;
