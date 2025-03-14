import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data.product);
        console.log(product,"product")
        setMainImage(response.data.product.images[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // const checkRequestStatus = async () => {
    //   if (user) {
    //     try {
    //       const response = await axios.get('http://localhost:3000/api/auth/user',{
    //         headers: { Authorization: `Bearer ${token}` },
    //       });
    //       setRequestSent(response.data.requestedProducts.includes(id));
    //       console.log(response.data.requestedProducts,"============")
    //     } catch (error) {
    //       console.error("Error checking request status:", error);
    //     }
    //   }
    // };

    fetchProduct();
    // checkRequestStatus();
  }, [id]);

  const fetchRequest = async (ownerId) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/request", {
        ownerId,
        userEmail: user?.email,
        id,
        message: "I would like to request more details about the product.",
      });
  
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
  

  if (!product) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-50 p-3">
        <Link to="/">
          <button className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              className="text-gray-600"
            >
              <path d="M30 15 L20 25 L30 35" stroke="black" strokeWidth="4" fill="none" />
            </svg>
            <span className="text-lg font-medium text-gray-600">Back</span>
          </button>
        </Link>
      </header>

      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Left - Main Image & Gallery */}
          <div className="relative">
            <img
              src={`http://localhost:3000${mainImage}`}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />

            {/* Image Gallery */}
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000${img}`}
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
            <p className="text-2xl font-bold text-green-600">&#x20B9; {product.price}</p>
            <p className="text-gray-700">{product.description}</p>

            <div className="text-sm text-gray-500">
              <span className="block">Category: {product.category}</span>
              <span className="block">Posted on: {new Date(product.createdAt).toDateString()}</span>
            </div>

            <div>
  {requestSent ? (
    <button className="w-full py-3 bg-gray-400 text-white font-bold rounded-lg cursor-not-allowed" disabled>
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