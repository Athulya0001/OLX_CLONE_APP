import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";
import { setWishlist } from "../../ReduxStore/Reducers/authSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const { user, token } = useSelector((state) => state.auth);
  const wishlist = useMemo(() => user?.wishlist || [], [user?.wishlist]);
  const isWishlisted = wishlist.includes(id);

  const truncateText = (text, wordLimit = 30) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://olx-clone-backend-5jjd.onrender.com/products/${id}`
        );
        setProduct(response.data.product);
        setMainImage(response.data.product.images[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const checkRequestStatus = async () => {
      if (user) {
        try {
          const response = await axios.get(
            "https://olx-clone-backend-5jjd.onrender.com/api/auth/user",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setRequestSent(response.data.requestedProducts.includes(id));
        } catch (error) {
          console.error("Error checking request status:", error);
        }
      }
    };

    fetchProduct();
    checkRequestStatus();
  }, [id, user]);

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
        { productId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const updatedWishlist = isWishlisted
          ? wishlist.filter((pid) => pid !== id)
          : [...wishlist, id];

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

  const fetchRequest = async (ownerId) => {
    try {
      const response = await axios.post(
        "https://olx-clone-backend-5jjd.onrender.com/api/auth/request",
        {
          ownerId,
          userEmail: user?.email,
          id,
          message: "I would like to request more details about the product.",
        }
      );

      if (response.data.success) {
        setRequestSent(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  if (!product) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative">
              <button
                onClick={handleWishlist}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
              >
                <FaHeart
                  className={`text-2xl transition-colors duration-300 ${
                    isWishlisted ? "text-red-500" : "text-gray-400"
                  }`}
                />
              </button>

              <img
                src={`https://olx-clone-backend-5jjd.onrender.com${mainImage}`}
                alt={product.title}
                className="w-full h-80 sm:h-96 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="flex gap-2 mt-3 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={`https://olx-clone-backend-5jjd.onrender.com${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover border-2 rounded cursor-pointer ${
                    mainImage === img ? "border-[#002f34]" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold pt-4 lg:pt-0">
                {product.title}
              </h2>

              <div className="mt-4">
                <h3 className="text-md font-medium text-gray-700 mb-1">
                  Description
                </h3>
                <hr />
                <p className="mt-2 text-gray-800">
                  {showFullDesc
                    ? product.description
                    : truncateText(product.description, 30)}
                </p>
                {product.description.split(" ").length > 30 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="text-blue-600 hover:underline mt-1 text-sm"
                  >
                    {showFullDesc ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              <div className="text-sm text-gray-500 mt-4">
                <p>Category: {product.category}</p>
                <p>Posted on: {new Date(product.createdAt).toDateString()}</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-0">
              <div className="text-3xl font-bold text-gray-800 mb-4">
                ₹ {product.price}
              </div>

              <div>
                {requestSent ? (
                  <button
                    className="w-full bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                    disabled
                  >
                    Requested
                  </button>
                ) : (
                  <button
                    className="w-full bg-[#0096ff] text-white px-4 py-2 rounded hover:bg-[#007acc] transition"
                    onClick={() => fetchRequest(product.owner)}
                  >
                    Request Details
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
