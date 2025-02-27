import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
    token: JSON.parse(localStorage.getItem("token")) || null,
    isVerified: JSON.parse(localStorage.getItem("isVerified")) || false,
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = false;
      state.isVerified = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isVerified", JSON.stringify(false));
    },
    login: (state, action) => {
      if (action.payload.isVerified) {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isVerified = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        localStorage.setItem("isVerified", JSON.stringify(true));
      } else {
        state.isAuthenticated = false;
        state.isVerified = false;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isVerified = false;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("isVerified");
    },
  },
});

export const { registerUser, login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsVerified = (state) => state.auth.isVerified;

export default authSlice.reducer;
