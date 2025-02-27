import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import {GoogleLogin} from '@react-oauth/google'
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Home from "./pages/Home/Home";
// import axios from 'axios'; // Import axios
import SelectCategory from "./components/Post/SelectCategory";
import ProductDetails from "./components/ProductDetails/ProductDetails";

const App = () => {
  const navigate = useNavigate()
  // const [user, setUser] = useState(null)
  const token = JSON.parse(localStorage.getItem("token"))
   useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

// const responseGoogle = (response) => {
//   if (response.credential) {
//     // Send the token to the backend for verification using axios
//     axios.post("http://localhost:3000/api/auth/google", {
//       token: response.credential,
//     })
//     .then((res) => {
//       const data = res.data; // Response from backend
//       if (data.token) {
//         localStorage.setItem("token", JSON.stringify(data.token));
//         setUser(data.user);
//         navigate("/home");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
//   }
// };

  
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
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default App;