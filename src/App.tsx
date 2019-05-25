import React from "react";
import Metronome from "./Metronome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Update from "./Update";
import styled from "styled-components";
import { maxWidth } from "./Common";

const TopBarWrapper = styled.section`
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  > h2 {
    margin: 0 !important;
  }
`;

const TopBar = () => {
  return (
    <TopBarWrapper className="has-background-primary has-text-light">
      <h2 className="is-size-2">(mjh)tronome</h2>
      <Link style={{ display: "none" }} to="/">
        Home
      </Link>
    </TopBarWrapper>
  );
};

const WrapperStyle = styled.div`
  max-width: ${maxWidth};
  margin: 0 auto;
  > * {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const FooterStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const Wrapper: React.FC = ({ children }) => {
  return (
    <WrapperStyle>
      <Update />
      <TopBar />
      {children}
      <FooterStyle>{`v${process.env.REACT_APP_VERSION}`}</FooterStyle>
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
