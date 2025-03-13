import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const SearchResults = () => {
  const navigate = useNavigate()
  const { searchResults } = useSelector((state) => state.product);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Navbar />
      <div className="mt-[80px]">
        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        {searchResults.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {searchResults.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="border p-4 rounded-lg shadow"
              >
                <img
                  src={`http://localhost:3000${product.images[0]}`}
                  alt={product.title}
                  className="h-40 w-full object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                <p className="text-gray-500">${product.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
