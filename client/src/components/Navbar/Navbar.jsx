import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../ReduxStore/Reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/olx-logo.png";
import {
  FaBars,
  FaHeart,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import UserProfile from "../UserProfile/UserProfile";
import Profile from "../../assets/profile-logo.png";
import { setSearchResults } from "../../ReduxStore/Reducers/productSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopProfileOpen, setDesktopProfileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const profileMenuRef = useRef(null);

  const languages = ["English", "Hindi", "Spanish", "French", "German"];

  const handleLogout = () => {
    toast.info(
      <div className="flex flex-col space-y-2">
        <p className="text-lg">Are you sure you want to Logout?</p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => {
              dispatch(logout());
              navigate("/");
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        toastStyle: {
          border: "2px solid #002f34",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          background: "#333",
        },
      }
    );
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `https://olx-clone-backend-5jjd.onrender.com/api/search?q=${searchQuery}`
      );
      if (response.data.success) {
        dispatch(setSearchResults(response.data.products));
        setSearchQuery("");
        navigate("/search-result");
        setMenuOpen(false);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleSellClick = () => {
    if (token) {
      navigate("/post-category");
    } else {
      toast.error("Please login to post a product");
      navigate("/");
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setDesktopProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-50">
      <nav className="w-full max-w-7xl mx-auto p-3 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-10" />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border border-gray-400 rounded-md bg-white w-80"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none border-none px-2 py-1 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="ml-2 text-white bg-black px-3 py-3 h-full">
              🔍
            </button>
          </form>

          <select className="px-3 py-2 border rounded-md">
            {languages.map((lang, i) => (
              <option key={i} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <div className="relative" ref={profileMenuRef}>
            <button onClick={() => setDesktopProfileOpen(!desktopProfileOpen)}>
              <img src={Profile} alt="Profile" className="h-10 w-10 rounded-full" />
            </button>
            {desktopProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 z-50">
                <UserProfile />
                <hr className="my-2" />
                {token ? (
                  <>
                    <Link to="/wishlist" className="flex items-center gap-2 p-2 hover:bg-gray-100">
                      <FaHeart className="text-red-500" />
                      <span>Wishlist</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 p-2 w-full text-left hover:bg-gray-100"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100">
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          <button onClick={handleSellClick}>
            <div className="border-3 border-r border-b border-amber-500 rounded-xl">
              <span className="bg-white text-black px-4 py-2 rounded-xl flex items-center border-3 border-t border-l border-blue-500">
                ➕ <span className="ml-1">SELL</span>
              </span>
            </div>
          </button>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {menuOpen && (
        <div className="flex flex-col items-center bg-gray-100 px-4 pb-4 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border border-gray-400 rounded-md bg-white w-full my-2"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none border-none px-2 py-1 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="ml-2 text-white bg-black px-3 py-3 h-full">
              🔍
            </button>
          </form>

          <select className="w-full px-3 py-2 border rounded-md my-2">
            {languages.map((lang, i) => (
              <option key={i} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <div className="w-full my-2">
            <button
              onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
              className="flex items-center w-full p-2 border rounded-md bg-white"
            >
              <img src={Profile} alt="Profile" className="h-8 w-8 rounded-full mr-2" />
              <span>Profile</span>
            </button>
            {mobileProfileOpen && (
              <div className="bg-white shadow-md rounded-md mt-2 p-2">
                <UserProfile />
                <hr className="my-2" />
                {token ? (
                  <>
                    <Link to="/wishlist" className="block p-2 hover:bg-gray-100">
                      <FaHeart className="text-red-500" /> <span>Wishlist</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 p-2 w-full text-left hover:bg-gray-100"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100">
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          <button onClick={handleSellClick} className="w-full mt-2">
            <div className="border-3 border-r border-b border-amber-500 rounded-xl">
              <span className="bg-white text-black px-4 py-2 rounded-xl flex justify-center items-center border-3 border-t border-l border-blue-500">
                ➕ <span className="ml-1">SELL</span>
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
