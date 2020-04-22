import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled, { css } from "styled-components";
import { device } from "../devices";

const StyledDiscoveryMenu = styled.div`
  border: 4px solid #333;
  background: #2162a4;
  //color: white;

  max-height: calc(100vh - 55px);
  height: 400px;
  width: 100%;
  max-width: 1000px;

  //display: grid;
  //grid-gap: 10px;
  //grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  //justify-content: center;
  display: flex;
  flex-direction: column;

  padding: 20px 16px;
  position: fixed;

  top: 55px;
  //left: 0;
  //right: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  z-index: -10;
  transition: transform 0.3s ease-in-out;
  ${(props) =>
    props.isOpen
      ? css`
          //transform: translateY(-200%);
          z-index: 99;
          transform: translateY(0%);
        `
      : css`
          //transform: translateY(0%);
          transform: translateY(-100%);
        `}
`;

const CloseButton = styled.button`
  //position: relative;
  height: 20px;
  //top: 20px;
  //right: 20px;
`;

const GenreOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

const Checkbox = ({ name, label, checked = false, onChange }) => {
  // console.log("Checkbox: ", name, checked);
  return (
    <label key={name}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

const genreOptions = [
  { name: "adventure", label: "Adventure" },
  { name: "comedy", label: "Comedy" },
  { name: "action", label: "Action" },
  { name: "adventure2", label: "Adventure" },
  { name: "comedy2", label: "Comedy" },
  { name: "action2", label: "Action" },
  { name: "adventure3", label: "Adventure" },
  { name: "comedy3", label: "Comedy" },
  { name: "action3", label: "Action" },
];

export default function DiscoveryMenu({ isOpen, toggleOpen }) {
  console.log(`DISCOVER-MENU: rendered - isOpen (${isOpen})`);
  // const [checkedItems, setCheckedItems] = useState({});
  const [checkedItems, setCheckedItems] = useState([]);

  const selectAll = () => {
    setCheckedItems(genreOptions.map((item) => item.name));
  };

  const deselectAll = () => {
    setCheckedItems([]);
  };

  const handleChange = (event) => {
    const checkboxName = event.target.name;
    if (event.target.checked) {
      setCheckedItems([...checkedItems, checkboxName]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== checkboxName));
    }
  };

  useEffect(() => {
    console.log("checkedItems: ");
    console.log(checkedItems);
  }, [checkedItems]);

  return (
    <StyledDiscoveryMenu isOpen={isOpen}>
      <div>
        <CloseButton onClick={toggleOpen}>X</CloseButton>
        <div>Discovery Menu</div>
      </div>

      <GenreOptions>
        <p>Genres:</p>
        <Checkbox
          name={"selectAll"}
          label={"Select All"}
          // checked={checkedItems.includes(item.name)}
          onChange={selectAll}
        />
        <Checkbox
          name={"removeAll"}
          label={"Remove All"}
          // checked={checkedItems.includes(item.name)}
          onChange={deselectAll}
        />
        {genreOptions.map((item) => (
          <Checkbox
            name={item.name}
            label={item.label}
            checked={checkedItems.includes(item.name)}
            onChange={handleChange}
          />
        ))}
      </GenreOptions>
    </StyledDiscoveryMenu>
  );
}
