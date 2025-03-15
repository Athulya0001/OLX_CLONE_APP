import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Cards from '../../components/Cards/Cards'

const SearchResults = () => {
  const navigate = useNavigate();
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
              <Cards product={product}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
