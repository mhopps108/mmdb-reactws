import React, { useEffect, useState, useReducer } from "react";
// import Select from "react-select";
// import styled, { css } from "styled-components/macro";
// import { device } from "../devices";
import { RangeSlider, Slider } from "@blueprintjs/core";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import {
  FlexContainer,
  CenterContentWrap,
  StyledDiscoveryMenu,
  CloseButton,
  FilterHeader,
  GenreOptions,
  SectionTop,
  FilterTitle,
  SectionHeader,
  SectionButton,
  StyledCheckButton,
  RangeSliderWrap,
} from "../styled/DiscoverMenuStyled";

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

const initFilterState = {
  genres: [],
  certs: [],
  ratings: [],
  votes: 0,
  years: [],
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "APPLY":
      return {
        ...state,
        genres: action.payload.genres,
        certs: action.payload.certs,
        ratings: action.payload.ratings,
        votes: action.payload.votes,
        years: action.payload.years,
      };
    case "RESET":
      return { ...initFilterState };
    case "SET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    default:
      throw new Error();
  }
};

export default function DiscoveryMenu({ isOpen, toggleOpen }) {
  // console.log(`DISCOVER-MENU: rendered - isOpen (${isOpen})`);
  const [certsChecked, setCertsChecked] = useState([]);
  const [genresChecked, setGenresChecked] = useState([]);

  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [minVotes, setMinVotes] = useState(0);
  const [yearRange, setYearRange] = useState([1900, 2025]);

  const [state, dispatch] = useReducer(filterReducer, initFilterState);

  const toggleAllCerts = () => {
    if (certsChecked.length === 0) {
      setCertsChecked(certOptions.map((item) => item.name));
    } else {
      setCertsChecked([]);
    }
  };

  const handleCertChange = (event) => {
    const btnName = event.target.name;
    if (certsChecked.includes(btnName)) {
      setCertsChecked(certsChecked.filter((item) => item !== btnName));
    } else {
      setCertsChecked([...certsChecked, btnName]);
    }
  };

  const toggleAllGenres = () => {
    if (genresChecked.length === 0) {
      setGenresChecked(genreOptions.map((item) => item.name));
    } else {
      setGenresChecked([]);
    }
  };

  const toggleGenre = (event) => {
    const btnName = event.target.name;
    if (genresChecked.includes(btnName)) {
      setGenresChecked(genresChecked.filter((item) => item !== btnName));
    } else {
      setGenresChecked([...genresChecked, btnName]);
    }
  };

  const onRatingChange = (val) => {
    setRatingRange(val);
    console.log(`rating: ${val}`);
  };

  const onMinVotesChange = (val) => {
    setMinVotes(val);
    console.log(`votes: ${val}`);
  };

  const onYearChange = (val) => {
    setYearRange(val);
    console.log(`year: ${val}`);
  };

  useEffect(() => {
    console.log("Selected Certs: ");
    console.log(certsChecked);
    console.log("Selected Genres: ");
    console.log(genresChecked);
  }, [certsChecked, genresChecked]);

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
        {/*Certs--START*/}
        <GenreOptions>
          <SectionTop>
            <SectionHeader>Age Rating</SectionHeader>
            <SectionButton onClick={toggleAllCerts}>
              {certsChecked.length === 0 ? "Select All" : "Clear"}
            </SectionButton>
          </SectionTop>
          <FlexContainer>
            {certOptions.map(({ name, label }) => (
              <CheckButton
                key={name}
                name={name}
                label={label}
                onClick={handleCertChange}
                checked={certsChecked.includes(name)}
              />
            ))}
          </FlexContainer>
        </GenreOptions>
        {/*Genres--START*/}
        <GenreOptions>
          <SectionTop>
            <SectionHeader>Genres</SectionHeader>
            <SectionButton onClick={toggleAllGenres}>
              {genresChecked.length === 0 ? "Select All" : "Clear"}
            </SectionButton>
          </SectionTop>
          <FlexContainer>
            {genreOptions.map(({ name, label }) => (
              <CheckButton
                key={name}
                name={name}
                label={label}
                onClick={toggleGenre}
                checked={genresChecked.includes(name)}
              />
            ))}
          </FlexContainer>
        </GenreOptions>
        {/*Rating--START*/}
        <RangeSliderWrap>
          <SectionHeader>IMDb Rating Average</SectionHeader>
          <RangeSlider
            min={0}
            max={10}
            stepSize={0.5}
            labelStepSize={1}
            onChange={onRatingChange}
            value={ratingRange}
          />
        </RangeSliderWrap>
        {/*RatingCount--START*/}
        <div>
          <SectionHeader>IMDb Rating Count</SectionHeader>
          <Slider
            min={0}
            max={5000}
            stepSize={100}
            labelStepSize={1000}
            onChange={onMinVotesChange}
            value={minVotes}
          />
        </div>
        {/*Year--START*/}
        <RangeSliderWrap>
          <SectionHeader>Year</SectionHeader>
          <RangeSlider
            min={1900}
            max={2025}
            stepSize={1}
            labelStepSize={25}
            onChange={onYearChange}
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
