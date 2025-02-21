import {  createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
    token: JSON.parse(localStorage.getItem("token")) || null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token")
    },
  },
});

export const { registerUser, login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;