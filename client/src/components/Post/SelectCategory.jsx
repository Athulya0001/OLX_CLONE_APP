import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SelectCategory = () => {
  const user = useSelector((state) => state.auth.user);

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(Array(5).fill(null));
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

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

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (!user?._id) {
      toast.warning("You must be logged in to post a product.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", selectedCategory);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("owner", user._id);

    images.forEach((image) => {
      formData.append("images", image);
    });

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

      if (response.data.success) {
        toast.success(response.data.message);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.warning("Something went wrong!");
    }
  };

  return (
    <div>
      <header>
        <div className="bg-gray-100 p-3">
          <Link to={"/"}>
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
        <select
          className="w-full p-2 border border-gray-400 rounded mb-4 bg-white text-gray-700"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
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
        <textarea
          className="w-full p-2 border-b border-gray-400 outline-none mb-4 bg-transparent resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {images.map((img, index) => (
              <label
                key={index}
                className="w-24 h-24 border-2 border-gray-300 flex items-center justify-center rounded overflow-hidden cursor-pointer"
              >
                {img ? (
                  <img
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                    src={URL.createObjectURL(img)}
                  />
                ) : (
                  <span className="text-gray-400 text-sm">+ Add</span>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </label>
            ))}
          </div>
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
