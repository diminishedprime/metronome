import React from "react";
import Metronome from "./Metronome";
import Settings from "./Settings";
import Scales from "./Scales";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Update from "./Update";
import * as redux from "../redux";
import styled, { keyframes } from "styled-components";
import { maxWidth } from "./Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars as faCoffee,
  faHome,
  faCog as faGear,
  faMusic
} from "@fortawesome/free-solid-svg-icons";
import * as hooks from "../hooks";

const TopBarWrapper = React.memo(styled.section`
  margin-bottom: 10px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  position: relative;
  display: inline-block;
  flex-direction: column;
`);

const CenterIcon = React.memo(styled.span`
  align-self: center;
`);

const TopNav = React.memo(styled.section`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
  > h2 {
    margin: 0 !important;
  }
`);

const dropDown = keyframes`
  from {
font-size: 0px;
  }
to {
margin: 10px;
}
`;

const NavDropDown = React.memo(styled.nav`
  display: flex;
  position: absolute;
  z-index: 2;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 10px;
  align-self: flex-end;
  opacity: 0.9;
  > a {
    animation: ease-in 0.1s ${dropDown};
    font-size: 1.5rem;
    margin: 10px;
  }
`);

const NavItem = React.memo(styled(Link)``);

const NavIcon = React.memo(styled(FontAwesomeIcon)`
  margin-left: 5px;
`);

const NavDrop = ({ toggleNav }: { toggleNav: () => void }) => {
  const onClick = toggleNav;
  React.useEffect(() => {
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);
  return (
    <NavDropDown className="has-background-white">
      <NavItem to="/">
        Home
        <NavIcon icon={faHome} />
      </NavItem>
      <NavItem to="/scales">
        Scales
        <NavIcon icon={faMusic} />
      </NavItem>
      <NavItem to="/settings">
        Settings
        <NavIcon icon={faGear} />
      </NavItem>
    </NavDropDown>
  );
};

const TopBar = React.memo(() => {
  const [showNav, toggleNav] = hooks.useToggle(false);
  // TODO: - figure out how to animate the nav being hidden.
  // TODO: - make it where you can swipe from the right of the screen to show the nav.
  return (
    <TopBarWrapper>
      <TopNav className="has-background-primary has-text-light">
        <Link to="/" className="has-text-white">
          <h2 className="is-size-4 is-bold">(mjh)tronome</h2>
        </Link>
        <CenterIcon onClick={toggleNav}>
          <FontAwesomeIcon icon={faCoffee} size="2x" />
        </CenterIcon>
      </TopNav>
      {showNav && <NavDrop toggleNav={toggleNav} />}
    </TopBarWrapper>
  );
});

const WrapperStyle = React.memo(styled.div`
  max-width: ${maxWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  > * {
    margin-left: 10px;
    margin-right: 10px;
  }
`);

const FooterStyle = React.memo(styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 5px;
`);

const Wrapper: React.FC = React.memo(({ children }) => {
  return (
    <WrapperStyle>
      <Update />
      <TopBar />
      {children}
      <FooterStyle>{`v${process.env.REACT_APP_VERSION}`}</FooterStyle>
    </WrapperStyle>
  );
});

// TODO: - add a button to the overall exception handler that lets you clear local storage.
// TODO: - add an option to the settings to clear local storage.
// TODO: - update components to use the React.FC type.
const App: React.FC = () => {
  const audioContext = hooks.useAudioContext();
  const keepAwake = redux.useSelector(a => a.settings.keepAwake);
  const playing = redux.useSelector(a => a.metronomeState.playing);
  hooks.useSleepLock(keepAwake && playing);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Wrapper>
        {audioContext === "not-supported" && (
          <div>
            Your browser doesn't support the audioContext api, so this will not
            work. Sorry :(
          </div>
        )}
        <Route
          exact
          path="/"
          render={() => <Metronome audioContext={audioContext} />}
        />
        <Route
          exact
          path="/scales"
          render={() => <Scales audioContext={audioContext} />}
        />
        <Route exact path="/settings" render={() => <Settings />} />
      </Wrapper>
    </Router>
  );
};

export default App;
