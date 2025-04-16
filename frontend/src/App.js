import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContentList from './ContentList';  // Correct path to ContentList.js from App.js
function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" exact component={ContentList} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;