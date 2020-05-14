import React, { useEffect, useState, useReducer } from "react";
// import Select from "react-select";
// import styled, { css } from "styled-components/macro";
// import { device } from "../devices";
import { RangeSlider, Slider } from "@blueprintjs/core";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import CheckButtonGroup from "./CheckButtonGroup";
import { genreOptions, certOptions } from "../constants";

import {
  CenterContentWrap,
  StyledDiscoveryMenu,
  CloseButton,
  FilterHeader,
  SectionTop,
  FilterTitle,
  SectionHeader,
  SectionButton,
  RangeSliderWrap,
} from "../styled/DiscoverMenuStyled";

const initFilterState = {
  genres: [],
  certs: [],
  ratings: [],
  votes: 0,
  years: [1900, 2025],
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_APPLY":
      return {
        ...state,
        genres: action.payload.genres,
        certs: action.payload.certs,
        ratings: action.payload.ratings,
        votes: action.payload.votes,
        years: action.payload.years,
      };
    case "FILTER_RESET":
      return { ...initFilterState };
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

  const onRatingChange = (val) => setRatingRange(val);

  // const onMinVotesChange = (val) => setMinVotes(val);
  const onMinVotesChange = (event) => {
    setMinVotes(event.target.value);
    console.log("min-votes:");
    console.log(event.target.value);
    console.dir(event.target);
  };

  const onYearChange = (val) => setYearRange(val);

  const onApply = () => {
    const data = {
      certs: [...certsChecked],
      genres: [...genresChecked],
      ratings: [...ratingRange],
      votes: minVotes,
      years: [...yearRange],
    };
    dispatch({
      type: "FILTER_APPLY",
      payload: data,
    });
  };

  const onReset = () => {
    dispatch({ type: "FILTER_RESET" });
  };

  useEffect(() => {
    console.dir(`filter_state`, state);
  }, [state]);

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
            <div>
              <CloseButton onClick={onReset}>Reset</CloseButton>
              <CloseButton onClick={onApply}>Apply</CloseButton>
            </div>
          </SectionTop>
        </FilterHeader>

        <CheckButtonGroup
          sectionName="Age Rating"
          options={certOptions}
          checked={certsChecked}
          setChecked={setCertsChecked}
        />

        <CheckButtonGroup
          sectionName="Genres"
          options={genreOptions}
          checked={genresChecked}
          setChecked={setGenresChecked}
        />
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

        <div>
          <SectionHeader>IMDb Rating Count</SectionHeader>
          <input
            value={minVotes}
            onFocus={(e) => e.preventDefault()}
            name="minvotes"
            onChange={onMinVotesChange}
          />
          {/*<Slider*/}
          {/*  min={0}*/}
          {/*  max={5000}*/}
          {/*  stepSize={100}*/}
          {/*  labelStepSize={1000}*/}
          {/*  onChange={onMinVotesChange}*/}
          {/*  value={minVotes}*/}
          {/*/>*/}
        </div>

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
