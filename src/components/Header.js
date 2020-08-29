import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { device } from "../devices";
import { NavDropdown } from "../components";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import {
  tmdbLinks,
  releasesLinks,
  discoveryLinks,
  releaseDateLinks,
} from "../constants/routes";

const NavMenuWrap = styled.div`
  //display: ${(props) => (props.isOpen ? "flex" : "none")};
  display: flex;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};  
  flex-direction: column;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  position: fixed;  
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border: 2px solid lightgray;
  border-radius: 6px;
  //background: #282c35;
  background: #33425b;
  transition: all 100ms ease-in-out;

  @media ${device.min.tablet} {
    display: none;
    //visibility: hidden;
    opacity: 0;
  }
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  div {
    margin: 4px 0;
  }
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
  font-size: 1.4rem;
  padding: 6px 12px;
  //color: #282c35;
  color: #33425b;
  background: whitesmoke;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  :hover {
    //box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 8px rgba(255, 255, 255, 0.3);
  }

  @media ${device.min.tablet} {
    //display: none;
    visibility: hidden;
  }
`;

const NavMenu = ({ isOpen, toggleNav }) => {
  const releaseLinks = [...releaseDateLinks, ...releasesLinks];
  return (
    <NavMenuWrap isOpen={isOpen}>
      <NavBrand style={{ marginLeft: "12px" }}>
        <Link to="/">MMDb</Link>
      </NavBrand>
      <NavSection>
        <p>{"List"}</p>
        {tmdbLinks.map(({ name, path, sort }, index) => {
          return (
            <div onClick={toggleNav} key={index}>
              <Link to={path}>{name}</Link>
            </div>
          );
        })}
      </NavSection>
      <NavSection>
        <p>{"Release Dates"}</p>
        {releaseLinks.map(({ name, path }, index) => {
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

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => setShowNav(!showNav);

  return (
    <HeaderWrap>
      <NavBrand>
        <Link to="/">MMDb</Link>
      </NavBrand>

      <Nav>
        <NavDropdown title={"Lists"} items={tmdbLinks} />
        <NavDropdown
          title={"Releases"}
          items={[...releaseDateLinks, ...releasesLinks]}
        />
        <NavDropdown title={"Discover"} items={discoveryLinks} />
      </Nav>

      <div>
        <NavButton>
          <FaSearch />
        </NavButton>
        <NavButton>
          <FaUserAlt />
        </NavButton>
      </div>

      <NavMenu isOpen={showNav} toggleNav={toggleNav} />
      <MenuButton onClick={toggleNav}>
        {showNav ? <GrClose /> : <FiMenu />}
      </MenuButton>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  grid-area: header;
  //background: #282c35;
  background: #33425b;
  position: sticky;
  top: 0;
  z-index: 10;

  max-width: 1000px;
  padding: 0 0.75rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: none;

  a {
    color: white;
    font-size: 1.1rem;
    margin-right: 1rem;
  }

  @media ${device.min.small} {
    display: flex;
  }
`;

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
  padding-left: 1rem;
  //margin: 0 5px 0 15px;
  color: white;
  background: transparent;
`;
