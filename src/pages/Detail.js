import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Header, Sidebar, MovieDetail, NavMenu } from "../components";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";

export default function Detail({
  sidebarVisible,
  toggleSidebar,
  navMenuVisible,
  toggleNavMenu,
}) {
  return (
    <StyledDetail>
      <Header toggleSidebar={toggleSidebar} toggleNavMenu={toggleNavMenu} />
      <NavMenu isOpen={navMenuVisible} toggleOpen={toggleNavMenu} />
      {/*<Sidebar isOpen={sidebarVisible} toggleOpen={toggleSidebar} />*/}
      <MovieDetail />
    </StyledDetail>
  );
}

const StyledDetail = styled.div`
  max-width: 1000px;
  width: 100%;
  height: 100%;
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
