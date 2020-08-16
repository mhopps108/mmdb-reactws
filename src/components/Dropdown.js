import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";

// https://csslayout.io/patterns/dropdown/

const Wrap = styled.div`
  position: relative;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 2px 4px;
  background: none;
  border: 1px solid lightgray;
  border-radius: 4px;
  color: #33425b;
`;

const Menu = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};

  position: absolute;
  right: 0;
  top: 120%;
  //z-index: 200;
  min-width: 100px;
  width: max-content;

  display: flex;
  flex-direction: column;
  background: white;
  padding: 8px 0;
  border: 1px solid lightgray;
  border-radius: 6px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  // transform: ${(props) =>
    props.isOpen ? "translateY(5%)" : "translateY(0)"};
  //transition: all 200ms ease;
  transition: all 300ms cubic-bezier(0, 1, 0.5, 1);  
`;

const MenuItem = styled.div`
  padding: 8px 16px;

  &:hover {
    color: red;
    background: whitesmoke;
  }

  //& .nothing {
  //  color: #282c35;
  //  text-decoration: none;
  //margin-bottom: 8px;
  //line-height: 1.5;
  //font-size: 1rem;
  //padding: 4px 12px;
  //}
`;

const Arrow = styled.div`
  /* Position at the top right corner */
  position: absolute;
  right: 8px;
  top: -1px;

  /* Border */
  background-color: #fff;
  border-left: 1px solid lightgray;
  border-top: 1px solid lightgray;
  transform: translate(-50%, -50%) rotate(45deg);

  /* Size */
  height: 12px;
  width: 12px;
`;

export default function Dropdown({ sortData }) {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const onOutsideClick = (e) => {
    if (ref !== null && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
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
    // <Wrap ref={ref}>
    <Wrap>
      <Button onClick={toggleOpen}>Sort</Button>

      <Menu isOpen={isOpen} ref={ref}>
        <Arrow />
        {/*<p style={{ position: "fixed", top: "8px", left: "10px" }}>SortBy</p>*/}
        {/* TODO: render children here */}
        {sortData.map(({ value, label }) => (
          <MenuItem key={value} onClick={onChange}>
            <span>{label}</span>
          </MenuItem>
        ))}
      </Menu>
    </Wrap>
  );
}
