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
        "http://localhost:3000/api/auth/signin",
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
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="border border-black p-6 rounded-lg bg-white shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full border-b border-gray-300 outline-none focus:border-blue-500 bg-transparent py-1"
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border-b border-gray-300 outline-none focus:border-blue-500 bg-transparent py-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-900 text-white font-bold py-3 rounded hover:bg-white hover:text-teal-900 hover:border-2 hover:border-teal-900 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to={"/signup"}>
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
