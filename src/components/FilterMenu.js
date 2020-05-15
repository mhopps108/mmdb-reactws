import React, { useEffect, useState, useReducer } from "react";
// import Select from "react-select";
import { RangeSlider, Slider } from "@blueprintjs/core";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import CheckButtonGroup from "./CheckButtonGroup";
import { genreOptions, certOptions } from "../constants";
import {
  FilterMenuWrap,
  FilterMenuContentWrap,
  RangeSliderWrap,
  SectionHeader,
  CheckBoxesWrap,
  SliderWrap,
  FilterSection,
} from "../styled/FilterMenuStyled";

const initFilterState = {
  genres: [],
  certs: [],
  ratings: [0, 10],
  votes: 0,
  years: [1900, 2025],
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_CERTS":
      return { ...state, certs: action.payload };
    case "SET_GENRES":
      return { ...state, genres: action.payload };
    case "SET_RATINGS":
      return { ...state, ratings: action.payload };
    case "SET_VOTES":
      return { ...state, votes: action.payload };
    case "SET_YEARS":
      return { ...state, years: action.payload };
    case "FILTER_RESET":
      return { ...initFilterState };
    default:
      throw new Error();
  }
};

export default function FilterMenu({ isOpen, toggleOpen }) {
  console.log(`FILTER-MENU: rendered - isOpen (${isOpen})`);
  const [state, dispatch] = useReducer(filterReducer, initFilterState);

  const onReset = () => dispatch({ type: "FILTER_RESET" });

  const setCertsChecked = (checked) => {
    dispatch({ type: "SET_CERTS", payload: checked });
  };

  const setGenresChecked = (checked) => {
    dispatch({ type: "SET_GENRES", payload: checked });
  };

  const onRatingChange = (val) => {
    dispatch({ type: "SET_RATINGS", payload: val });
  };

  const onMinVotesChange = (val) => {
    dispatch({ type: "SET_VOTES", payload: val });
  };

  const onYearChange = (val) => {
    dispatch({ type: "SET_YEARS", payload: val });
  };

  useEffect(() => {
    console.dir(`filter_state`, state);
  }, [state]);

  return (
    <FilterMenuWrap isOpen={isOpen}>
      <FilterMenuContentWrap isOpen={isOpen}>
        <FilterSection>
          <CheckButtonGroup
            sectionName="Age Rating"
            options={certOptions}
            checked={state.certs}
            setChecked={setCertsChecked}
          />
          <CheckButtonGroup
            sectionName="Genres"
            options={genreOptions}
            checked={state.genres}
            setChecked={setGenresChecked}
          />
        </FilterSection>
        <FilterSection>
          <RangeSliderWrap>
            <SectionHeader>IMDb Rating Average</SectionHeader>
            <RangeSlider
              min={0}
              max={10}
              stepSize={0.5}
              labelStepSize={1}
              onChange={onRatingChange}
              value={state.ratings}
            />
          </RangeSliderWrap>
          <RangeSliderWrap>
            <SectionHeader>IMDb Rating Count</SectionHeader>
            <Slider
              min={0}
              max={5000}
              // stepSize={100}
              labelStepSize={1000}
              onChange={onMinVotesChange}
              value={state.votes}
            />
          </RangeSliderWrap>
          <RangeSliderWrap>
            <SectionHeader>Year</SectionHeader>
            <RangeSlider
              min={1900}
              max={2025}
              stepSize={1}
              labelStepSize={25}
              onChange={onYearChange}
              value={state.years}
            />
          </RangeSliderWrap>
        </FilterSection>
      </FilterMenuContentWrap>
    </FilterMenuWrap>
  );
}
