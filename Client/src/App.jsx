import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PreHome from "./pages/PreHome";
import Team from "./pages/Team";
import ViewTeams from "./pages/ViewTeams";
import TeamInfo from "./pages/TeamInfo";
import UserInfo from "./pages/UserInfo";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PreHome />} />
        <Route exact path="/search" element={<Home />} />
        <Route exact path="/teamCreation" element={<Team/>} />
        <Route exact path="/viewTeams" element={<ViewTeams/>}/>
        <Route exact path="/team/:id" element={<TeamInfo />} />
        <Route exact path="/user/:id" element={<UserInfo />} />
        <Route exact path="/createUser" element={<CreateUser />} />
        <Route exact path="/editUser/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
