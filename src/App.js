import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { List, Releases, Detail } from "./pages";
import styled, { css } from "styled-components";
// use createGlobalStyle from styled-components

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <StyledApp>
      <BrowserRouter>
        <Switch>
          <Route path={"/lists/:slug"}>
            <List
              sidebarVisible={sidebarVisible}
              toggleSidebar={toggleSidebar}
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
          <Route path={"/"}>
            <List
              sidebarVisible={sidebarVisible}
              toggleSidebar={toggleSidebar}
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
`;
