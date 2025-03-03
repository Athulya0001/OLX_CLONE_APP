import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [owner, setOwner] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data.product);
        setOwner(response.data.owner);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const user = JSON.parse(localStorage.getItem("user"))

  const userEmail = user.email;
  const fetchRequest = async (ownerEmail) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/request', {
        ownerEmail, userEmail,
        message: 'I would like to request more details about the product.'
      });
      const data = await response.data;
      if(data.success){
        setRequestSent(true)
      }
      console.log(data, "data");
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  if (!product) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="flex flex-col">
      <header>
        <div className="bg-gray-100 p-3">
          <Link to={"/home"}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                className="text-gray-600"
              >
                <path
                  d="M30 15 L20 25 L30 35"
                  stroke="black"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </button>
          </Link>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={`http://localhost:3000${product.images[0]}`}
            alt={product.title}
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 space-y-4">
            <p className="text-xl font-bold text-green-600">
              &#x20B9; {product.price}
            </p>
            <p className="text-gray-700">{product.description}</p>
            <span className="text-sm text-gray-500">
              Category: {product.category}
            </span>
            <p className="text-xs text-gray-400">
              Posted on: {new Date(product.createdAt).toDateString()}
            </p>

            {/* Owner Details */}
            {/* {owner && (
                            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                                <h2 className="text-lg font-semibold">Owner Details</h2>
                                <p><strong>Name:</strong> {owner.username}</p>
                                <p><strong>Email:</strong> {owner.email}</p>
                                <p><strong>Phone:</strong> {owner.phone || "Not provided"}</p>
                            </div>
                        )} */}
            <div>
              <button className="px-2 bg-[#002f34] text-white font-bold py-2 rounded-md hover:bg-white hover:text-[#002f34] hover:border-2 hover:border-[#002f34] transition-all" onClick={() => fetchRequest(owner.email)} >
                Request Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;