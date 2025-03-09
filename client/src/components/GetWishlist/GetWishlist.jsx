import React from 'react'
import { useNavigate } from "react-router-dom";

const GetWishlist = ({product}) => {
    const navigate = useNavigate()
  return (
    <div className="flex  gap-x-8 justify-center items-center bg-slate-50 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-[280px] p-4 cursor-pointer">
    
          <div
            className="flex justify-center w-[70px] h-[70px] overflow-hidden"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img
              src={`http://localhost:3000${product.images[0]}`}
              alt="Product"
              className="w-auto h-full object-cover"
            />
          </div>
    
          <div className="p-3 flex flex-col gap-2 text-center">
            <div className='flex justify-center items-center gap-x-4'>
            <p className="text-xl font-bold text-[#000030]">
              &#x20B9; {product.price}
            </p>
            <span className="text-sm text-gray-500">{product.category}</span>
            </div>
            <p className="text-base text-gray-800 font-semibold truncate">
              {product.title}
            </p>
          </div>
    </div>
  )
}

export default GetWishlist;