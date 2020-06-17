import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { device } from "../devices";
import {
  tmdbLinks,
  releaseDateLinks,
  releasesLinks,
  discoveryLinks,
} from "../constants/routes";

const Listitem = styled.div`
  padding-bottom: 5px;
  // color: #222;
  color: whitesmoke;
  & a {
    //color: #222;
    color: whitesmoke;
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
  //border: 1px solid lightgray;
  background: #282c35;
  color: white;
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
  //transition: transform 0.3s ease-in-out;
  transition: transform 300ms cubic-bezier(0, 1, 0.5, 1);
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
        <Listheader>Lists</Listheader>
        {tmdbLinks.map((item, index) => {
          return (
            <Listitem onClick={toggleOpen} key={index}>
              <Link to={item.path}>{item.name}</Link>
            </Listitem>
          );
        })}
      </ListSection>

      {/*<ListSection>*/}
      {/*  <Listheader>Release Dates (org)</Listheader>*/}
      {/*  {releaseDateLinks.map((item, index) => {*/}
      {/*    return (*/}
      {/*      <Listitem onClick={toggleOpen} key={index}>*/}
      {/*        <Link to={item.path}>{item.name}</Link>*/}
      {/*      </Listitem>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</ListSection>*/}

      <ListSection>
        <Listheader>Releases</Listheader>
        {releasesLinks.map((item, index) => {
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
