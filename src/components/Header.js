import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
// import "boxicons";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

export default function Header({ toggleSidebar, toggleNavMenu }) {
  return (
    <StyledHeader>
      <Navbar>
        <NavGroup>
          <button
            style={{
              fontSize: "1.5rem",
              paddingBottom: "4px",
              margin: "0 5px 0 15px",
              color: "white",
            }}
            onClick={toggleNavMenu}
          >
            <FiMenu />
          </button>
          {/*<StyledBrand>*/}
          {/*  <Link to="/">MMDb</Link>*/}
          {/*</StyledBrand>*/}
        </NavGroup>
        <NavGroup>
          <StyledBrand>
            <Link to="/">MMDb</Link>
          </StyledBrand>
        </NavGroup>
        <NavGroup>
          <button
            style={{
              // padding: "2px 5px",
              marginRight: "15px",
              color: "white",
            }}
            onClick={toggleNavMenu}
          >
            <FaSearch />
          </button>

          <button
            style={{
              // border: "1px solid white",
              // padding: "2px 5px",
              marginRight: "15px",
              color: "white",
            }}
            onClick={toggleNavMenu}
          >
            <FaUserAlt />
          </button>
        </NavGroup>
      </Navbar>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  //background: linear-gradient(45deg, #222, #111);
  background: repeating-linear-gradient(
    45deg,
    rgb(27, 27, 27) 0px,
    rgb(27, 27, 27) 97px,
    rgb(24, 24, 24) 97px,
    rgb(24, 24, 24) 194px,
    rgb(20, 20, 20) 194px,
    rgb(20, 20, 20) 291px
  );
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
    //padding-right: 5px;
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

const StyledBrand = styled.h1`
  font-size: 1.75rem;
  margin-left: 8px;
  //background: #2162a4;
  background: #1f4b99;
  //background: rgb(66, 82, 110);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
