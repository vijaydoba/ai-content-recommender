import { useState, useEffect } from "react";
import axios from "axios";

function ContentList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/jobs").then((res) => setJobs(res.data));
  }, []);

  const filteredJobs = jobs.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.skills.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">All Jobs</h2>
        <input
          type="text"
          placeholder="Search jobs by title, company, or skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field mb-6"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((item) => (
            <div key={item.id} className="card">
              <a
                href={item.url}
                className="text-lg font-semibold text-indigo-600 hover:underline"
              >
                {item.title}
              </a>
              <p className="text-sm text-gray-500 mt-1">{item.company} - {item.location}</p>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <p className="text-sm text-gray-500 mt-1">Skills: {item.skills}</p>
              <p className="text-sm font-medium text-gray-700 mt-1">Salary: {item.salary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentList;