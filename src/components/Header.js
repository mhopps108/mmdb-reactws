import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import "boxicons";

const StyledBrand = styled.h1`
  font-size: 1.75rem;
  margin-left: 8px;
  background: #2162a4;
  //background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
  //background: #158cba;
  //background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
  //background: -webkit-linear-gradient(#eee, #333);
  //background-image: linear-gradient(
  //  -225deg,
  //  #22e1ff 0%,
  //  #1d8fe1 48%,
  //  #625eb1 100%
  //);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function Header({ toggleSidebar, toggleNavMenu }) {
  return (
    <StyledHeader>
      <Navbar>
        <NavGroup>
          {/*<button onClick={toggleSidebar}>Side</button>*/}
          <StyledBrand>
            {/*<NavLink>*/}
            <Link to="/">MMDb</Link>
            {/*</NavLink>*/}
          </StyledBrand>
        </NavGroup>
        {/*<NavGroupPages>*/}
        {/*  <NavLink>*/}
        {/*    <Link to="/lists/tmdb-popular">List</Link>*/}
        {/*  </NavLink>*/}
        {/*  <NavLink>*/}
        {/*    <Link to="/release-dates">Releases</Link>*/}
        {/*  </NavLink>*/}
        {/*</NavGroupPages>*/}

        <NavGroup>
          <button
            style={{
              border: "1px solid black",
              padding: "2px 5px",
              marginRight: " 5px",
              borderRadius: "5px",
              background: "white",
            }}
            onClick={toggleNavMenu}
          >
            Menu
          </button>
        </NavGroup>
      </Navbar>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  background-color: #222;
  //background-color: #111;
  grid-area: header;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  width: 100%;
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
    //color: white;
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
