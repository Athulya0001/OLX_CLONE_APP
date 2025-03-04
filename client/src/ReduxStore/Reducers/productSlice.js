import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addProduct } = productSlice.actions;
export const selectProducts = (state) => state.products.items;

export default productSlice.reducer;