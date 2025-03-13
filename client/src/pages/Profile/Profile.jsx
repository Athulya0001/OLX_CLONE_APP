import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUserProfile, deleteProduct } from "../../ReduxStore/Reducers/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: user.username,
    phone: user.phone
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4">My Profile</h1>

      {/* Profile Details */}
      <div className="p-4 border rounded-md mb-6">
        <h2 className="text-xl font-bold mb-2">Profile Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <button type="submit" className="bg-[#002f34] text-white px-4 py-2 rounded-md">
            Update Profile
          </button>
        </form>
      </div>

      {/* User's Added Products */}
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-2">My Added Products</h2>
        {user.productsadd.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {user.productsadd.map((product) => (
              <div key={product._id} className="border p-2 rounded-md shadow-md">
                <img src={product.image} alt={product.title} className="w-full h-32 object-cover rounded-md" />
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
  );
};

export default Profile;