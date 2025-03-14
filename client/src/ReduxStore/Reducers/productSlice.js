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
      state.items = action.payload;
      console.log(state.items, "============================================");
      state.products = action.payload.map((product) => product._id);
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { addProduct, allProducts, setSearchResults } =
  productSlice.actions;
export const selectProducts = (state) => state.products.items;

export default productSlice.reducer;
