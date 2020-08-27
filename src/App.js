import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  List,
  Releases,
  Detail,
  Discover,
  ReleaseDates,
  RelTest,
  RelTestTwo,
  ListTest,
} from "./pages";
import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components";
import "rsuite/dist/styles/rsuite-default.css";
import { ReactQueryDevtools } from "react-query-devtools";

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
      //font-family: 'Source Sans Pro', Arial, sans-serif;
      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
      letter-spacing: 0.5px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      //background: #282c35;
      //background: #33425b;
      //background: yellow;
      background: none;
    }
`;

export default function App() {
  return (
    <>
      <StyledApp>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route exact path={"/"}>
              {/*<List />*/}
              <ListTest />
            </Route>
            <Route path={"/list/:slug"}>
              {/*<List />*/}
              <ListTest />
            </Route>
            <Route path={"/release-dates"}>{/*<ReleaseDates />*/}</Route>
            {/*<Route*/}
            {/*  path={[*/}
            {/*    "/releases/:type/:period/:startDate",*/}
            {/*    "/releases/:type/:period",*/}
            {/*    "/releases/:type",*/}
            {/*    "/releases",*/}
            {/*  ]}*/}
            {/*>*/}
            {/*<Route path={"/releases/:type/:period/:startDate"}>*/}
            {/*<Route path={"/releases/"}>*/}
            {/*<Releases />*/}
            {/*<RelTest />*/}
            {/*<RelTestTwo />*/}
            {/*</Route>*/}
            <Route path="releases" element={<RelTestTwo />}>
              <Route path=":type" element={<RelTestTwo />} />
              <Route path=":type/:period" element={<RelTestTwo />} />
              <Route path=":type/:period/:startDate" element={<RelTestTwo />} />
            </Route>
            <Route path={"/discover"}>
              <Discover />
            </Route>
            <Route path="/movie/:imdbId">
              <Detail />
            </Route>
          </Routes>
        </BrowserRouter>
      </StyledApp>
      <ReactQueryDevtools />
    </>
  );
}

const StyledApp = styled.div`
  max-width: 1000px;
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
  background: #282c35;
`;
