import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? "/register" : "/login";
      const response = await axios.post(`http://localhost:8000${endpoint}`, {
        email,
        password,
        preferences: isSignup ? [] : undefined,
      });
      localStorage.setItem("userEmail", email);
      navigate("/preferences");
    } catch (err) {
      // Show specific error message based on the response from backend
      setError(err.response?.data?.detail || "An unknown error occurred");
    }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="card max-w-md w-full">
        <h2 className="section-title text-center">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        {error && <p className="error-text text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "Need an account?"}
          <button
            className="text-indigo-600 font-medium hover:underline ml-1"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;