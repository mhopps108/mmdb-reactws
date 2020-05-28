import React, { useEffect, useState, useReducer } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Select from "react-select";
import styled, { css } from "styled-components/macro";
// import { RangeSlider, Slider } from "@blueprintjs/core";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";
// import "@blueprintjs/core/lib/css/blueprint.css";

import CheckButtonGroup from "./CheckButtonGroup";
import {
  genreOptions,
  certOptions,
  certSelectOptions,
  genreSelectOptions,
} from "../constants";
import {
  FilterMenuWrap,
  FilterMenuContentWrap,
  RangeSliderWrap,
  SectionHeader,
  CheckBoxesWrap,
  SliderWrap,
  FilterSection,
  ApplyButton,
  ApplyButtonWrap,
} from "../styled/FilterMenuStyled";

import { discoveryQueryString } from "../api";
import { SelectPicker, CheckPicker, RangeSlider, Slider } from "rsuite";
// import { SelectPicker, CheckPicker } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

const initFilterState = {
  orderby: "-imdb_rating_avg,-imdb_rating_count",
  genres: [],
  certs: [],
  ratings: [0, 10],
  votes: 0,
  years: [1890, 2030],
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

const FilterSelect = ({ name, options, isMulti = false }) => {
  return (
    <div style={{ fontSize: "16px", color: "#2162a4", marginBottom: "10px" }}>
      <Select
        // className="basic-single"
        // classNamePrefix="select"
        // defaultValue={""}
        // autoFocus={false}
        isMulti={isMulti}
        // blurInputOnSelect={true}
        isSearchable={false}
        // isLoading={isLoading}
        isClearable={true}
        // captureMenuScroll={true}
        closeMenuOnSelect={false}
        menuShouldBlockScroll={true}
        name={name}
        options={options}
      />
    </div>
  );
};

const RangeSliderStyled = styled.div`
  .rs-slider-handle {
    background: black;
    //width: 40px;
    //height: 40px;
    &::before {
      background: orange;
      width: 40px;
      height: 40px;
    }
  }
`;

const CustomRangeSlider = ({ value, setValue }) => {
  return (
    <RangeSliderStyled>
      <RangeSlider
        min={0}
        max={10}
        step={0.5}
        // defaultValue={[10, 50]}
        // className="custom-slider"
        value={value}
        // handleStyle={{
        //   color: "#333",
        //   background: "black",
        //   fontSize: 12,
        //   width: 32,
        //   height: 22,
        // }}
        // graduated
        // tooltip={false}
        // handleTitle={`${rangeValue[0]}-${rangeValue[1]}`}
        // handleTitle={"A"}
        onChange={(value) => setValue(value)}
      />
    </RangeSliderStyled>
  );
};

export default function FilterMenu({
  isOpen,
  toggleOpen,
  onApplyFilters,
  setQuery,
  filterState = null,
}) {
  console.log(`FILTER-MENU: rendered - isOpen (${isOpen})`);
  console.log("filterState--FILTERMENU: ", filterState);
  const initState = filterState || initFilterState;
  const [state, dispatch] = useReducer(filterReducer, initState);
  const [queryLink, setQueryLink] = useState("");

  const [sliderValue, setSliderValue] = useState(5);
  const [rangeValue, setRangeValue] = useState([5, 10]);

  const onReset = () => dispatch({ type: "FILTER_RESET" });

  const setCertsChecked = (checked) =>
    dispatch({ type: "SET_CERTS", payload: checked });

  const setGenresChecked = (checked) =>
    dispatch({ type: "SET_GENRES", payload: checked });

  const onRatingChange = (val) =>
    dispatch({ type: "SET_RATINGS", payload: val });

  const onMinVotesChange = (val) =>
    dispatch({ type: "SET_VOTES", payload: val });

  const onYearChange = (val) => dispatch({ type: "SET_YEARS", payload: val });

  // const onApplyFilters = () => setQuery(discoveryQueryString(state));
  const onClick = () => {
    const str = discoveryQueryString(state);
    onApplyFilters(str);
  };

  useEffect(() => {
    // console.dir(`filter_state`, state);
    // const queryString = discoveryQueryString(state);
    // console.log(`queryString = ${queryString}`);
    // setQuery(queryString);
  }, []);

  return (
    <FilterMenuWrap isOpen={isOpen}>
      <FilterMenuContentWrap isOpen={isOpen}>
        <ApplyButtonWrap>
          <ApplyButton onClick={onClick}>Apply Filters</ApplyButton>
        </ApplyButtonWrap>
        <FilterSection>
          <SelectPicker
            data={genreOptions.sort()}
            searchable={false}
            preventOverflow={true}
            size={"sm"}
            cleanable={false}
            // style={{ width: 224 }}
          />
          <CheckPicker
            sticky
            data={genreSelectOptions.sort()}
            onChange={(v) => console.log(v)}
            // style={{ width: 224 }}
          />
          <div style={{ width: "75%", margin: "30px 0px" }}>
            <CustomRangeSlider value={rangeValue} setValue={setRangeValue} />
          </div>
        </FilterSection>
        <FilterSection>
          <CheckButtonGroup
            sectionName="Age Rating"
            options={certOptions}
            checked={state.certs}
            setChecked={setCertsChecked}
          />
          <CheckButtonGroup
            sectionName="Genres"
            options={genreOptions.sort()}
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
              min={initFilterState.years[0]}
              max={initFilterState.years[1]}
              stepSize={1}
              labelStepSize={25}
              onChange={onYearChange}
              value={state.years}
            />
          </RangeSliderWrap>
        </FilterSection>
        <ApplyButtonWrap>
          <ApplyButton onClick={onClick}>Apply Filters</ApplyButton>
        </ApplyButtonWrap>
      </FilterMenuContentWrap>
    </FilterMenuWrap>
  );
}
