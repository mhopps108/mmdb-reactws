import React, { useState, useEffect } from "react";
import { Route, Link, useRouteMatch, useParams } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";

const Listitem = styled.div`
  padding: 5px;
  margin: 5px;
`;

const Listheader = styled.div`
  font-size: 20px;
  padding: 5px;
  margin: 5px;
`;

export default function Sidebar({ isOpen, toggleOpen }) {
  const tmdblist = ["Popular", "New Releases", "Upcoming", "Top Rated"];
  return (
    <StyledSidebar isOpen={isOpen}>
      <CloseButton onClick={toggleOpen}>X</CloseButton>
      <div>SideDrawer</div>
      <Listheader>TMDb</Listheader>
      {tmdblist.map(item => {
        return <Listitem key={item}>{item}</Listitem>;
      })}
      <Listheader>IMDb</Listheader>
      {tmdblist.map(item => {
        return <Listitem key={item}>{item}</Listitem>;
      })}
      <Listheader>Trakt</Listheader>
      {tmdblist.map(item => {
        return <Listitem key={item}>{item}</Listitem>;
      })}
      <Listheader>More</Listheader>
      {tmdblist.map(item => {
        return <Listitem key={item}>{item}</Listitem>;
      })}
    </StyledSidebar>
  );
}

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 30px;
  @media ${device.min.desktop} {
    display: none;
  }
`;

const StyledSidebar = styled.div`
  background: white;
  height: calc(100vh - 55px);
  width: 200px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 32px 16px;
  position: fixed;
  top: 55px;

  @media ${device.max.desktop} {
    transition: transform 0.3s ease-in-out;
    ${props =>
      props.isOpen
        ? css`
            transform: translateX(0);
          `
        : css`
            transform: translateX(-100%);
          `}
  }
  @media ${device.min.desktop} {
    grid-area: sidebar;
  }
`;
