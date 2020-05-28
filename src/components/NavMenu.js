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
    path: "/release-dates",
  },
  {
    name: "Digital Releases",
    path: "/release-dates",
  },
  {
    name: "BluRay Releases",
    path: "/release-dates",
  },
];

const discoveryLinks = [
  {
    name: "Top Comedies",
    path: `/discovery?orderby=-imdb_rating_avg,-imdb_rating_count&genres=comedy&certification=&imdb_rating_avg__gte=5&imdb_rating_avg__lte=10&imdb_rating_count__gte=5000&year__gte=1990&year__lte=2030`,
  },
  {
    name: "Top Rated Kids Movies",
    path: `/discovery?
    orderby=-imdb_rating_avg,-imdb_rating_count
    &genres=animation
    &certification=,G,PG
    &imdb_rating_avg__gte=5&imdb_rating_avg__lte=10
    &imdb_rating_count__gte=2500
    &year__gte=1990&year__lte=2030`,
  },
];

const Listitem = styled.div`
  padding-bottom: 5px;
  color: #222;
  & a {
    color: #222;
    text-decoration: none;
  }
`;

const Listheader = styled.div`
  font-size: 20px;
  //padding: 10px 0px 5px 0;
  //margin: 5px;
  margin-bottom: 5px;
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
  border: 2px solid #333;
  //background: #2162a4;
  //color: white;
  background: #fff;
  color: #2162a4;
  //-webkit-box-shadow: inset 0 10px 25px 4px rgba(0, 0, 0, 0.37);
  //box-shadow: inset 0 10px 25px 4px rgba(0, 0, 0, 0.3);

  max-height: calc(100vh - 55px);
  //height: 400px;
  width: 100%;
  max-width: 1000px;

  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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
