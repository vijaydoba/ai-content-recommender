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
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            <a href={item.url} className="text-blue-500 text-lg">{item.title}</a>
            <p className="text-sm text-gray-600">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Recommendations;