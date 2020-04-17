import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { List, Releases, Detail } from "./pages";
import styled from "styled-components/macro";
// use createGlobalStyle from styled-components

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [navMenuVisible, setNavMenuVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const toggleNavMenu = () => {
    console.log(`App.js: toogleNavMenu Clicked (${navMenuVisible})`);
    setNavMenuVisible(!navMenuVisible);
  };
  console.log(`App: toggleNavMenu (${toggleNavMenu})`);

  return (
    <StyledApp>
      <BrowserRouter>
        <Switch>
          <Route path={"/"}>
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
            <Releases
              sidebarVisible={sidebarVisible}
              toggleSidebar={toggleSidebar}
            />
          </Route>
          <Route path="/movie/:imdbId">
            <Detail />
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
`;
