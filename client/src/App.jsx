import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import VerifyEmail from "./components/Verify/VerifyEmail";
import Home from "./pages/Home/Home";
import SelectCategory from "./components/Post/SelectCategory";
import ProductDetails from "./components/ProductDetails/ProductDetails";

const App = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token,]);

  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:token" element={<VerifyEmail />} /> {/* New Route */}
        {token && <Route path="/home" element={<Home />} />}
        <Route path="/post-category" element={<SelectCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default App;