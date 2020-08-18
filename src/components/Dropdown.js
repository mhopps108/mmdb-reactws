import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";

// https://csslayout.io/patterns/dropdown/

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 2px 4px;
  background: none;
  color: #33425b;

  svg {
    margin-left: 6px;
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
  padding: 8px 0;
  border: 1px solid lightgray;
  border-radius: 6px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  // transform: ${(props) =>
    props.isOpen ? "translateY(5%)" : "translateY(0)"};  
  transition: all 300ms cubic-bezier(0, 1, 0.5, 1);  
`;

const MenuItem = styled.div`
  padding: 8px 16px;
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
    const item = items && items.find((item) => item.value === selected);
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
      <StackedText>
        <div className={"top"}>{title}</div>
        <div className={"bottom"}>{getSelected()}</div>
      </StackedText>
      <Button onClick={toggleOpen}>{icon}</Button>

      <Menu isOpen={isOpen}>
        <Arrow />
        {/* TODO: render children here? */}
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
