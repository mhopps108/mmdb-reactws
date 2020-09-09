import React, { useEffect, useState, useReducer, useRef } from "react";
import { RangeSlider, CheckButtonGroup } from "../components";
import { genreOptions, certOptions } from "../constants";
import {
  FilterMenuWrap,
  FilterMenuContentWrap,
  RangeSliderWrap,
  SectionHeader,
  FilterSection,
  ApplyButton,
  ApplyButtonWrap,
} from "../styled/FilterMenuStyled";
import { useLockBodyScroll, useOnClickOutside } from "../hooks";

const defaultFilters = {
  sortby: "rating",
  genres: [],
  certification: [],
  rating_min: 0.0,
  rating_max: 10.0,
  votes_min: 10000,
  year_min: 1890,
  year_max: 2030,
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_CERTS":
      return { ...state, certification: action.payload };
    case "SET_GENRES":
      return { ...state, genres: action.payload };
    case "SET_RATINGS":
      return {
        ...state,
        rating_min: action.payload[0],
        rating_max: action.payload[1],
      };
    case "SET_VOTES":
      return { ...state, votes_min: action.payload[1] };
    case "SET_YEARS":
      return {
        ...state,
        year_min: action.payload[0],
        year_max: action.payload[1],
      };
    case "FILTER_RESET":
      return { ...action.payload };
    case "FILTER_DEFAULTS":
      return { ...defaultFilters };
    default:
      throw new Error();
  }
};

export default function FilterMenu({
  isOpen,
  toggleOpen,
  onApplyFilters,
  filterState = null,
}) {
  // console.log(`FILTER-MENU: rendered - isOpen (${isOpen})`);
  // console.log("filterState--FILTERMENU: ", filterState);

  // const [setIsLocked] = useLockBodyScroll(isOpen);
  // const ref = useRef();
  // useOnClickOutside(ref, () => setIsOpen(false));

  // const initState = filterState || initFilterState;
  // const [state, dispatch] = useReducer(filterReducer, initState);
  const initState = { ...defaultFilters, ...filterState };
  const [state, dispatch] = useReducer(filterReducer, initState);

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
  // const onClick = () => {
  //   const str = discoveryQueryString(state);
  //   onApplyFilters(str, state);
  // };

  const onApply = () => {
    onApplyFilters(state);
    // setIsOpen(false);
    toggleOpen();
    // setIsLocked(false);
  };

  // useEffect(() => {
  //   setIsLocked(() => isOpen);
  // }, [isOpen, setIsLocked]);

  useEffect(() => {
    // console.dir(`filter_state`, state);
    // const queryString = discoveryQueryString(state);
    // console.log(`queryString = ${queryString}`);
    // setQuery(queryString);
  }, []);

  return (
    <FilterMenuWrap isOpen={isOpen}>
      {/*<ApplyButtonWrap>*/}
      {/*  <ApplyButton onClick={onClick}>Apply Filters</ApplyButton>*/}
      {/*</ApplyButtonWrap>*/}
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
            options={genreOptions.sort()}
            checked={state.genres}
            setChecked={setGenresChecked}
          />
        </FilterSection>
        <FilterSection>
          <ApplyButtonWrap>
            <ApplyButton
              reset
              onClick={() => console.warn("reset not implemented")}
            >
              Reset
            </ApplyButton>
            <ApplyButton onClick={onApply}>Apply</ApplyButton>
          </ApplyButtonWrap>
          <RangeSliderWrap>
            <SectionHeader>
              <p>Rating</p>
              <p>{`${state.rating_min} - ${state.rating_max}`}</p>
            </SectionHeader>
            <RangeSlider
              value={[state.rating_min, state.rating_max]}
              min={defaultFilters.rating_min}
              max={defaultFilters.rating_max}
              step={0.1}
              onChange={onRatingChange}
              onFinalChange={onRatingChange}
            />
          </RangeSliderWrap>
          <RangeSliderWrap>
            <SectionHeader>
              <p>Votes</p>
              <p>{`${0} - ${state.votes_min}`}</p>
            </SectionHeader>
            <RangeSlider
              value={[0, state.votes_min]}
              min={0}
              max={defaultFilters.votes_min}
              step={100}
              onChange={onMinVotesChange}
              onFinalChange={onMinVotesChange}
            />
          </RangeSliderWrap>
          <RangeSliderWrap>
            <SectionHeader>
              <p>Year</p>
              <p>{`${state.year_min} - ${state.year_max}`}</p>
            </SectionHeader>
            <RangeSlider
              value={[state.year_min, state.year_max]}
              min={defaultFilters.year_min}
              max={defaultFilters.year_max}
              step={1}
              onChange={onYearChange}
              onFinalChange={onYearChange}
            />
          </RangeSliderWrap>
          <ApplyButtonWrap>
            <ApplyButton
              reset
              onClick={() => console.warn("reset not implemented")}
            >
              Reset
            </ApplyButton>
            <ApplyButton onClick={onApply}>Apply</ApplyButton>
          </ApplyButtonWrap>
        </FilterSection>
      </FilterMenuContentWrap>
    </FilterMenuWrap>
  );
}
