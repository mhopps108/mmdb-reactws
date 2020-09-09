import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
// import { device } from "../devices";

const NavDropdownWrap = styled.div``;

const DropdownButton = styled.button`
  font-size: 1.1rem;
  margin-right: 12px;
  padding: 2px 4px;
  background: transparent;
  //border: 1px solid red;
  color: white;
  z-index: 20;
  border-radius: 6px;
  cursor: pointer;

  :hover {
    //background: white;
    //color: #282c35;
    //font-size: larger;
    font-weight: bolder;
  }
`;

const Menu = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};

  position: absolute;
  display: flex;
  flex-direction: column;
  background: white;
  //min-width: 160px;
  padding: 8px 0;
  border: 1px solid lightgray;
  border-radius: 6px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  //transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(5%)"};
  transform: ${(props) => (props.isOpen ? "translateY(5%)" : "translateY(0)")};
  //transition: all 200ms ease;
  transition: all 300ms cubic-bezier(0, 1, 0.5, 1);  
`;

const MenuLink = styled.div`
  width: 100%;
  padding: 4px 8px;

  // TODO: selector not working, fix it
  :hover {
    color: red;
    background: whitesmoke;
  }

  & a {
    color: #282c35;
    text-decoration: none;
    font-size: 1rem;
    padding: 4px 12px;
  }
`;

export default function NavDropdown({ title, items }) {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const onOutsideClick = (e) => {
    if (ref.current.contains(e.target)) return;
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
      <DropdownButton
        onClick={toggleOpen}
        // onMouseLeave={() => setIsOpen(false)}
        // onMouseEnter={() => setIsOpen(true)}
      >
        {title}
      </DropdownButton>

      <Menu isOpen={isOpen}>
        {items.map(({ name, path, sort }) => (
          <MenuLink key={name} onClick={onChange}>
            <Link to={path}>{name}</Link>
          </MenuLink>
        ))}
      </Menu>
    </NavDropdownWrap>
  );
}
