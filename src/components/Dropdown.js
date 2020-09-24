import React, { useState, useRef } from "react";
import styled from "styled-components/macro";
import { useOnClickOutside } from "../hooks";
import { BsArrowDownShort, BsArrowDown } from "react-icons/bs";

// https://csslayout.io/patterns/dropdown/

export default function Dropdown({
  title,
  selected,
  items,
  onSelect,
  icon = null,
}) {
  console.log("Dropdown: selected: ", selected);
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  useOnClickOutside(ref, () => setIsOpen(false));

  const onChange = ({ value, label }) => {
    console.log(`Dropdown: onChange(value): ${value} - ${label}`);
    onSelect({ value, label });
    setIsOpen(false);
  };

  const getSelected = () => {
    const item =
      items &&
      items.find(({ value, label }) => {
        // console.log(`Dropdown: find: val: ${value} & label: ${label}`);
        if ([value, label].includes(selected)) {
          return { value, label };
        }
        return null;
      });
    return item ? item.label : title;
  };

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
        {/*<Arrow />*/}
        <Title>{title}</Title>
        {items &&
          items.map(({ value, label }) => (
            <MenuItem key={value} onClick={() => onChange({ value, label })}>
              <span>{label}</span>
              {selected === label && <span>{<BsArrowDown />}</span>}
            </MenuItem>
          ))}
      </Menu>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

// TODO: use toolbar 'Button' styled component
const Button = styled.button`
  text-transform: capitalize;
  padding: 4px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  //box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 0.25rem;

  transition: box-shadow 0.4s ease;

  :hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  svg {
    margin-left: 0.25rem;
  }
`;

const Title = styled.p`
  font-size: 0.85rem;
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
`;

const Menu = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};

  position: absolute;
  right: 0;
  //top: 120%; // with arrow
  top: 50%;
  min-width: 120px;
  width: max-content;

  display: flex;
  flex-direction: column;
  background: white;
  padding: 0.5rem 0;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transform: ${(props) => (props.isOpen ? "translateY(10%)" : "translateY(0)")};
  transition: opacity 300ms cubic-bezier(0, 1, 0.5, 1),
    transform 300ms cubic-bezier(0, 1, 0.5, 1),
    visibility 250ms cubic-bezier(0, 1, 0.5, 1);

  text-transform: capitalize;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  //font-size: 0.9rem;

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
