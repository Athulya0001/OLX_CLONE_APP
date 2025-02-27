import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/verify/${token}`, {
          method: "GET",
        });
        const data = await response.json();

        if (data.success) {
          setMessage("Email verified successfully! Redirecting...");
          setTimeout(() => navigate("/"), 3000); // Redirect after 3 sec
        } else {
          setMessage(data.message || "Invalid or expired token.");
        }
      } catch (error) {
        setMessage("Something went wrong. Try again later.");
      }
    };

    verifyUserEmail();
  }, [token, navigate]);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="border border-black p-6 rounded-lg bg-white shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-semibold">Email Verification</h2>
        <p className="text-gray-700 mt-4">{message}</p>
        {message.includes("Invalid") && (
          <button
            className="mt-4 bg-teal-900 text-white px-4 py-2 rounded hover:bg-teal-700"
            onClick={() => navigate("/signup")}
          >
            Go to Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
