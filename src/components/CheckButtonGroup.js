import React from "react";
import styled from "styled-components/macro";
import {
  SectionTop,
  SectionHeader,
  SectionButton,
} from "../styled/DiscoverMenuStyled";

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledCheckButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCheckButton = styled.button`
  color: ${(props) => (props.checked ? "white" : "#2162a4")};
  background: ${(props) => (props.checked ? "#2162a4" : "white")};
  padding: 2px 6px;
  margin: 4px 4px;
  //padding: 4px 8px;
  //margin: 2px 4px;
  border-radius: 4px;
  border: 1px solid lightgray;
  font-size: 0.9rem;
`;

export default function CheckButtonGroup({
  sectionName,
  options,
  checked,
  setChecked,
}) {
  console.log("CheckButtonGroup: props");
  console.log("sectionName: ", sectionName);
  console.log("checked: ", checked);
  const toggleAll = () => {
    if (checked.length === 0) {
      setChecked(options.map((item) => item.name));
    } else {
      setChecked([]);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    if (checked.includes(name)) {
      setChecked(checked.filter((item) => item !== name));
    } else {
      setChecked([...checked, name]);
    }
  };
  return (
    <StyledCheckButtonGroup>
      <SectionTop>
        <SectionHeader>{sectionName}</SectionHeader>
        <SectionButton onClick={toggleAll}>
          {/*{checked.length === 0 ? "Select All" : "Clear"}*/}
          {checked ? "Select All" : "Clear"}
        </SectionButton>
      </SectionTop>
      <FlexContainer>
        {options.map(({ name, label }) => (
          <StyledCheckButton
            key={name}
            name={name}
            onClick={handleChange}
            checked={checked?.includes(name)}
            type="button"
          >
            {label}
          </StyledCheckButton>
          // <CheckButton
          //   key={name}
          //   name={name}
          //   label={label}
          //   onClick={handleChange}
          //   checked={checked.includes(name)}
          // />
        ))}
      </FlexContainer>
    </StyledCheckButtonGroup>
  );
}
