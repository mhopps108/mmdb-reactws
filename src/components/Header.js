import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import "boxicons";

export default function Header({ toggleSidebar, toggleNavMenu }) {
  return (
    <StyledHeader>
      <Navbar>
        <NavGroup>
          {/*<button onClick={toggleSidebar}>Side</button>*/}
          <h3 style={{ marginLeft: "5px" }}>MMDb</h3>
        </NavGroup>
        <NavGroupPages>
          <NavLink>
            <Link to="/lists/tmdb-popular">List</Link>
          </NavLink>
          <NavLink>
            <Link to="/release-dates">Releases</Link>
          </NavLink>
        </NavGroupPages>

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
