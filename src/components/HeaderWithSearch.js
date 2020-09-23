import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { device } from "../devices";
import { NavDropdown, Portal, NavMenuMobile } from "../components";
import { useOnClickOutside } from "../hooks";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import {
  tmdbLinks,
  discoveryLinks,
  releaseDateLinks,
} from "../constants/routes";

export default function HeaderWithSearch() {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => setShowNav(!showNav);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  useOnClickOutside(searchRef, () => setShowSearch(false));

  const onSearch = () => {
    console.log("Header: showSearch clicked");
    setShowSearch(true);
  };

  return (
    <>
      <HeaderWrap>
        <NavBrand>
          <Link to="/">MMDb</Link>
        </NavBrand>
        <Nav>
          <NavDropdown title={"Lists"} items={tmdbLinks} />
          <NavDropdown title={"Releases"} items={releaseDateLinks} />
          <NavDropdown title={"Discover"} items={discoveryLinks} />
        </Nav>

        <ButtonWrap>
          {/* TODO: pull this out (into a portal?) */}
          <SearchWrap isOpen={showSearch} ref={searchRef}>
            <NavButton onClick={onSearch}>
              <FaSearch />
            </NavButton>
            <Input
              isOpen={showSearch}
              type="text"
              // type="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrap>
          {/*<Link to={"/search?search=avengers"}>*/}
          {/*  <FaSearch />*/}
          {/*</Link>*/}
          <NavButton>
            <FaUserAlt />
          </NavButton>
        </ButtonWrap>
      </HeaderWrap>
      <Portal>
        <MenuButton onClick={toggleNav}>
          {showNav ? <GrClose /> : <FiMenu />}
        </MenuButton>
        <NavMenuMobile isOpen={showNav} toggleNav={toggleNav} />
        {/*<NavMenu isOpen={showNav} toggleNav={toggleNav} />*/}
      </Portal>
    </>
  );
}

const SearchWrap = styled.div`
  background: #232323;
  height: 35px;
  display: flex;
  flex-direction: row;
  //flex-wrap: nowrap;
  border: 1px solid red;
  background: yellow;

  width: ${(p) => (p.isOpen ? "100%" : "auto")};
  //opacity: ${(p) => (p.isOpen ? "1" : "0")};
  opacity: 1;
  transition: width 300ms ease-in-out, opacity 300ms ease-in-out;
`;

const Input = styled.input`
  //appearance: none;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  //overflow: hidden;

  width: ${(p) => (p.isOpen ? "100%" : "0")};
  opacity: ${(p) => (p.isOpen ? "1" : "0")};

  transition: width 300ms ease-in-out, opacity 300ms ease-in-out;
`;

const HeaderWrap = styled.header`
  grid-area: header;
  background: var(--color-charcoal);
  position: sticky;
  top: 0;
  z-index: 10;

  max-width: 1000px;
  padding: 0 0.75rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  //display: grid;
  //grid-template-columns: 1fr 1fr 1fr;
  //grid-template-rows: auto;
  //justify-content: center;
  //align-items: center;
  //height: 55px;
`;

const Nav = styled.nav`
  display: none;
  //margin-right: auto;
  //margin-left: auto;

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
  font-size: 1.4rem;
  //line-height: 1.5rem;
  a {
    color: #fff;
    text-decoration: none;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  height: 35px;
`;

const NavButton = styled.button`
  font-size: 1rem;
  //padding-left: 1rem;
  padding: 4px 8px;
  //margin: 0 5px 0 15px;
  color: white;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MenuButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 1.5rem;
  font-size: 1.4rem;
  padding: 6px 12px;
  //color: var(--color-charcoal);
  background: whitesmoke;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  z-index: 1011;

  :hover {
    //box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 8px rgba(255, 255, 255, 0.3);
  }

  @media ${device.min.tablet} {
    //display: none;
    visibility: hidden;
  }
`;
