import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SelectCategory = () => {
  const {user} = useSelector((state)=>state.auth)
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate()
  // const [loading, setLoading] = useState(false);
  console.log(user,"select")
  useEffect(() => {
    axios
      .get("http://localhost:3000/products/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", selectedCategory);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    if (!user._id) {
      alert("You must be logged in to post a product.");
      return;
    }
    formData.append("owner", user._id);

    try {
      const response = await axios.post(
        "http://localhost:3000/products/newpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to create listing");
      }
      // else{
      //   navigate("/home")
      // }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

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
      {/* {loading && <p>Loading...</p>} */}
      <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          POST YOUR AD
        </h2>

        <label className="block font-semibold mb-1">Title</label>
        <input
          className="w-full p-2 border-b border-gray-400 outline-none mb-4 bg-transparent"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block font-semibold mb-1">Category</label>
        <select className="w-full p-2 border border-gray-400 rounded mb-4 bg-white text-gray-700" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} >
          <option>Select a category</option>
          {categories.map((categoryGroup, index) =>
            Object.keys(categoryGroup).map((group) => (
              <optgroup
                key={index}
                label={group}
                className="font-semibold text-gray-800"
              >
                {categoryGroup[group].map((item, itemIndex) => (
                  <option
                    key={itemIndex}
                    value={item}
                    className="text-gray-600"
                  >
                    {item}
                  </option>
                ))}
              </optgroup>
            ))
          )}
        </select>

        <label className="block font-semibold mb-1">Price</label>
        <input
          className="w-full p-2 border-b border-gray-400 outline-none mb-4 bg-transparent"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label className="block font-semibold mb-1">Description</label>
        <input
          className="w-full p-2 border-b border-gray-400 outline-none mb-4 bg-transparent"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex flex-col items-center">
          {image && (
            <img
              alt="Preview"
              className="w-48 h-48 object-cover mb-4 rounded"
              src={URL.createObjectURL(image)}
            />
          )}
          <input
            type="file"
            className="w-full mb-4"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          className="w-full bg-[#002f34] text-white font-bold py-2 rounded-md hover:bg-white hover:text-[#002f34] hover:border-2 hover:border-[#002f34] transition-all"
          onClick={handleSubmit}
        >
          Upload and Submit
        </button>
      </div>
    </div>
  );
};

export default SelectCategory;