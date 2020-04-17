import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { device } from "../devices";

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

const Listitem = styled.div`
  padding-bottom: 5px;
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

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  //width: 100%;
  //max-width: 50%;
  width: 200px;
  //margin: 10px;
`;

const StyledNavMenu = styled.div`
  border: 1px solid red;
  background: lightblue;
  max-height: calc(100vh - 55px);
  //height: 400px;
  width: 100%;
  max-width: 1000px;

  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  //grid-template-columns: repeat(auto-fill, 200px);
  //justify-content: center;

  padding: 20px 16px;
  position: fixed;

  top: 55px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  z-index: 99;
  transition: transform 0.3s ease-in-out;
  ${(props) =>
    props.isOpen
      ? css`
          transform: translateY(0);
        `
      : css`
          transform: translateY(-120%);
        `}
`;

export default function NavMenu({ isOpen, toggleOpen }) {
  const tmdblist = ["Popular", "New Releases", "Upcoming", "Top Rated"];
  return (
    <StyledNavMenu isOpen={isOpen}>
      {/*<CloseButton onClick={toggleOpen}>X</CloseButton>*/}
      {/*<div>NavMenu</div>*/}
      <ListSection>
        <Listheader>TMDb</Listheader>
        {tmdbLinks.map((item, index) => {
          return (
            <Listitem onClick={toggleOpen} key={index}>
              <Link to={item.path}>{item.name}</Link>
            </Listitem>
          );
        })}
      </ListSection>

      <ListSection>
        <Listheader>IMDb</Listheader>
        {tmdblist.map((item) => {
          return <Listitem key={item}>{item}</Listitem>;
        })}
      </ListSection>

      <ListSection>
        <Listheader>Trakt</Listheader>
        {tmdblist.map((item) => {
          return <Listitem key={item}>{item}</Listitem>;
        })}
      </ListSection>

      <ListSection>
        <Listheader>Releases</Listheader>
        {releaseDateLinks.map((item, index) => {
          return (
            <Listitem onClick={toggleOpen} key={index}>
              <Link to={item.path}>{item.name}</Link>
            </Listitem>
          );
        })}
      </ListSection>

      <ListSection>
        <Listheader>Discovery</Listheader>
        {discoveryLinks.map((item, index) => {
          return (
            <Listitem onClick={toggleOpen} key={index}>
              <Link to={item.path}>{item.name}</Link>
            </Listitem>
          );
        })}
      </ListSection>
    </StyledNavMenu>
  );
}
