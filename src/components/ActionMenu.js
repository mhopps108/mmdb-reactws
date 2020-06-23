import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";

export default function ActionMenu({
  isOpen,
  toggleOpen,
  sortData,
  sortValue,
  onOrderChange,
}) {
  const ref = useRef();

  // const onClick = (e, val) => {
  const onClick = (value) => {
    // console.log(`e: `, typeof e);
    // console.log(`e: `, e);
    // console.log(`e: `, e.target.value);
    console.log(`value: `, typeof value);
    console.log(`value: `, value);
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
          <div key={label}>
            <MenuItem active={value === sortValue}>
              <button onClick={() => onClick(value)}>
                <FaChevronDown
                  size={"1.1rem"}
                  style={{ verticalAlign: "middle" }}
                />
              </button>
              <p>{label}</p>
              <button onClick={() => onClick(value)}>
                <FaChevronUp
                  size={"1.1rem"}
                  style={{ verticalAlign: "middle" }}
                />
              </button>
            </MenuItem>
            <Separator />
          </div>
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
  margin: 5px;

  width: calc(100vw - 10px);
  max-width: 400px;

  max-height: calc(100vh - 65px);

  z-index: 1100;
  display: flex;
  flex-direction: column;

  background: white;
  //border: 2px solid lightgray;

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
  width: 100%;
  height: 35px;

  //border-bottom: 1px solid whitesmoke;
  padding: 0 5px;

  p {
    font-size: 1rem;
    //margin: 0 auto;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    //margin-right: 5px;

    border-radius: 50%;

    color: darkgray;
    background: whitesmoke;
    //border: 1px solid lightgray;
  }
`;

const Separator = styled.div`
  height: 1px;
  width: 100%;
  background: whitesmoke;
  margin: 8px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  height: 100%;
  //padding: 4px 2rem;
  //min-width: 300px;

  //min-height: 150px;
  //max-height: 90vh;
  //width: 100%;
  //max-width: 600px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  width: min-content;
  justify-content: center;

  button {
    height: 100%;
    width: 30px;
    background: ${(props) => (props.active ? "darkblue" : "whitesmoke")};
    color: ${(props) => (props.active ? "#fff" : "#333")};
    border: ${(props) =>
      props.active ? "1px solid #333" : "1px solid lightgray"};
    border-radius: 4px;
  }
  p {
    height: 80%;
    min-width: 8rem;
    text-align: center;
    font-size: 1.3rem;
  }
`;
