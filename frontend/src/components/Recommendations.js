import { useState, useEffect } from "react";
import axios from "axios";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios
        .get(`http://localhost:8000/recommendations?email=${email}`)
        .then((res) => setRecommendations(res.data))
        .catch((err) => setError("Failed to load recommendations"));
    }
  }, []);

  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Recommended Jobs</h2>
        {error && <p className="error-text">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item) => (
            <div key={item["Job ID"]} className="card">
              <a
                href={item.URL}
                className="text-lg font-semibold text-indigo-600 hover:underline"
              >
                {item["Job Title"]}
              </a>
              <p className="text-sm text-gray-500 mt-1">{item.Company} - {item.Location}</p>
              <p className="text-sm font-medium text-gray-700 mt-1">Salary: {item.Salary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommendations;