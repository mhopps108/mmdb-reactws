import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";

const FakeSlider = styled.div`
  height: 2px;
  width: 100%;
  border: 1px solid white;
  margin: 30px 0px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledDiscoveryMenu = styled.div`
  border: 2px solid #333;
  background: #2162a4;
  max-height: calc(100vh - 55px);
  width: 100%;
  max-width: 600px;
  //display: grid;
  //grid-gap: 10px;
  //grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  //justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  position: fixed;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 99;
  transform: translateY(0%);

  //z-index: -10;
  transition: transform 0.3s ease-in-out;
  ${(props) =>
    props.isOpen
      ? css`
          //z-index: 99;
          //transform: translateY(0%);
        `
      : css`
          //transform: translateY(100%);
        `}
`;

const CloseButton = styled.button`
  //position: relative;
  height: 20px;
  //top: 20px;
  //right: 20px;
`;

/*--- PARTS ---*/

const FilterHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #222;
  padding: 10px -15px;
  margin-bottom: 10px;
`;

const GenreOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

/*--- SECTION ---*/

const SectionTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;
`;

const SectionHeader = styled.p`
  color: lightgray;
  font-size: 1rem;
`;

const SectionButton = styled.button`
  border: 1px lightgray;
  background: white;
  color: #2162a4;
  padding: 2px 4px;
  border-radius: 4px;
`;

/*--- CHECKBOX ---*/

const StyledCheckButton = styled.button`
  color: ${(props) => (props.checked ? "#2162a4" : "#2162a4")};
  background: ${(props) => (props.checked ? "lightgray" : "white")};
  padding: 4px 8px;
  margin: 2px 4px;
  border-radius: 4px;
  //&:active {
  //  text-decoration: none;
  //}
`;

const CheckButton = ({ name, label, onClick, checked = false }) => {
  return (
    <StyledCheckButton
      name={name}
      onClick={onClick}
      checked={checked}
      type="button"
    >
      {label}
    </StyledCheckButton>
  );
};

export default function DiscoveryMenu({ isOpen, toggleOpen }) {
  console.log(`DISCOVER-MENU: rendered - isOpen (${isOpen})`);
  const [checkedItems, setCheckedItems] = useState([]);
  const [certSelected, setCertSelected] = useState([]);

  const toggleSelectCert = () => {
    if (certSelected.length === 0) {
      setCertSelected(certOptions.map((item) => item.name));
    } else {
      setCertSelected([]);
    }
  };

  const handleCertChange = (event) => {
    const btnName = event.target.name;
    if (certSelected.includes(btnName)) {
      setCertSelected(certSelected.filter((item) => item !== btnName));
    } else {
      setCertSelected([...certSelected, btnName]);
    }
  };

  const toggleSelectGenres = () => {
    if (checkedItems.length === 0) {
      setCheckedItems(genreOptions.map((item) => item.name));
    } else {
      setCheckedItems([]);
    }
  };

  const handleChange = (event) => {
    console.log("button clicked");
    console.log(event);
    console.log(event.target.name);
    const btnName = event.target.name;
    if (checkedItems.includes(btnName)) {
      setCheckedItems(checkedItems.filter((item) => item !== btnName));
    } else {
      setCheckedItems([...checkedItems, btnName]);
    }
  };

  useEffect(() => {
    console.log("Selected Certs: ");
    console.log(certSelected);
    console.log("Selected Genres: ");
    console.log(checkedItems);
  }, [certSelected, checkedItems]);

  return (
    <Wrap>
      <StyledDiscoveryMenu isOpen={isOpen}>
        <FilterHeader>
          <SectionTop>
            <CloseButton onClick={toggleOpen}>X</CloseButton>
            <SectionHeader>Discovery Menu</SectionHeader>
            <CloseButton onClick={toggleOpen}>X</CloseButton>
          </SectionTop>
        </FilterHeader>

        <GenreOptions>
          <SectionTop>
            <SectionHeader>Genres</SectionHeader>
            <SectionButton onClick={toggleSelectCert}>
              {certSelected.length === 0 ? "Select All" : "Clear"}
            </SectionButton>
          </SectionTop>
          <FlexContainer>
            {certOptions.map((item) => (
              <CheckButton
                key={item.name}
                name={item.name}
                label={item.label}
                onClick={handleCertChange}
                checked={certSelected.includes(item.name)}
              />
            ))}
          </FlexContainer>
        </GenreOptions>
        <GenreOptions>
          <SectionTop>
            <SectionHeader>Genres</SectionHeader>
            <SectionButton onClick={toggleSelectGenres}>
              {checkedItems.length === 0 ? "Select All" : "Clear"}
            </SectionButton>
          </SectionTop>
          <FlexContainer>
            {genreOptions.map((item) => (
              <CheckButton
                key={item.name}
                name={item.name}
                label={item.label}
                onClick={handleChange}
                checked={checkedItems.includes(item.name)}
              />
            ))}
          </FlexContainer>
        </GenreOptions>
        <FakeSlider />
        <FakeSlider />
        <FakeSlider />
      </StyledDiscoveryMenu>
    </Wrap>
  );
}

const genreOptions = [
  { name: "sport", label: "Sport" },
  { name: "comedy", label: "Comedy" },
  { name: "western", label: "Western" },
  { name: "adult", label: "Adult" },
  { name: "film-noir", label: "Film-Noir" },
  { name: "fantasy", label: "Fantasy" },
  { name: "romance", label: "Romance" },
  { name: "music", label: "Music" },
  { name: "thriller", label: "Thriller" },
  { name: "crime", label: "Crime" },

  { name: "adventure", label: "Adventure" },
  { name: "game-show", label: "Game-Show" },
  { name: "mystery", label: "Mystery" },
  { name: "short", label: "Short" },
  { name: "musical", label: "Musical" },
  { name: "action", label: "Action" },
  { name: "biography", label: "Biography" },
  { name: "history", label: "History" },
  { name: "news", label: "News" },
  { name: "horror", label: "Horror" },

  { name: "war", label: "War" },
  { name: "reality-tv", label: "Reality-TV" },
  { name: "talk-Show", label: "Talk-Show" },
  { name: "drama", label: "Drama" },
  { name: "family", label: "Family" },
  { name: "animation", label: "Animation" },
  { name: "documentary", label: "Documentary" },
  { name: "sci-fi", label: "Sci-Fi" },
];

const certOptions = [
  { name: "g", label: "G" },
  { name: "pg", label: "PG" },
  { name: "pg-13", label: "PG-13" },
  { name: "r", label: "R" },
  { name: "unrated", label: "Unrated" },
];
