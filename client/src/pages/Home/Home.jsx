import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Cards from "../../components/Cards/Cards";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../../ReduxStore/Reducers/productSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.product || { items: [] });
  const [sortOption, setSortOption] = useState("");
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    fetchProducts();
  }, []);
  async function fetchProducts() {
    try {
      const response = await axios.get("https://olx-clone-backend-5jjd.onrender.com/products");
      console.log(response);
      dispatch(allProducts(response.data));
    } catch (error) {
      console.log("error occured", error);
    }
  }
  const filteredProducts = items.filter(
    (product) => product.owner !== user?._id
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "lowToHigh":
        return a.price - b.price;
      case "highToLow":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
      <Navbar />
      <Banner />

      {sortedProducts.length === 0 ? (
        <p className="py-6 text-md">Loading....</p>
      ) : (
        <div className="flex justify-between items-center w-full px-6 py-3">
          <h3 className="text-xl">Fresh Recommendations</h3>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-2 rounded bg-white"
          >
            <option value="">Sort By</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-10">
        {sortedProducts.map((product) => (
          <Cards key={product._id} product={product} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
