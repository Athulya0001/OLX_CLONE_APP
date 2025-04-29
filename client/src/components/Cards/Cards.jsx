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
  const isWishlisted = wishlist.includes(product._id);

  const handleWishlist = async () => {
    if (!token) {
      toast.warning("Please signin to continue")
      setTimeout(() => {
        navigate("/signin")
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
    <div className="flex flex-col relative justify-center items-center bg-slate-50 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-[280px] p-4 cursor-pointer">
      <button className="absolute top-2 right-2" onClick={handleWishlist}>
        <FaHeart
          className={`transition-colors duration-300 ${
            isWishlisted ? "text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      <div
        className="flex justify-center w-full h-[140px] overflow-hidden"
        onClick={() => {
          if (!token) {
            toast.warn("Please Signin to continue");
            setTimeout(() => {
              navigate("/signin");
            }, 2000);
          } else {
            navigate(`/product/${product._id}`);
          }
        }}
      >
        {product.images?.length > 0 ? (
          <img
            src={`https://olx-clone-backend-5jjd.onrender.com${product.images[0]}`}
            alt="Product"
            className="w-auto h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        ) : (
          <p className="text-gray-500">No Image Available</p>
        )}
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
