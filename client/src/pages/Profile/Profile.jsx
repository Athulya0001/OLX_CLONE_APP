import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "../../ReduxStore/Reducers/authSlice";
import { allProducts } from "../../ReduxStore/Reducers/productSlice";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.product);

  const [userProducts, setUserProducts] = useState([]);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    if (user?.productsadd?.length) {
      const productDetails = user.productsadd.map((productId) =>
        items.find((item) => item._id === productId)
      );
      setUserProducts(productDetails);
    }
  }, [user, items]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Invalid phone number. Must be exactly 10 digits.");
      return;
    }

    try {
      const response = await axios.post(
        "https://olx-clone-backend-5jjd.onrender.com/api/user/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setUser(response.data.updatedUser));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios.get(
        "https://olx-clone-backend-5jjd.onrender.com/products"
      );
      dispatch(allProducts(response.data));
    } catch (error) {
      console.log("Error fetching products", error);
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.post(
        `https://olx-clone-backend-5jjd.onrender.com/api/user/delete-product`,
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedUser = {
        ...user,
        productsadd: user?.productsadd?.filter(
          (product) => product._id !== productId
        ),
      };
      if (response.data.success) {
        dispatch(setUser(updatedUser));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-md">
      <div className="mt-[80px]">
        <h1 className="text-2xl font-bold text-center mb-4">My Profile</h1>

        <div className="p-4 border rounded-md mb-6">
          <h2 className="text-xl font-bold mb-2">Profile Information</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                value={formData?.username || user?.username}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData?.phone || user?.phone}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  setFormData((prev) => ({
                    ...prev,
                    phone: onlyDigits,
                  }));
                }}
                maxLength={10}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-[#002f34] text-white px-4 py-2 rounded-md"
            >
              Update Profile
            </button>
          </form>
        </div>

        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-bold mb-2">My Added Products</h2>
          {user?.productsadd?.length === 0 ? (
            <p>No products added yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {items
                ?.filter((product) => user?.productsadd?.includes(product._id))
                .map((product) => (
                  <div
                    key={product._id}
                    className="border p-2 rounded-md shadow-md"
                  >
                    <img
                      src={`https://olx-clone-backend-5jjd.onrender.com${product.images[0]}`}
                      alt={product.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <p className="font-bold mt-2">{product.title}</p>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md mt-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
