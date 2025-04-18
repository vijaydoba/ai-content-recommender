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
    try {
      const endpoint = isSignup ? "/register" : "/login";
      const response = await axios.post(
        `http://localhost:8000${endpoint}`,
        {
          email,
          password,
          preferences: isSignup ? [] : undefined,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );      
      localStorage.setItem("userEmail", email);
      navigate("/preferences"); // Changed from history.push
    } catch (err) {
      setError(err.response?.data?.detail || "Error occurred");
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