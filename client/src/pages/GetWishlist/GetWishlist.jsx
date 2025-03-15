import React from "react";
import { useNavigate } from "react-router-dom";

const GetWishlist = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-6 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 w-full sm:w-[400px] md:w-[500px] p-5 cursor-pointer">
      <div
        className="w-28 h-28 flex justify-center items-center overflow-hidden bg-gray-200 rounded-lg"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        {product.images?.length > 0 ? (
          <img
            src={`http://localhost:3000${product.images[0]}`}
            alt={product.title || "Product"}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-gray-500 text-sm">No Image</p>
        )}
      </div>

      <div className="flex flex-col justify-center flex-grow">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-900">
            &#x20B9; {product.price}
          </p>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>
        <p className="text-sm text-gray-700 font-medium truncate max-w-[280px]">
          {product.title}
        </p>
      </div>
    </div>
  );
};

export default GetWishlist;
