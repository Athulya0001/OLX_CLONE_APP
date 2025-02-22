import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../ReduxStore/Reducers/authSlice";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (data.success) {
      dispatch(registerUser({ username, email }));
      alert("Account created successfully! Please sign in.");
    } else {
      alert("User already exists. Please sign in.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="border border-black p-6 rounded-lg bg-white shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full border-b border-gray-300 outline-none focus:border-blue-500 bg-transparent py-1"
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to={"/"}>
            <span className="text-amber-700 font-semibold hover:text-amber-500">
              Sign In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
