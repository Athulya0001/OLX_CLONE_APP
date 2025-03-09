import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Cards = ({ product, user }) => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const userId = user._id;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/wishlist",
          {body: {wishlist,userId}}
        );
        console.log(response,"res")
        setWishlist(response.data.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);
  console.log(user,"user wish")
  const handleWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/products/wishlist`,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(productId, userId)
        }
      );
      const data = await response.json()
      console.log(data,"res")
      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };
  

  return (
    <div className="flex flex-col relative justify-center items-center bg-slate-50 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-[280px] p-4 cursor-pointer">
      <div className="flex absolute top-2 right-2">
        <button onClick={() => handleWishlist(product._id)}>
          {wishlist.includes(product._id) ? (
            <FaHeart className="h-6 w-6 text-red-500" />
          ) : (
            <FaRegHeart className="h-6 w-6 text-gray-500" />
          )}
        </button>
      </div>

      <div
        className="flex justify-center w-full h-[140px] overflow-hidden"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          src={`http://localhost:3000${product.images[0]}`}
          alt="Product"
          className="w-auto h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <div className="p-3 flex flex-col gap-2 text-center">
        <p className="text-xl font-bold text-[#000030]">
          &#x20B9; {product.price}
        </p>
        <span className="text-sm text-gray-500">{product.category}</span>
        <p className="text-base text-gray-800 font-semibold truncate">
          {product.title}
        </p>
      </div>

      <div className="flex justify-end text-xs text-gray-400 px-3 pb-2">
        {new Date(product.createdAt).toDateString()}
      </div>
    </div>
  );
};

export default Cards;
