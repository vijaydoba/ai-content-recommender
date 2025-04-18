import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Preferences() {
  const [categories, setCategories] = useState({
    AI: false,
    Python: false,
    JavaScript: false,
    WebDev: false,
  });
  const [error, setError] = useState("");  // Error state to store error messages
  const navigate = useNavigate();  // For navigation after successful preference update

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selected = Object.keys(categories).filter((key) => categories[key]);
    
    // If no categories are selected, show error
    if (selected.length === 0) {
      setError("Select at least one category");
      return;
    }

    const email = localStorage.getItem("userEmail");

    // Check if email is stored in localStorage
    if (!email) {
      setError("User email is missing");
      return;
    }

    try {
      // Sending PUT request to update preferences
      await axios.put(
        `http://localhost:8000/preferences?email=${email}`,
        { preferences: selected }, // ✅ This now matches the PreferenceUpdate model
        { headers: { "Content-Type": "application/json" } }
      );
      
      // Redirect to recommendations page after successful update
      navigate("/recommendations");
    } catch (err) {
      // Set error message if request fails
      const errorMessage = err.response?.data?.detail || "Error saving preferences";
      setError(errorMessage);
    }
  };

  // Toggle category selection (checkbox change handler)
  const toggleCategory = (key) => {
    setCategories({ ...categories, [key]: !categories[key] });
  };

  // Ensure that error is a string before rendering it
  const renderError = (error) => {
    if (typeof error === 'object') {
      // In case error is an object, return a meaningful string (you can customize this further)
      return JSON.stringify(error);
    }
    return error;
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Select Your Interests</h2>
      
      {/* Display error message if present */}
      {error && <p className="text-red-500 mb-4">{renderError(error)}</p>}

      {/* Form to submit selected preferences */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mapping through categories to create checkbox list */}
        {Object.keys(categories).map((key) => (
          <div key={key} className="flex items-center">
            <input
              type="checkbox"
              checked={categories[key]}
              onChange={() => toggleCategory(key)}
              className="h-4 w-4"
            />
            <label className="ml-2 text-sm">{key}</label>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}

export default Preferences;
