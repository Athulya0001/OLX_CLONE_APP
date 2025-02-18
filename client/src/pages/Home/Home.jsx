import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import CategoryMenu from "../../components/Category/Category";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center m-0">
      <Navbar/>
      <CategoryMenu/>
    </div>
  );
};

export default Home;