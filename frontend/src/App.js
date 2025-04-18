import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Preferences from "./components/Preferences";
import ContentList from "./components/ContentList";
import Recommendations from "./components/Recommendations";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/content" element={<ContentList />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<ContentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
