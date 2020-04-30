import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import { RangeSlider, Slider } from "@blueprintjs/core";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CenterContentWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const StyledDiscoveryMenu = styled.div`
  border: 2px solid #333;
  //background: #2162a4;
  max-height: calc(100vh - 55px);
  width: 100%;
  max-width: 600px;
  position: fixed;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 99;
  background: white;

  display: flex;
  flex-direction: column;
  padding: 20px 16px;

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

const FilterTitle = styled.h3`
  color: #2162a4;
  font-size: 1.3rem;
  font-weight: 700;
`;

const SectionHeader = styled.p`
  color: #2162a4;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 20px;
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
  color: ${(props) => (props.checked ? "white" : "#2162a4")};
  background: ${(props) => (props.checked ? "#2162a4" : "white")};
  padding: 4px 8px;
  margin: 2px 4px;
  border-radius: 4px;
  border: 1px solid lightgray;
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

/*--- RANGE SLIDER ---*/

const RangeSliderWrap = styled.div`
  background: white;

  & .bp3-slider-progress.bp3-intent-primary {
    background: #2162a4;
  }
`;

/*--- -------------- ---*/
/*--- DISCOVERY MENU ---*/
/*--- -------------- ---*/

export default function DiscoveryMenu({ isOpen, toggleOpen }) {
  // console.log(`DISCOVER-MENU: rendered - isOpen (${isOpen})`);
  const [checkedItems, setCheckedItems] = useState([]);
  const [certSelected, setCertSelected] = useState([]);
  const [ratingRange, setRatingRange] = useState([5, 10]);
  const [minVotes, setMinVotes] = useState(0);
  const [yearRange, setYearRange] = useState([1900, 2025]);

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

  const printOn = (val) => {
    // console.log(`slide-value: ${val[0]} - ${val[1]}`);
    console.log(`slide-value: ${val}`);
    // setRatingRange(val);
  };

  useEffect(() => {
    console.log("Selected Certs: ");
    console.log(certSelected);
    console.log("Selected Genres: ");
    console.log(checkedItems);
  }, [certSelected, checkedItems]);

  return (
    <CenterContentWrap>
      <StyledDiscoveryMenu isOpen={isOpen}>
        <FilterHeader>
          <SectionTop>
            <CloseButton onClick={toggleOpen}>X</CloseButton>
            <FilterTitle>Discovery Menu</FilterTitle>
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

        <RangeSliderWrap>
          <SectionHeader>IMDb Rating Average</SectionHeader>
          <RangeSlider
            min={0}
            max={10}
            stepSize={0.5}
            labelStepSize={1}
            onChange={printOn}
            onRelease={printOn}
            value={ratingRange}
          />
        </RangeSliderWrap>
        {/*<RangeSliderWrap>*/}
        <div>
          <SectionHeader>IMDb Rating Count</SectionHeader>
          <Slider
            min={0}
            max={5000}
            stepSize={100}
            labelStepSize={1000}
            onChange={printOn}
            onRelease={printOn}
            value={minVotes}
          />
        </div>
        {/*</RangeSliderWrap>*/}
        <RangeSliderWrap>
          <SectionHeader>Year</SectionHeader>
          <RangeSlider
            min={1900}
            max={2025}
            stepSize={1}
            labelStepSize={25}
            onChange={printOn}
            onRelease={printOn}
            value={yearRange}
          />
        </RangeSliderWrap>
      </StyledDiscoveryMenu>
    </CenterContentWrap>
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
