import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../ReduxStore/Reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/olx-logo.png";
import { FaHeart, FaSignOutAlt } from "react-icons/fa";
import UserProfile from "../UserProfile/UserProfile";
import Profile from "../../assets/profile-logo.png";
import { setSearchResults } from "../../ReduxStore/Reducers/productSlice";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const languages = ["English", "Hindi", "Spanish", "French", "German"];

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to Logout?");
    if (isConfirmed) {
      dispatch(logout());
      navigate("/");
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest("#profile-menu")) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmitSearchTerm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/api/search?q=${searchQuery}`);
      const data =  response.data
      if(data.success){
        const searchProducts =  data.products;
        dispatch(setSearchResults(searchProducts));
        navigate("/search-result")
      }

    } catch (error) {
      console.log("error occured", error);
    }
  };
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-full bg-gray-100 shadow-md z-50">
      <nav className="w-full max-w-8xl mx-30 p-3 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-10" />
        </Link>

        <form
          className="hidden md:flex justify-between items-center border border-gray-400 rounded-md bg-white w-2/5"
          onSubmit={handleSubmitSearchTerm}
        >
          <input
            type="text"
            placeholder="Search products..."
            className="outline-none border-none px-2 py-1 w-full"
            name="search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button
            type="submit"
            className="ml-2 text-white bg-black px-3 py-3 h-full"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19a8 8 0 100-16 8 8 0 000 16zm10 2l-6-6"
              ></path>
            </svg>
          </button>
        </form>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center">
            <select className="px-3 py-2">
              {languages.map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <button
              id="profile-menu"
              onClick={() => setShowProfile(!showProfile)}
            >
              <img
                className="h-10 w-10 rounded-full"
                src={Profile}
                alt="Profile"
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 z-50">
                <UserProfile />
                <hr className="my-2" />
                {token && (
                  <>
                    <Link
                      to="/wishlist"
                      className=" px-3 py-2 hover:bg-gray-100 flex items-center gap-x-2"
                    >
                      <FaHeart className="h-6 w-6 text-red-500" />
                      <span>Your Wishlist</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-x-2 w-full text-left px-3 py-2 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="h-6 w-6 text-gray-600" />
                      <span> Logout</span>
                    </button>
                  </>
                )}
                {!token && (
                  <Link
                    to="/login"
                    className="block px-3 py-2 hover:bg-gray-100"
                  >
                    🔑 Login
                  </Link>
                )}
              </div>
            )}
          </div>

          <Link to={token ? "/post-category" : "#"}>
            <div className="border-3 border-r border-b border-amber-500 rounded-xl">
              <span className="bg-white text-black px-4 py-2 rounded-xl flex items-center border-3 border-t border-l border-blue-500">
                <svg
                  className="h-5 w-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                <span>SELL</span>
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
