import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { List, Detail, Discover, ReleaseDates, Search } from "./pages";
import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components";
import "rsuite/dist/styles/rsuite-default.css";
import { ReactQueryDevtools } from "react-query-devtools";

const GlobalStyle = createGlobalStyle`
    *,
    *:before,
    *:after {
      //-webkit-box-sizing: inherit;
      //-moz-box-sizing: inherit;
      //box-sizing: inherit;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0;
      margin: 0;      
    }
    
    :root {
      //font-size: 16px;  // TODO: use?? mess with browser resizing?      
      //background: #282c35;
      //background: #33425b;
      --color-charcoal: #353C45;
      //--color-charcoal: #2c3e50;
      //--color-charcoal: #232F49;
      --color-primary-blue: #2C97DE;
      --color-grey: #EEEEEE;
      --color-white: #FFFFFF;
    }
        
    body {
      overflow-x: hidden;
      overflow-y: scroll;
      width: 100vw;     
      height: 100vh;
      font-size: 16px;
      //font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      //'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      //sans-serif;
      //font-family: 'Roboto', sans-serif;
      font-family: 'Ubuntu', sans-serif;
      letter-spacing: 0.5px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;            
      background: none;
      color: var(--color-charcoal);
      //color: red;
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
              <Navigate to="/list/tmdb-popular?sort=rank" />
            </Route>
            <Route path={"/list/:slug"} element={<List />} />
            <Route
              path={"/release-dates/:type/:period"}
              element={<ReleaseDates />}
            />
            <Route path={"/discover"} element={<Discover />} />
            <Route path={"/search"} element={<Search />} />
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
