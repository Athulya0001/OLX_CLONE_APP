import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist } from "../../ReduxStore/Reducers/authSlice";
import { useMemo } from "react";
import { toast } from "react-toastify";

const Cards = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);
  const wishlist = useMemo(() => user?.wishlist || [], [user?.wishlist]);
  const isWishlisted = wishlist.includes(product?._id);

  const handleWishlist = async () => {
    if (!token) {
      toast.warning("Please signin to continue");
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
      return;
    }

    try {
      const response = await axios.post(
        "https://olx-clone-backend-5jjd.onrender.com/products/wishlist",
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const updatedWishlist = isWishlisted
          ? wishlist.filter((id) => id !== product._id)
          : [...wishlist, product._id];

        dispatch(setWishlist(updatedWishlist));
      }

      toast.success(
        isWishlisted
          ? "Product removed from wishlist"
          : "Product added to wishlist",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: false,
          toastStyle: {
            background: isWishlisted ? "#f44336" : "#4caf50",
            color: "white",
            fontWeight: "bold",
          },
        }
      );
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="w-[280px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={
            product?.images?.length > 0
              ? `https://olx-clone-backend-5jjd.onrender.com${product.images[0]}`
              : "https://placehold.co/600x400"
          }
          alt={product?.title || "Product"}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
        >
          <FaHeart
            className={`text-lg transition-colors duration-300 ${
              isWishlisted ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product?.title || "Untitled"}
        </h3>
        <p className="text-sm text-gray-500 mb-2 truncate">
          {product?.category || "Category"} ||{" "}
          {product?.description || "No description"}
        </p>

        <div className="flex justify-between items-center mt-3">
          <h5 className="text-blue-600 font-bold text-base">
            ₹{product?.price || "N/A"}
          </h5>
          <button
            onClick={() => {
              if (!token) {
                toast.warn("Please Signin to continue");
                setTimeout(() => navigate("/signin"), 2000);
              } else {
                navigate(`/product/${product?._id}`);
              }
            }}
            className="border border-blue-600 text-blue-600 px-3 py-1 text-sm rounded hover:bg-blue-600 hover:text-white transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
