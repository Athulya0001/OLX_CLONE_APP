import React, {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import CategoryMenu from "../../components/Category/Category";
import Cards from "../../components/Cards/Cards";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
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
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <CategoryMenu />

      <Banner/>

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
      <div className="flex flex-wrap items-center justify-center gap-10">
        {sortedProducts.length === 0 ? (
          <p className="text-gray-500">No products available</p>
        ) : (
          sortedProducts.map((product) => (
            <Cards key={product._id} product={product} user={user} />
          ))
        )}
      </div>

      <Footer/>
    </div>
  );
};

export default Home;