import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import {
  tmdbLinks,
  releaseDateLinks,
  releasesLinks,
  discoveryLinks,
} from "../constants/routes";
import { NavDropdown } from "../components";

const NavMenuWrap = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  //display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  //margin: 30px;
  background: #282c35;

  @media ${device.min.tablet} {
    display: none;
    opacity: 0;
    //visibility: hidden;
  }
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  p {
    color: lightgray;
    opacity: 0.5;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  a {
    color: whitesmoke;
    font-size: 1.2rem;
  }
`;

const MenuButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 1.5rem;
  font-size: 1.5rem;
  padding: 4px 8px;
  background: whitesmoke;
  border: 1px solid #333;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${device.min.tablet} {
    display: none;
    //visibility: hidden;
  }
`;

const NavMenu = ({ isOpen, toggleNav }) => {
  return (
    <NavMenuWrap isOpen={isOpen}>
      <NavSection>
        <p>{"List"}</p>
        {tmdbLinks.map(({ name, path }, index) => {
          return (
            <div onClick={toggleNav} key={index}>
              <Link to={path}>{name}</Link>
            </div>
          );
        })}
      </NavSection>
      <NavSection>
        <p>{"Releases"}</p>
        {releasesLinks.map(({ name, path }, index) => {
          return (
            <div onClick={toggleNav} key={index}>
              <Link to={path}>{name}</Link>
            </div>
          );
        })}
      </NavSection>
      <NavSection>
        <p>{"Discover"}</p>
        {discoveryLinks.map(({ name, path }, index) => {
          return (
            <div onClick={toggleNav} key={index}>
              <Link to={path}>{name}</Link>
            </div>
          );
        })}
      </NavSection>
    </NavMenuWrap>
  );
};

export default function HeaderRes({ toggleNavMenu }) {
  // toggleNavMenu - old slide down version
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => setShowNav(!showNav);
  const MenuButtonIcon = () => {
    return showNav ? <GrClose /> : <FiMenu />;
  };

  return (
    <Header>
      <NavBrand>
        <Link to="/">MMDb</Link>
      </NavBrand>

      <Nav>
        <NavDropdown />
        {/*<Link to={"/lists/tmdb-popular"}>List</Link>*/}
        <Link to={"/releases"}>Releases</Link>
        <Link to={"/discover"}>Discover</Link>
      </Nav>
      <div>
        <NavButton onClick={toggleNavMenu}>
          <FaSearch />
        </NavButton>
        <NavButton onClick={toggleNavMenu}>
          <FaUserAlt />
        </NavButton>
      </div>
      <NavMenu isOpen={showNav} toggleNav={toggleNav} />
      <MenuButton onClick={toggleNav}>{MenuButtonIcon()}</MenuButton>
    </Header>
  );
}

const Header = styled.header`
  grid-area: header;
  background: #282c35;
  position: sticky;
  top: 0;
  z-index: 10;

  width: 100%;
  max-width: 1000px;
  height: 100%;
  padding: 0 0.75rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  //display: none;
  display: flex;

  a {
    color: white;
    font-size: 1.1rem;
    margin-right: 1rem;
  }

  @media ${device.min.small} {
    display: flex;
    flex-direction: row;
  }
`;

// const NavDropdown = styled.button``;

// const DropdownMenu = styled.div`
//   visibility: ${(props) => (props.open ? "visible" : "hidden")};
// `;

const NavBrand = styled.h1`
  font-size: 1.5rem;
  //line-height: 1.5rem;
  a {
    color: #fff;
    text-decoration: none;
  }
`;

const NavButton = styled.button`
  font-size: 1.2rem;
  padding-left: 0.5rem;
  //margin: 0 5px 0 15px;
  color: white;
  background: transparent;
`;
