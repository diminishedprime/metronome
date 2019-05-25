import React from "react";
import Metronome from "./Metronome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Update from "./Update";
import styled from "styled-components";

const TopBar = () => {
  return (
    <div>
      <Link style={{ display: "none" }} to="/">
        Home
      </Link>
    </div>
  );
};

const WrapperStyle = styled.div`
  max-width: 50em;
  margin: 0 auto;
`;

const Wrapper: React.FC = ({ children }) => {
  return (
    <WrapperStyle>
      <Update />
      <TopBar />
      {children}
    </WrapperStyle>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Wrapper>
        <Route exact path="/" component={Metronome} />
      </Wrapper>
    </Router>
  );
};

export default App;
