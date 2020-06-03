import React, { useEffect, useState, useReducer } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import RangeSlider from "./RangeSlider";
import CheckButtonGroup from "./CheckButtonGroup";
import { discoveryQueryString } from "../api";
import Select from "react-select";
import { SelectPicker, CheckPicker } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
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

const initFilterState = {
  orderby: "-imdb_rating_avg,-imdb_rating_count",
  genres: [],
  certs: [],
  ratings: [0, 10],
  votes: [0, 10000],
  // votes: [0, 10],
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
      // return { ...state, votes: action.payload };
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

export default function FilterMenu({
  isOpen,
  toggleOpen,
  onApplyFilters,
  setQuery,
  filterState = null,
}) {
  console.log(`FILTER-MENU: rendered - isOpen (${isOpen})`);
  console.log("filterState--FILTERMENU: ", filterState);

  // const initState = filterState || initFilterState;
  const initState = initFilterState;
  const [state, dispatch] = useReducer(filterReducer, initState);
  const [queryLink, setQueryLink] = useState("");

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
        {/*<ApplyButtonWrap>*/}
        {/*  <ApplyButton onClick={onClick}>Apply Filters</ApplyButton>*/}
        {/*</ApplyButtonWrap>*/}
        {/*<FilterSection>*/}
        {/*  <SelectPicker*/}
        {/*    data={genreOptions.sort()}*/}
        {/*    searchable={false}*/}
        {/*    preventOverflow={true}*/}
        {/*    size={"sm"}*/}
        {/*    cleanable={false}*/}
        {/*    // style={{ width: 224 }}*/}
        {/*  />*/}
        {/*  <CheckPicker*/}
        {/*    sticky*/}
        {/*    data={genreSelectOptions.sort()}*/}
        {/*    onChange={(v) => console.log(v)}*/}
        {/*    // style={{ width: 224 }}*/}
        {/*  />*/}
        {/*</FilterSection>*/}
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
            <SectionHeader>
              Rating {`${state.ratings[0]} - ${state.ratings[1]}`}
            </SectionHeader>
            <RangeSlider
              value={state.ratings}
              min={initFilterState.ratings[0]}
              max={initFilterState.ratings[1]}
              step={0.1}
              onChange={onRatingChange}
              onFinalChange={onRatingChange}
            />
          </RangeSliderWrap>
          <RangeSliderWrap>
            <SectionHeader>
              Votes {`${state.votes[0]} - ${state.votes[1]}`}
              {/*Votes {`${state.votes}`}*/}
            </SectionHeader>
            <RangeSlider
              value={state.votes}
              min={initFilterState.votes[0]}
              max={initFilterState.votes[1]}
              step={100}
              onChange={onMinVotesChange}
              onFinalChange={onMinVotesChange}
            />
          </RangeSliderWrap>
          <RangeSliderWrap>
            <SectionHeader>
              Year {`${state.years[0]} - ${state.years[1]}`}
            </SectionHeader>
            <RangeSlider
              value={state.years}
              min={initFilterState.years[0]}
              max={initFilterState.years[1]}
              step={1}
              onChange={onYearChange}
              onFinalChange={onYearChange}
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
