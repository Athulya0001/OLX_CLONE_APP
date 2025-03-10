import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated:
      JSON.parse(localStorage.getItem("isAuthenticated")) !== "" || false,
    token: JSON.parse(localStorage.getItem("token")) || null,
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    registerUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = false;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    login: (state, action) => {
      const { token, user } = action.payload;
      console.log(token, user);
      state.user = user;
      state.isAuthenticated = true;
      state.token = token;
      localStorage.setItem("token", JSON.stringify(token));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.wishlist = [];
      localStorage.clear();
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(action.payload));
    },
  },
});

export const { registerUser, login, logout, setWishlist,setUser } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
