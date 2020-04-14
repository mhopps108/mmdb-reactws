import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";

const Listitem = styled.div`
  padding: 5px;
  & a {
    color: #222;
    text-decoration: none;
  }
`;

const Listheader = styled.div`
  font-size: 20px;
  //padding: 10px 0px 5px 0;
  //margin: 5px;
`;

const tmdbLinks = [
  {
    name: "Popular",
    path: "/lists/tmdb-popular",
  },
  {
    name: "Top Rated",
    path: "/lists/tmdb-top-rated",
  },
  {
    name: "Now Playing",
    path: "/lists/tmdb-now-playing",
  },
  {
    name: "Upcoming",
    path: "/lists/tmdb-upcoming",
  },
];

const releaseDateLinks = [
  {
    name: "Theatrical Releases",
    path: "/releases-dates",
  },
  {
    name: "Digital Releases",
    path: "/releases-dates",
  },
  {
    name: "BluRay Releases",
    path: "/releases-dates",
  },
];

const discoveryLinks = [
  {
    name: "Top Comedies",
    path: "/lists/tmdb-now-playing",
  },
  {
    name: "Top Rated Kids Movies",
    path: "/lists/tmdb-now-playing",
  },
  {
    name: "Best Family Movies",
    path: "/lists/tmdb-now-playing",
  },
];

export default function Sidebar({ isOpen, toggleOpen }) {
  const tmdblist = ["Popular", "New Releases", "Upcoming", "Top Rated"];
  return (
    <StyledSidebar isOpen={isOpen}>
      <CloseButton onClick={toggleOpen}>X</CloseButton>
      <div>SideDrawer</div>

      <Listheader>TMDb</Listheader>
      {tmdbLinks.map((item, index) => {
        return (
          <Listitem onClick={toggleOpen} key={index}>
            <Link to={item.path}>{item.name}</Link>
          </Listitem>
        );
      })}
      <Listheader>IMDb</Listheader>
      {tmdblist.map((item) => {
        return <Listitem key={item}>{item}</Listitem>;
      })}
      <Listheader>Trakt</Listheader>
      {tmdblist.map((item) => {
        return <Listitem key={item}>{item}</Listitem>;
      })}
      <Listheader>Releases</Listheader>
      {releaseDateLinks.map((item, index) => {
        return (
          <Listitem onClick={toggleOpen} key={index}>
            <Link to={item.path}>{item.name}</Link>
          </Listitem>
        );
      })}
      <Listheader>Discovery</Listheader>
      {discoveryLinks.map((item, index) => {
        return (
          <Listitem onClick={toggleOpen} key={index}>
            <Link to={item.path}>{item.name}</Link>
          </Listitem>
        );
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
  //height: calc(100vh - 55px);
  width: 200px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 20px 16px;
  position: fixed;
  top: 55px;

  @media ${device.max.desktop} {
    transition: transform 0.3s ease-in-out;
    ${(props) =>
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
