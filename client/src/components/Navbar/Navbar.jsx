import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../ReduxStore/Reducers/authSlice";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/olx-logo.png'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="flex justify-center items-center fixed top-7">
            <nav className="bg-gray-100 fixed w-full p-2 shadow-md">
                <div className="mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <img src={Logo} alt="Logo" className="h-10" />
                            {/* <span>OLX</span> */}
                        </div>
                    </div>

                    <div className="relative hidden md:flex justify-between items-center border-2 border-gray-800 rounded-md bg-white w-2/5">
                        <input type="search" placeholder="Search products..." className="outline-none border-none px-2 py-1 w-64" />
                        <button className="ml-2 text-white bg-black px-3 py-3 h-full">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19a8 8 0 100-16 8 8 0 000 16zm10 2l-6-6"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:flex items-center">
                        <span className="font-bold text-sm mr-1">ENGLISH</span>
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="text-gray-700 underline">Logout</button>
                        ) : (
                            <a href="/" className="text-gray-700 underline">Login</a>
                        )}
                        <div className="border-3 border-r border-b border-amber-500 rounded-xl">
                            <a href="/create" className="bg-white text-black px-4 py-2 rounded-xl flex items-center border-3 border-t border-l border-blue-500">
                                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                                <span>SELL</span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};


export default Navbar
