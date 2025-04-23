import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Changed from useHistory

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Changed from useHistory

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if email or password is empty before submitting
  if (!email || !password) {
    setError("Email and password are required.");
    return;
  }

  console.log("Email:", email, "Password:", password);  // Debug log to check values

  try {
    // Set the endpoint to either /register or /login depending on the form type
    const endpoint = isSignup ? "/register" : "/login";

    // Send POST request with the necessary data
    const response = await axios.post(
      `http://localhost:8000${endpoint}`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Store the user's email in local storage and redirect to the preferences page
    localStorage.setItem("userEmail", email);
    navigate("/preferences");
  } catch (err) {
    console.log(err);  // Debug to see the full error response from backend

    // Check if 'detail' is an array or not
    const errorMessage = err.response?.data?.detail
      ? err.response.data.detail
      : "An error occurred."; // Directly take the error message if it's not an array

    setError(errorMessage);
  }
};

  

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isSignup ? "Already have an account?" : "Need an account?"}
        <button
          className="text-blue-500 underline ml-1"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default Login;
