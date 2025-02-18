import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../ReduxStore/Reducers/authSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const {isAuthenticated,user} = useSelector(state=>state.auth.isAuthenticated)
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    navigate('/')

  };
  return (
    <div>
      <h1>Home</h1>{" "}
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;