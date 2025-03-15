import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    token: JSON.parse(localStorage.getItem("token")) || null,
    wishlist: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    registerUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = false;
    },
    login: (state, action) => {
      const { token, user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.token = token;
      localStorage.setItem("token", JSON.stringify(token));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
    setWishlist: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, wishlist: action.payload };
      }
    },
  },
});

export const { registerUser, login, logout, setUser, setWishlist } =
  authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
