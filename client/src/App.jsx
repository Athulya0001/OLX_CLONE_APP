import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import SelectCategory from "./components/Post/SelectCategory";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import OtpVerification from "./components/Verify/OtpVerification";
import Wishlist from "./components/GetWishlist/WIshlist";

const App = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token,]);

  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home user={user}/> : <Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerification />} /> {/* New Route */}
        {token && <Route path="/home" element={<Home user={user}/>} />}
        <Route path="/post-category" element={<SelectCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist/>}/>
      </Routes>
    </div>
  );
};

export default App;