import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import SelectCategory from "./components/Post/SelectCategory";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import OtpVerification from "./components/Verify/OtpVerification";
import Wishlist from "../src/components/GetWishlist/Wishlist";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./ReduxStore/Reducers/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;
      dispatch(setUser(response.data.user));
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerification />} />{" "}
        {/* New Route */}
        {token && <Route path="/home" element={<Home />} />}
        <Route path="/post-category" element={<SelectCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
};

export default App;
