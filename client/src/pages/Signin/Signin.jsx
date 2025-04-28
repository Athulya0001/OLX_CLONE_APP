import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../ReduxStore/Reducers/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://olx-clone-backend-5jjd.onrender.com/api/auth/signin",
        {
          email,
          password,
        }
      );

      const data = response.data;
      console.log(data, "data======");

      if (data.success) {
        if (data.user.verified === false) {
          toast.warning("Your email is not verified. Please check your inbox.");
          return;
        }

        dispatch(login({ user: data.user, token: data.token }));
        toast.success("Login successful! Welcome back.");
        navigate("/")
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        const { message, error: errorType } = error.response.data;

        if (errorType === "invalid_email") {
          toast.error("User not found. Please check your email.");
        } else if (errorType === "invalid_password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error(message || "Something went wrong. Please try again.");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl bg-white p-4 sm:p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 bg-transparent text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 bg-transparent text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-900 text-white font-bold py-3 rounded-md hover:bg-white hover:text-teal-900 hover:border-2 hover:border-teal-900 transition duration-300 text-sm sm:text-base"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6 text-gray-600 text-xs sm:text-sm">
          Don’t have an account?{" "}
          <Link to="/signup">
            <span className="text-amber-700 font-semibold hover:text-amber-500">
              Signup
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
