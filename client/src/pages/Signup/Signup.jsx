import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../ReduxStore/Reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://olx-clone-backend-5jjd.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data, "signup");

      if (data.success) {
        setMessage("OTP Send to your email. Please Verify...");
        navigate("/verify-otp", { state: formData });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl bg-white p-4 sm:p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>
        {message && (
          <p className="text-center text-red-500 text-sm sm:text-base mb-4">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 bg-transparent text-sm sm:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 bg-transparent text-sm sm:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 bg-transparent text-sm sm:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 bg-transparent text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-900 text-white font-bold py-3 rounded-md hover:bg-white hover:text-teal-900 hover:border-2 hover:border-teal-900 transition duration-300 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600 text-xs sm:text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-amber-700 font-semibold hover:text-amber-500"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
