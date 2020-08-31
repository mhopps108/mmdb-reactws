import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";

// https://csslayout.io/patterns/dropdown/

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

// const Button = styled.button`
//   font-size: 1rem;
//   padding: 0.5rem 1rem;
//   background: none;
//   color: #33425b;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//
//   //border: 1px solid lightgray;
//   //border-radius: 0.5rem;
//
//   svg {
//     margin-left: 0.5rem;
//   }
// `;

const Button = styled.button`
  font-size: 1rem;
  padding: 6px 12px;
  background: none;
  color: #33425b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //text-transform: uppercase;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border: none;
  //border-radius: 90px; // basically 50%

  //border-radius: 0.5rem;
  border-radius: 0.25rem;

  transition: box-shadow 0.4s ease;

  :hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  svg {
    margin-left: 0.5rem;
  }
`;

const StackedText = styled.div`
  display: flex;
  flex-direction: column;
  height: 30px;

  .top {
    height: 10px;
    font-size: 10px;
    //margin-right: auto;
    margin-left: auto;
    color: #777;
  }
  .bottom {
    height: 20px;
    font-size: 14px;
    color: #33425b;
  }
`;

const Title = styled.p`
  font-size: 0.85rem;
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};

  position: absolute;
  right: 0;
  top: 120%;
  min-width: 100px;
  width: max-content;

  display: flex;
  flex-direction: column;
  background: white;
  padding: 0.5rem 0;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  // transform: ${(props) =>
    props.isOpen ? "translateY(5%)" : "translateY(0)"};
  transition: opacity 300ms cubic-bezier(0, 1, 0.5, 1),
    visibility 250ms cubic-bezier(0, 1, 0.5, 1);
`;

const MenuItem = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;

  &:hover {
    color: red;
    background: whitesmoke;
  }
`;

const Arrow = styled.div`
  /* Position at the top right corner */
  position: absolute;
  right: 0;
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

export default function Dropdown({ title, selected, items, onSelect, icon }) {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const onOutsideClick = (e) => {
    if (ref !== null && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const onChange = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  const getSelected = () => {
    // let item = items && items.find((item) => item.value === selected);
    // if (!item) {
    //   item = items && items.find((item) => item.label === selected);
    // }
    const item =
      items &&
      items.find(({ value, label }) => {
        if ([value, label].includes(selected)) {
          return { value, label };
        }
        return null;
      });
    return item ? item.label : title;
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
    <Wrap ref={ref}>
      {/*<StackedText>*/}
      {/*  <div className={"top"}>{title}</div>*/}
      {/*  <div className={"bottom"}>{getSelected()}</div>*/}
      {/*</StackedText>*/}
      {/*<div className={"bottom"}>{getSelected()}</div>*/}
      <Button onClick={toggleOpen}>
        {getSelected()}
        {icon}
      </Button>

      <Menu isOpen={isOpen}>
        <Arrow />
        {/* TODO: render children here? */}
        <Title>{title}</Title>
        {items &&
          items.map(({ value, label }) => (
            <MenuItem key={value} onClick={() => onChange(value)}>
              <span>{label}</span>
            </MenuItem>
          ))}
      </Menu>
    </Wrap>
  );
}
