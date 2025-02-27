import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../ReduxStore/Reducers/authSlice";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data, "signup");

      if (data.success) {
        setMessage("Verification email sent. Check your inbox.");
        dispatch(registerUser({ username: formData.username, email: formData.email, isVerified: false }));
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
    <div className="border border-black p-6 rounded-lg bg-white shadow-lg w-full max-w-md">
      <h2 className="text-center text-xl font-semibold">Sign Up</h2>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="input" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
        <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required className="input" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
        <button type="submit" className="w-full bg-teal-900 text-white font-bold py-3 rounded hover:bg-white hover:text-teal-900 hover:border-2 hover:border-teal-900 transition">
          Sign Up
        </button>
      </form>
      <div className="text-center mt-4">
        Already have an account?{" "}
        <Link to={"/"} className="text-amber-700 font-semibold hover:text-amber-500">
          Sign In
        </Link>
      </div>
    </div>
  </div>
  );
};

export default SignUp;
