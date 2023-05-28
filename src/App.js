import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchAboutMe from "./Components/Search-About-Me/SearchAboutMe";
import Albums from "./Components/Albums/Albums";
import News from "./Components/News/News";
import Posts from "./Components/Posts/Posts";
import GarageSearch from "./Components/Garage/Garage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Search-About-Me" element={<SearchAboutMe />} />
          <Route exact path="/albums-images" element={<Albums />} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/garage" element={<GarageSearch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
