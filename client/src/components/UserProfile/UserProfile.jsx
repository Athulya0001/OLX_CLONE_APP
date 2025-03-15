import React from "react";
import { useSelector } from "react-redux";
import Profile from "../../assets/profile-logo.png";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col justify-between items-center w-full">
      <div className="flex gap-x-4 justify-center items-center">
        <img className="h-15 w-15 rounded-full" src={Profile} alt="Profile" />
        <span className="text-xl">{user.username}</span>
      </div>
      <div className="py-2 w-full">
        <Link to="/profile">
          <button className="w-full py-1 px-1 bg-[#002f34] text-white font-bold rounded-sm hover:bg-white hover:text-[#002f34] hover:border-2 hover:border-[#002f34] transition-all">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
