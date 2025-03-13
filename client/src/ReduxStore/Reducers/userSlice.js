import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user profile
export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async () => {
  const res = await axios.get("/api/user/profile");
  return res.data;
});

// Update user profile
export const updateUserProfile = createAsyncThunk("user/updateProfile", async (userData) => {
  const res = await axios.put("/api/user/profile", userData);
  return res.data;
});

// Delete a product
export const deleteProduct = createAsyncThunk("user/deleteProduct", async (productId) => {
  await axios.delete(`/api/user/delete-product/${productId}`);
  return productId;
});

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.user.productsadd = state.user.productsadd.filter(
          (product) => product._id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;
