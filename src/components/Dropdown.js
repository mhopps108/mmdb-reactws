import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import {
  tmdbLinks,
  releaseDateLinks,
  releasesLinks,
  discoveryLinks,
} from "../constants/routes";

// https://csslayout.io/patterns/dropdown/

const NavDropdownWrap = styled.div``;

const DropdownButton = styled.button`
  font-size: 1.1rem;
  margin-right: 12px;
  padding: 2px 4px;
  background: transparent;
  //border: 1px solid red;
  color: orange;
  border: 1px solid red;
  //z-index: 20;
`;

const Menu = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};

  //position: absolute;
  position: fixed;
  // bottom: ${(props) => (props.isOpen ? "0" : "0")};
  // left: ${(props) => (props.isOpen ? "0" : "0")};
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  
  border: 2px solid red;
  background: white;
  //min-width: 160px;
  padding: 25px 0 8px;
  //border: 1px solid lightgray;
  border-radius: 6px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  //z-index: 11;
  //top: 70px;
  //height: 100%;
  min-height: 150px;
  max-height: 90vh;
  width: 100vw;
  max-width: 600px;

  transform: ${(props) =>
    props.isOpen ? "translateY(0%)" : "translateY(100%)"};
  transition: all 200ms ease;
`;

const MenuLink = styled.div`
  width: 100%;
  padding: 4px 8px;
  display: flex;

  &:hover {
    color: red;
    background: whitesmoke;
  }

  & a {
    color: #282c35;
    text-decoration: none;
    //margin-bottom: 8px;
    //line-height: 1.5;
    font-size: 1rem;
    padding: 4px 12px;
  }
`;

export default function Dropdown({ sortData }) {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const onOutsideClick = (e) => {
    if (ref.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  const onChange = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", onOutsideClick);
    } else {
      document.removeEventListener("mousedown", onOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [isOpen]);

  return (
    <NavDropdownWrap ref={ref}>
      <DropdownButton onClick={toggleOpen}>Sort</DropdownButton>
      <Menu isOpen={isOpen}>
        <p style={{ position: "fixed", top: "8px", left: "10px" }}>SortBy</p>
        {sortData.map(({ value, label }) => (
          <MenuLink>
            <Link to={"/"}>{label}</Link>
          </MenuLink>
        ))}
        {sortData.map(({ value, label }) => (
          <MenuLink>
            <Link to={"/"}>{label}</Link>
          </MenuLink>
        ))}
      </Menu>
    </NavDropdownWrap>
  );
}
