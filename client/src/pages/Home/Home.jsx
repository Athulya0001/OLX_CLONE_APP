import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../../components/Cards/Cards";
import Banner from "../../components/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../../ReduxStore/Reducers/productSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.product || { items: [] });
  const { user } = useSelector((state) => state.auth);
  const [sortOption, setSortOption] = useState("");
  const [visibleRows, setVisibleRows] = useState(2);
  const [cardsPerRow, setCardsPerRow] = useState(4);

  useEffect(() => {
    fetchProducts();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 640) setCardsPerRow(1);
    else if (window.innerWidth < 1024) setCardsPerRow(2);
    else setCardsPerRow(4); // large screens
  };

  async function fetchProducts() {
    try {
      const response = await axios.get(
        "https://olx-clone-backend-5jjd.onrender.com/products"
      );
      dispatch(allProducts(response.data));
    } catch (error) {
      console.log("error occurred", error);
    }
  }

  const filteredProducts = user
    ? items.filter((product) => product.owner !== user._id)
    : items;

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

  const visibleCount = visibleRows * cardsPerRow;
  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const isAllShown = visibleCount >= sortedProducts.length;

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
      <Banner />

      {sortedProducts.length === 0 ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between items-center w-full px-6 py-3 gap-2">
          <h3 className="text-md md:text-xl">Fresh Recommendations</h3>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-2 py-1 rounded bg-white"
          >
            <option value="">Sort By</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      )}

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 w-full">
        {visibleProducts.map((product) => (
          <Cards key={product._id} product={product} />
        ))}
      </div>

      {sortedProducts.length > cardsPerRow * 2 && (
        <div className="mt-6">
          <button
            onClick={() => setVisibleRows(isAllShown ? 2 : visibleRows + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {isAllShown ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
