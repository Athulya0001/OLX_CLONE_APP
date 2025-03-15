import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import SelectCategory from "./components/Post/SelectCategory";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import OtpVerification from "./components/Verify/OtpVerification";
import axios from "axios";
import Wishlist from "./pages/GetWishlist/Wishlist";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./ReduxStore/Reducers/authSlice";
import { ToastContainer } from "react-toastify";
import SearchResults from "./pages/SearchResults/SearchResults";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      if (
        window.location.pathname !== "/signup" &&
        window.location.pathname !== "/signin"
      ) {
        navigate("/");
      }
    } else {
      fetchUserData();
    }
  }, [navigate, dispatch]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      console.log(response.data);
      dispatch(setUser(response.data.user));
      if (data.message === "Invalid or expired token") {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="mx-30">
      <ToastContainer
        position="top-right"
        autoClose={3000} // Closes after 3 seconds
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Signin />} />
        {/* <Route path="/" element={<Signin />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/search-result" element={<SearchResults />} />
        <Route path="/verify-otp" element={<OtpVerification />} />{" "}
        {/* {token && <Route path="/home" element={<Home />} />} */}
        <Route path="/post-category" element={<SelectCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
