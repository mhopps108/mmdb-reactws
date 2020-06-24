import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { List, Releases, Detail, Discover, ReleaseDates } from "./pages";
import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components";
import "rsuite/dist/styles/rsuite-default.css";

const GlobalStyle = createGlobalStyle`
    *,
    *:before,
    *:after {
      -webkit-box-sizing: inherit;
      -moz-box-sizing: inherit;
      box-sizing: inherit;
      padding: 0;
      margin: 0;      
    }
    
    :root {
      //font-size: 16px;  // TODO: use?? mess with browser resizing?
    }
        
    body {
      overflow-x: hidden;
      width: 100vw;      
      font-family: 'Source Sans Pro', Arial, sans-serif;      
      /*font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',*/
      /*'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',*/
      /*sans-serif;*/
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: #282c35;
    }
`;

export default function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}>
            <List />
          </Route>
          <Route path={"/lists/:slug"}>
            <List />
          </Route>
          <Route path={"/release-dates"}>
            <ReleaseDates />
          </Route>
          <Route path={"/releases"}>
            <Releases />
          </Route>
          <Route path={"/discover"}>
            <Discover />
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
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
  background: #282c35;
`;
