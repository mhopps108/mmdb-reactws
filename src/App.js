import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { List, Releases, MovieDetail } from "./pages";
import styled, { css } from "styled-components";
// use createGlobalStyle from styled-components

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);

    console.log(`sidebar button clicked - (${sidebarVisible})`);
  };
  return (
    <StyledApp>
      <BrowserRouter>
        <Switch>
          <Route path={"/lists/:slug"}>
            <List
              sidebarVisable={sidebarVisible}
              toggleSidebar={toggleSidebar}
            />
          </Route>
          <Route path={"/release-dates"}>
            <Releases
              sidebarVisable={sidebarVisible}
              toggleSidebar={toggleSidebar}
            />
          </Route>
          <Route path="/movie/:imdbId">
            <MovieDetail />
          </Route>
          <Route path={"/"}>
            <List
              sidebarVisable={sidebarVisible}
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
  height: 100%;
  //display: grid;
  //grid-template-areas: "page";
  //grid-template-columns: 1fr;
  //grid-template-rows: 1fr;
  //margin: 0 auto;
`;
