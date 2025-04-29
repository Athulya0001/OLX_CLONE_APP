import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults/SearchResults";
import OtpVerification from "./components/Verify/OtpVerification";
import SelectCategory from "./components/Post/SelectCategory";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Wishlist from "./pages/GetWishlist/Wishlist";
import Profile from "./pages/Profile/Profile";
import { setUser } from "./ReduxStore/Reducers/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (
      !token &&
      location.pathname !== "/signin" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/"
    ) {
      navigate("/signin");
    }
  }, [token, navigate, location]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://olx-clone-backend-5jjd.onrender.com/api/auth",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;

      if (data?.user) {
        dispatch(setUser(data.user));
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error fetching user:", error.message);
      navigate("/signin");
    }
  };

  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Navbar />

      <div className="mx-0 sm:mx-4 md:mx-8 lg:mx-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search-result" element={<SearchResults />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/post-category" element={<SelectCategory />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
