import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {
  Header,
  Sidebar,
  Toolbar,
  Main,
  // MovieDetail as MD,
} from "../components";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";

export default function MovieDetail({ sidebarVisible, toggleSidebar }) {
  return (
    <StyledMovieDetail>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarVisible} toggleOpen={toggleSidebar} />
      {/*<MD />*/}
    </StyledMovieDetail>
  );
}

const StyledMovieDetail = styled.div`
  max-width: 1000px;
  display: grid;
  grid-template-areas:
    "header"
    "main";
  grid-template-columns: 1fr;
  grid-template-rows: 55px 1fr;
  margin: 0 auto;

  // @media ${device.min.desktop} {
  //   grid-template-areas:
  //     "header header"
  //     "sidebar main";
  //   grid-template-columns: 200px 1fr;
  //   grid-template-rows: 55px 1fr;
  // }
`;
