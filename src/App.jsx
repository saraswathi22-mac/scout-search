import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchPage from "./pages/SearchPage/SearchPage";

const App = () => (
  <Router>
    <div className="clone">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
