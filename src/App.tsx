import React from "react";
import Metronome from "./Metronome";
import Settings from "./Settings";
import * as polyfill from "./polyfill";
import Scales from "./Scales";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Update from "./Update";
import { useAppSettings } from "./settings";
import { useMetronome } from "./metronome";
import styled, { keyframes } from "styled-components";
import { maxWidth } from "./Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars as faCoffee,
  faHome,
  faCog as faGear,
  faMusic
} from "@fortawesome/free-solid-svg-icons";
import { useToggle, useSingleton } from "./hooks";

const TopBarWrapper = styled.section`
  margin-bottom: 10px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  display: flex;
  flex-direction: column;
`;

const CenterIcon = styled.span`
  align-self: center;
`;

const TopNav = styled.section`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
  > h2 {
    margin: 0 !important;
  }
`;

const dropDown = keyframes`
  from {
font-size: 0px;
  }
`;

const NavDropDown = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 10px;
  align-self: flex-end;
  > a {
    animation: ease-in 0.3s ${dropDown};
    font-size: 1.5rem;
  }
`;

const NavItem = styled(Link)``;

const NavIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
`;

const TopBar = () => {
  const [showNav, toggleNav] = useToggle(false);
  // TODO - figure out how to animate the nav being hidden.
  // TODO - make it where clicking outside of this element hides it.
  // TODO - make it where you can swipe from the right of the screen to show the nav.
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
      {showNav && (
        <NavDropDown onClick={toggleNav}>
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
      )}
    </TopBarWrapper>
  );
};

const WrapperStyle = styled.div`
  max-width: ${maxWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  > * {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const FooterStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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

// TODO - add an overall exception handler that prints the stacktrace.
// TODO - add a button to the overall exception handler that lets you clear local storage.
// TODO - add an option to the settings to clear local storage.
// TODO - update components to use the React.FC type.

const App: React.FC = () => {
  const appSettings = useAppSettings();
  const { value: audioContext, init: initAudioContext } = useSingleton<
    AudioContext
  >();
  const [hasAudioContext, setHasAudioContext] = React.useState(true);
  const metronome = useMetronome(audioContext);

  const {
    state: { playing }
  } = metronome;

  // Initialize AudioContext as a singleton on first start.
  React.useEffect(() => {
    if (polyfill.AudioContext === undefined) {
      setHasAudioContext(false);
    } else if (playing) {
      initAudioContext(new polyfill.AudioContext());
    }
  }, [playing]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Wrapper>
        {!hasAudioContext && (
          <div>
            Your browser doesn't support the audioContext api, so this will not
            work. Sorry :(
          </div>
        )}
        <Route
          exact
          path="/"
          render={() => (
            <Metronome metronome={metronome} appSettings={appSettings} />
          )}
        />
        <Route
          exact
          path="/scales"
          render={() => <Scales metronome={metronome} />}
        />
        <Route
          exact
          path="/settings"
          render={() => <Settings appSettings={appSettings} />}
        />
      </Wrapper>
    </Router>
  );
};

export default App;
