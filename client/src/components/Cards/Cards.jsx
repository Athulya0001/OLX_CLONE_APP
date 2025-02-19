import React from 'react'

const Cards = ({ product }) => {
  console.log(product,"cards")
    return (
      <div className="border p-4 rounded-md shadow-md cursor-pointer">
        <div className="flex justify-end">
          <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
  
        <div className="flex justify-center">
          <img src={product.image || "/product.jpg"} alt="Product" className="h-24 w-auto" />
        </div>
  
        <p className="font-bold mt-2">&#x20B9; {product.price}</p>
        <span className="text-sm text-gray-500">{product.category}</span>
        <p className="text-sm">{product.title}</p>
  
        <div className="flex justify-end text-xs text-gray-400">{product.date}</div>
      </div>
    );
  };
  
  export default Cards;  