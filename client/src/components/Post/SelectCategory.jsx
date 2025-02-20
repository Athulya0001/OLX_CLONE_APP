import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SelectCategory = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setCategory(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  console.log(category, "selectcategory");
  return (
    <div>
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
      <div className="flex flex-col justify-center items-center mt-6">
        <h1 className="text-2xl text-gray-900 font-bold">POST YOUR AD</h1>
        <div>
          <div>
            <span>CHOOSE A CATEGORY</span>
            <div>
              <select name="" id="">
                {category.map((item) => {
                    <option value="">{item.category}</option>
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCategory;
