import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PreHome from "./pages/PreHome";
import Team from "./pages/Team";
import ViewTeams from "./pages/ViewTeams";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PreHome />} />
        <Route exact path="/search" element={<Home />} />
        <Route exact path="/teamCreation" element={<Team/>} />
        <Route exact path="/viewTeams" element={<ViewTeams/>}/>
      </Routes>
    </Router>
  );
}

export default App;
