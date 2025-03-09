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
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        setMessage("OTP Send to your email. Please Verify...");
        // localStorage.setItem("token", JSON.stringify(data.token || ""));
        // dispatch(registerUser({ username: formData.username, email: formData.email,phone: formData.phone, isVerified: false }));
        navigate("/verify-otp", { state: { email: formData.email } });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
    <div className="border border-black p-6 rounded-lg bg-white shadow-lg w-full max-w-md">
      <h2 className="text-center text-xl font-semibold">Sign Up</h2>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
            <label htmlFor="username" className="block font-medium">Username</label>
            <input
               type="text" name="username" id='username' placeholder="Username" onChange={handleChange} required 
              className="w-full border-b border-gray-300 outline-none focus:border-blue-500 bg-transparent py-1"
            />
          </div>
          <div>
            <label htmlFor='email' className="block font-medium">Email</label>
            <input
              type="email" id='email' name="email" placeholder="Email" onChange={handleChange} required 
              className="w-full border-b border-gray-300 outline-none focus:border-blue-500 bg-transparent py-1"
            />
          </div>
          <div>
            <label htmlFor='phone' className="block font-medium">Phone</label>
            <input
              type="tel" id='phone' name="phone" placeholder="Phone" onChange={handleChange} required 
              className="w-full border-b border-gray-300 outline-none focus:border-blue-500 bg-transparent py-1"
            />
          </div>
          <div>
            <label htmlFor='password' className="block font-medium">Password</label>
            <input
              type="password" id='password' name="password" placeholder="Password" onChange={handleChange} required 
              className="w-full border-b border-gray-300 outline-none focus:border-blue-500 bg-transparent py-1"
            />
          </div>
          <button 
  type="submit" 
  className="w-full bg-teal-900 text-white font-bold py-3 rounded hover:bg-white hover:text-teal-900 hover:border-2 hover:border-teal-900 transition"
  disabled={loading}
>
  {loading ? "Signing up..." : "Sign Up" }
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