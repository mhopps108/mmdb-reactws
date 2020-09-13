import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { List, Detail, Discover, ReleaseDates, DiscoverTwo } from "./pages";
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
      //box-sizing: inherit;
      box-sizing: border-box;
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
      //font-family: Candara, Arial, sans-serif;
      //font-family: Geneva, Arial, sans-serif;
      //font-family: Calibri;     
      font-size: 16px;
      //font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      //'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      //sans-serif;
      font-family: 'Roboto', sans-serif;
      //font-family: sans-serif;
      //letter-spacing: 0.5px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      //background: #282c35;
      //background: #33425b;      
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
            {/* List */}
            <Route exact path={"/"}>
              <Navigate to="/list/tmdb-popular?sort=rank" />
            </Route>
            <Route path={"/list/:slug"} element={<List />} />
            {/* Release Dates */}
            <Route
              path={"/release-dates/:type/:period"}
              element={<ReleaseDates />}
            />
            <Route
              path={"/release-dates/:type/:period/:startDate"}
              element={<ReleaseDates />}
            />
            {/* Discover */}
            <Route path={"/discover"} element={<Discover />} />
            <Route path={"/discover-two"} element={<DiscoverTwo />} />
            {/* Movie Detail */}
            <Route path="/movie/:imdbId" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </StyledApp>
      {/*<ReactQueryDevtools />*/}
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
