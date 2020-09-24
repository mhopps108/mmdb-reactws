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
          <Portal>
            <SearchWrap isOpen={showSearch} ref={searchRef}>
              <FaSearch size={30} />
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
                <Link to={`/search/?search=${search}`}>Search</Link>
              </button>
            </SearchWrap>
            <Backdrop isOpen={showSearch} />
          </Portal>
          <NavButton onClick={() => setShowSearch(true)}>
            <FaSearch />
          </NavButton>
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

const Backdrop = styled.div`
  display: ${(p) => (p.isOpen ? "flex" : "none")};
  opacity: ${(p) => (p.isOpen ? "0.8" : "0")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: var(--color-charcoal);
  z-index: 1199;
`;

const SearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //flex-wrap: nowrap;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1200;
  height: 45px;
  margin: 5px;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  width: ${(p) => (p.isOpen ? "calc(100vw - 10px)" : "0")};
  max-width: 500px;
  opacity: ${(p) => (p.isOpen ? "1" : "0")};
  transition: width 300ms ease-in-out, opacity 300ms ease-in-out;

  border: 1px solid lightgray;
  background: white;
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.5);

  svg {
  }

  input {
    appearance: none; // TODO: does?
    //border: none;
    border: 1px solid whitesmoke;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
    outline: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    //overflow: hidden;
    height: 30px;
    width: 100%;
    margin: 0 1rem;
  }

  button {
    height: 30px;
    padding: 0 0.5rem;
    border-radius: 0.25rem;
    background: var(--color-charcoal);
    a {
      color: white;
    }
  }
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
