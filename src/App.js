import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {
  Header,
  Sidebar,
  Toolbar,
  Main,
  MovieDetail,
  ReleaseDates,
} from "./components";
import styled, { css } from "styled-components";
import { device } from "./devices";
import "boxicons";
// use createGlobalStyle from styled-components

export default function App() {
  const [sidebarVisable, setSidebarVisable] = useState(false);
  const toggleSidebar = () => setSidebarVisable(!sidebarVisable);
  return (
    <StyledApp>
      <BrowserRouter>
        <Header toggleSidebar={toggleSidebar} />
        <Switch>
          <Route path={"/release-dates"}>
            {/*<Main />*/}
            <ReleaseDates />
          </Route>
          <Route path={"/lists/:slug"}>
            <Toolbar />
            <Sidebar isOpen={sidebarVisable} toggleOpen={toggleSidebar} />
            <Main />
          </Route>
          <Route path="/movie/:imdbId">
            <MovieDetail />
          </Route>
          <Route path="/">
            <Toolbar />
            <Sidebar isOpen={sidebarVisable} toggleOpen={toggleSidebar} />
            <Main />
          </Route>
          {/*<Route path="/lists">*/}
        </Switch>
      </BrowserRouter>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif; */
  font-family: "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* font-family: sans-serif; */
  max-width: 1000px;
  display: grid;
  grid-template-areas:
    "header"
    "toolbar"
    "main";
  grid-template-columns: 1fr;
  grid-template-rows: 55px 45px 1fr;
  margin: 0 auto;

  @media ${device.min.desktop} {
    display: grid;
    grid-template-areas:
      "header header"
      "sidebar toolbar"
      "sidebar main";
    grid-template-columns: 200px 1fr;
    grid-template-rows: 55px 45px 1fr;
  }
`;
