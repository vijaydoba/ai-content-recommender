import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Preferences() {
  const [categories, setCategories] = useState({
    "AI & Data Science": false,
    Programming: false,
    "Web Development": false,
    "Management & Marketing": false,
    "Cloud & DevOps": false,
    "IT Support": false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selected = Object.keys(categories).filter((key) => categories[key]);
    if (selected.length === 0) {
      setError("Select at least one category");
      return;
    }
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setError("User email is missing");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8000/preferences?email=${email}`,
        { preferences: selected },
        { headers: { "Content-Type": "application/json" } }
      );
      navigate("/recommendations");
    } catch (err) {
      setError(err.response?.data?.detail || "Error saving preferences");
    }
  };

  const toggleCategory = (key) => {
    setCategories({ ...categories, [key]: !categories[key] });
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="card max-w-md w-full">
        <h2 className="section-title text-center">Select Your Interests</h2>
        {error && <p className="error-text text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(categories).map((key) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={categories[key]}
                onChange={() => toggleCategory(key)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-base text-gray-700">{key}</label>
            </div>
          ))}
          <button type="submit" className="btn-primary w-full">
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}

export default Preferences;