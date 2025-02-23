import React from 'react'

const Cards = ({ product }) => {
    return (
<div className="flex flex-col bg-slate-50 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-[280px] p-4 cursor-pointer">
  <div className="flex justify-end">
    <svg
      className="h-6 w-6 text-red-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="none"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </div>

  <div className="flex justify-center w-full h-[140px] overflow-hidden">
    <img
      src={`http://localhost:3000${product.images[0]}`}
      alt="Product"
      className="w-auto h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
    />
  </div>

  <div className="p-3 flex flex-col gap-2 text-center">
    <p className="text-xl font-bold text-[#000030]">&#x20B9; {product.price}</p>
    <span className="text-sm text-gray-500">{product.category}</span>
    <p className="text-base text-gray-800 font-semibold truncate">{product.title}</p>
  </div>

  <div className="flex justify-end text-xs text-gray-400 px-3 pb-2">{product.date}</div>
</div>

    );
  };
  
  export default Cards;  