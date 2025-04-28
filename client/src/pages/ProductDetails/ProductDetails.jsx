import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  const [userwishlist, setUserWishlist] = useState([]);

  const wishlist = useMemo(() => user?.wishlist || [], [user?.wishlist]);
  const isWishlisted = wishlist.includes(id);
  console.log(wishlist, "wishlist");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://olx-clone-backend-5jjd.onrender.com/products/${id}`
        );
        setProduct(response.data.product);
        console.log(product, "product");
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

      const data = response.data;
      if (data.success) {
        setRequestSent(true);
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error(error.response.data.message);
    }
  };

  if (!product)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="relative">
            <FaHeart
              className={`transition-colors duration-300 ${
                isWishlisted ? "text-red-500" : "text-gray-400"
              }`}
            />
            <img
              src={`https://olx-clone-backend-5jjd.onrender.com${mainImage}`}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />

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

          {/* Right - Product Details */}
          <div className="space-y-4">
            <p className="text-2xl font-bold text-green-600">
              &#x20B9; {product.price}
            </p>
            <p className="text-gray-700">{product.description}</p>

            <div className="text-sm text-gray-500">
              <span className="block">Category: {product.category}</span>
              <span className="block">
                Posted on: {new Date(product.createdAt).toDateString()}
              </span>
            </div>

            <div>
              {requestSent ? (
                <button
                  className="w-full py-3 bg-gray-400 text-white font-bold rounded-lg cursor-not-allowed"
                  disabled
                >
                  Requested
                </button>
              ) : (
                <button
                  className="w-full py-3 bg-[#002f34] text-white font-bold rounded-lg hover:bg-white hover:text-[#002f34] hover:border-2 hover:border-[#002f34] transition-all"
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
  );
};

export default ProductDetails;
