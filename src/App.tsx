import React from "react";
import Metronome from "./Metronome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <Link style={{ display: "none" }} to="/">
        Home
      </Link>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Route exact path="/" component={Metronome} />
    </Router>
  );
};

export default App;
