import React, {useState, useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import CategoryMenu from "../../components/Category/Category";
import Cards from "../../components/Cards/Cards";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar/>
      <CategoryMenu/>
      <div className="flex flex-col items-center">
        <div className="flex items-center p-3">
          <h3 className="text-xl">Fresh Recomendations</h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10">
        {products.length === 0 ? (
            <p className="text-gray-500">No products available</p>
          ) : (
            products.map((product) => (
              <Cards key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;