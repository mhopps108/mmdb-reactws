import React, { useState, useEffect, useRef } from "react";
import { Route, Link, useRouteMatch, useParams } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import "boxicons";

export default function Header({ toggleSidebar }) {
  return (
    <StyledHeader>
      <Navbar>
        <NavGroup>
          <button onClick={toggleSidebar}>
            <box-icon name="menu" color="white" />
          </button>
          <h3>MMDb</h3>
        </NavGroup>
        <NavGroupPages>
          <NavLink>
            <Link to="/list">List</Link>
          </NavLink>
          <NavLink>
            <Link to="/list">Discovery</Link>
          </NavLink>
          <NavLink>
            <Link to="/release-dates">Releases</Link>
          </NavLink>
        </NavGroupPages>
        <NavGroup>
          <a href="/">
            <box-icon name="search" color="white" />
          </a>
          <a href="/">
            <box-icon name="dots-vertical-rounded" color="white" />
          </a>
          {/* <a href="/">
            <box-icon name="cog" color="white" />
          </a> */}
        </NavGroup>
      </Navbar>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  background-color: #222;
  grid-area: header;
  position: sticky;
  top: 0;
  width: 100%;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
`;

const NavGroup = styled.div`
  display: flex;
  color: white;
  & a {
    padding-right: 5px;
    text-decoration: none;
  }
  & button {
    padding-right: 5px;
    background-color: transparent;
    border: none;
    font-size: 1.1rem;
  }
  & h3 {
    padding: 0;
    margin: 0;
    align-self: center;
  }
`;

const NavGroupPages = styled(NavGroup)`
  /* display: none; */
  display: flex;
  @media ${device.min.tablet} {
    display: flex;
  }
`;

const NavLink = styled.div`
  font-size: 1rem;
  margin-right: 8px;
  padding: 4px 8px;
  border-radius: 5px;
  & a {
    color: #ccc;
  }
  & a:hover {
    color: green;
  }

  @media ${device.min.tablet} {
    font-size: 1.3rem;
  }
`;
