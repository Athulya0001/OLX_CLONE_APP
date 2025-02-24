import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Home from "./pages/Home/Home";
import SelectCategory from "./components/Post/SelectCategory";

const App = () => {
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("token"))
   useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);
  
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Signin />} /> */}
        <Route path="/signup" element={<Signup />} />
        {token ? (
          <Route path="/home" element={<Home />} />
        ) : (
          <Route path="/" element={<Signin />} />
        )}

        {/* <Route path="/products" element={<Create/>} /> */}
        <Route path="/post-category" element={<SelectCategory />} />
      </Routes>
    </div>
  );
};

export default App;
