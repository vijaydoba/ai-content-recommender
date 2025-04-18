import { useEffect, useState } from "react";
import axios from "axios";
function ContentList() {
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/content").then((res) => setContent(res.data));
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-2xl">Articles</h2>
      {content.map((item) => (
        <div key={item.id} className="border p-2 my-2">
          <a href={item.url} className="text-blue-500">{item.title}</a>
          <p>{item.category}</p>
        </div>
      ))}
    </div>
  );
}
export default ContentList;