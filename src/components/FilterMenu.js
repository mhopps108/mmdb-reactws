import React, { useEffect, useState, useReducer } from "react";
import { RangeSlider, CheckButtonGroup } from "../components";
import { discoveryQueryString } from "../api";
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

const initFilterState = {
  sortby: "-rating,-votes",
  genres: [],
  certs: [],
  ratings: [0, 10],
  votes: [0, 10000],
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
  // const initState = initFilterState;
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
            <ApplyButton reset onClick={""}>
              Reset
            </ApplyButton>
            <ApplyButton onClick={onClick}>Apply</ApplyButton>
          </ApplyButtonWrap>
          <RangeSliderWrap>
            <SectionHeader>
              <p>Rating</p>
              <span>{`${state.ratings[0]} - ${state.ratings[1]}`}</span>
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
              <p>Votes</p>
              <span>{`${state.votes[0]} - ${state.votes[1]}`}</span>
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
              <p>Year</p>
              <span>{`${state.years[0]} - ${state.years[1]}`}</span>
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
          <ApplyButtonWrap>
            <ApplyButton reset onClick={""}>
              Reset
            </ApplyButton>
            <ApplyButton onClick={onClick}>Apply</ApplyButton>
          </ApplyButtonWrap>
        </FilterSection>
      </FilterMenuContentWrap>
    </FilterMenuWrap>
  );
}
