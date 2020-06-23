import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { FaTimes, FaSortDown, FaSortUp } from "react-icons/fa";

export default function ActionMenu({
  isOpen,
  toggleOpen,
  sortData,
  sortValue,
  onOrderChange,
}) {
  const ref = useRef();

  const onClick = (value) => {
    onOrderChange(value);
    toggleOpen();
  };

  const onOutsideClick = useCallback(
    (e) => {
      if (ref.current.contains(e.target)) return; // inside click
      toggleOpen(); // outside click
    },
    [toggleOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", onOutsideClick);
    } else {
      document.removeEventListener("mousedown", onOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [isOpen, onOutsideClick]);

  // const s = [...sortData, ...sortData, ...sortData, ...sortData, ...sortData];

  return (
    <ActionMenuWrap isOpen={isOpen} ref={ref}>
      <MenuTitleWrap>
        <p>Sort By</p>
        <button onClick={toggleOpen}>
          <FaTimes />
        </button>
      </MenuTitleWrap>
      <Menu>
        {sortData.map(({ value, label }) => (
          <MenuItem key={label} active={value === sortValue}>
            <button onClick={() => onClick(value)}>
              <FaSortDown size={"1.3rem"} style={{ marginBottom: "8px" }} />
            </button>
            <p>{label}</p>
            <button onClick={() => onClick(value)}>
              <FaSortUp size={"1.3rem"} style={{ marginTop: "8px" }} />
            </button>
          </MenuItem>
        ))}
      </Menu>
    </ActionMenuWrap>
  );
}

const ActionMenuWrap = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};

  position: fixed;
  bottom: 0;
  //margin: 0.5rem;
  //margin-left: auto; // not working for centering
  //margin-right: auto;  // not working for centering
  width: calc(100vw - 1rem);
  max-width: 500px;
  max-height: calc(100vh - 65px);

  z-index: 1100;
  display: flex;
  flex-direction: column;

  background: whitesmoke;
  border: 2px solid lightgray;
  border-radius: 6px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transition: all 200ms ease;
  //transition: all 200ms cubic-bezier(0, 1, 0.5, 1);
  transform: ${(props) =>
    props.isOpen ? "translateY(0%)" : "translateY(100%)"};

  @media ${device.min.small} {
    right: 0;
  }

  @media ${device.min.desktop} {
    display: none;
  }
`;

const MenuTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;

  background: #282c35;
  border-bottom: 1px solid lightgray;
  padding: 5px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);

  p {
    font-size: 1rem;
    color: white;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    color: #282c35;
    background: white;
    border: 1px solid lightgray;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  height: 100%;
  //padding: 4px 2rem;
  //min-height: 150px;
  //max-height: 90vh;
  //min-width: 300px;
  //width: 100%;
  //max-width: 600px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  width: min-content;
  justify-content: center;
  margin: 0.5rem 0;

  button {
    background: ${(props) => (props.active ? "#282c35" : "white")};
    color: ${(props) => (props.active ? "whitesmoke" : "#282c35")};
    width: 35px;
    border: 1px solid lightgray;
    border-radius: 8px;
  }
  p {
    color: #282c35;
    height: 80%;
    min-width: 8rem;
    text-align: center;
    font-size: 1.3rem;
  }
`;
