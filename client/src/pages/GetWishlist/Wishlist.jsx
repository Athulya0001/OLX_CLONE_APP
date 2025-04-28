import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Cards from "../../components/Cards/Cards";

const Wishlist = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.product);

  const wishlistProducts = items.filter((product) =>
    user?.wishlist.includes(product._id)
  );

  return (
    <div className="p-6 flex flex-col items-center">
      <Navbar />
      <div className="mt-[80px]">
        {wishlistProducts.length === 0 ? (
          <p className="text-gray-600 text-lg text-center">
            No items added to wishlist. Add items{" "}
            <Link to="/" className="text-blue-500 underline">
              Click here
            </Link>
          </p>
        ) : (
          <div className="flex flex-wrap gap-4 w-full max-w-3xl">
            {wishlistProducts.map((product) => (
              <Cards key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
