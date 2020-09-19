import React from "react";
import styled from "styled-components/macro";
import { RiCloseLine } from "react-icons/ri";

// TODO: adding first value to an empty genres or certifications adds 'undefinded' to array

export default function CheckButtonGroup({
  sectionName,
  options,
  checked,
  setChecked,
}) {
  console.log(`CheckButtonGroup: checked - ${sectionName}`, checked);

  const onClear = () => {
    setChecked([]);
  };

  const handleChange = (event) => {
    const name = event.target.name;

    const selected =
      checked && Array.isArray(checked) ? [...checked] : [checked];
    if (selected.includes(name)) {
      setChecked(selected.filter((item) => item !== name));
    } else {
      if (selected) {
        setChecked([...selected, name]);
      } else {
        setChecked([name]);
      }

      // if (!Array.isArray(checked)) {
      //   setChecked([checked, name]);
      // } else {
      //   setChecked([...checked, name]);
      // }
    }
  };

  // const handleChange = (event) => {
  //   const selected = Array.isArray(checked) ? [...checked] : [checked];
  //   const name = event.target.name;
  //   if (checked.includes(name)) {
  //     setChecked(checked.filter((item) => item !== name));
  //   } else {
  //     if (!Array.isArray(checked)) {
  //       setChecked([checked, name]);
  //     } else {
  //       setChecked([...checked, name]);
  //     }
  //   }
  // };

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
        {checked && checked.length !== 0 && (
          <button onClick={onClear}>Clear</button>
        )}
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
  margin: 0.5rem 0 0.5rem;

  & p {
    //font-size: 1.1rem;
    font-weight: 500;
    //margin: 0;
  }

  & button {
    border: 1px solid lightgray;
    background: white;
    padding: 2px 6px;
    border-radius: 0.25rem;
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
  min-width: 28px;
  padding: 2px 6px;
  margin: 3px;
  border-radius: 0.25rem;
  border: 1px solid lightgray;
  //font-size: 1rem;
`;
