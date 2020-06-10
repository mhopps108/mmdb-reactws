import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { List, Releases, Detail, Discover, ReleaseDates } from "./pages";
import styled from "styled-components/macro";
// use createGlobalStyle from styled-components

// import default style
// import "rsuite/lib/styles/index.less";
import "rsuite/dist/styles/rsuite-default.css";

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [navMenuVisible, setNavMenuVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const toggleNavMenu = () => {
    console.log(`App.js: toogleNavMenu Clicked (${navMenuVisible})`);
    setNavMenuVisible(!navMenuVisible);
  };

  return (
    <StyledApp>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}>
            <List
              sidebarVisible={sidebarVisible}
              toggleSidebar={toggleSidebar}
              navMenuVisible={navMenuVisible}
              toggleNavMenu={toggleNavMenu}
            />
          </Route>
          <Route path={"/lists/:slug"}>
            <List
              sidebarVisible={sidebarVisible}
              toggleSidebar={toggleSidebar}
              navMenuVisible={navMenuVisible}
              toggleNavMenu={toggleNavMenu}
            />
          </Route>
          <Route path={"/release-dates"}>
            <ReleaseDates
              navMenuVisible={navMenuVisible}
              toggleNavMenu={toggleNavMenu}
            />
          </Route>
          <Route path={"/releases"}>
            <Releases
              navMenuVisible={navMenuVisible}
              toggleNavMenu={toggleNavMenu}
            />
          </Route>
          <Route path={"/discovery"}>
            <Discover
              navMenuVisible={navMenuVisible}
              toggleNavMenu={toggleNavMenu}
            />
          </Route>
          <Route path="/movie/:imdbId">
            <Detail
              navMenuVisible={navMenuVisible}
              toggleNavMenu={toggleNavMenu}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  max-width: 1000px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: repeating-linear-gradient(
    45deg,
    rgb(27, 27, 27) 0px,
    rgb(27, 27, 27) 97px,
    rgb(24, 24, 24) 97px,
    rgb(24, 24, 24) 194px,
    rgb(20, 20, 20) 194px,
    rgb(20, 20, 20) 291px
  );
`;
