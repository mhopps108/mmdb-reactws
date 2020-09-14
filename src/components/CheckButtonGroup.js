import React from "react";
import styled from "styled-components/macro";

export default function CheckButtonGroup({
  sectionName,
  options,
  checked,
  setChecked,
}) {
  // console.log("CheckButtonGroup: sectionName: ", sectionName);
  // console.log("CheckButtonGroup: checked: ", checked);
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
      if (!Array.isArray(checked)) {
        setChecked([checked, name]);
      } else {
        setChecked([...checked, name]);
      }
    }
  };
  return (
    <StyledCheckButtonGroup>
      {/*<SectionTop>*/}
      {/*  <SectionHeader>{sectionName}</SectionHeader>*/}
      {/*  <SectionButton onClick={toggleAll}>*/}
      {/*{checked.length === 0 ? "Select All" : "Clear"}*/}
      {/*{checked ? "Select All" : "Clear"}*/}
      {/*</SectionButton>*/}
      {/*</SectionTop>*/}
      <SectionHeader>
        <p>{sectionName}</p>
        <button onClick={toggleAll}>{checked ? "Select All" : "Clear"}</button>
      </SectionHeader>
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
        ))}
      </FlexContainer>
    </StyledCheckButtonGroup>
  );
}

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 0.5rem;

  & p {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
  }

  & button {
    border: 1px solid lightgray;
    background: white;
    padding: 2px 4px;
    border-radius: 4px;
  }
`;

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
  color: ${(props) => (props.checked ? "white" : "var(--color-charcoal)")};
  background: ${(props) => (props.checked ? "var(--color-charcoal)" : "white")};
  padding: 2px 6px;
  margin: 4px 4px;
  border-radius: 4px;
  border: 1px solid lightgray;
  font-size: 1rem;
`;
