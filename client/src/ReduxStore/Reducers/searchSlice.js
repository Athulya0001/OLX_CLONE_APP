import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (query) => {
    const response = await axios.get(`/api/products/search?q=${query}`);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: { results: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default searchSlice.reducer;