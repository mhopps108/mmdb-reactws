import React, { useState, useReducer, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { RangeSlider } from "../components";
import { useLockBodyScroll, useOnClickOutside } from "../hooks";
import {
  genreOptions,
  certOptions,
  genreSelectOptions,
  certSelectOptions,
} from "../constants";
import Select from "react-select";

const defaultFilters = {
  sortby: "rating",
  genres: [],
  certification: [],
  rating_min: 0.0,
  rating_max: 10.0,
  votes_min: 100000,
  year_min: 1890,
  year_max: 2025, // TODO: new Date() -> year + 5?
  // y: new Date().getFullYear() + 5,
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
      return { ...state, votes_min: action.payload };
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
  setIsOpen,
  filterState,
  onApplyFilters,
}) {
  // console.log("FilterMenuMain: isOpen: ", isOpen);
  // console.log("FilterMenu: defaultFilters: ", defaultFilters);
  // const [setIsLocked] = useLockBodyScroll(isOpen);
  const ref = useRef();
  // useOnClickOutside(ref, () => setIsOpen(false));

  const initState = { ...defaultFilters, ...filterState };
  console.info("FilterMenu: initState: ", initState);
  const [state, dispatch] = useReducer(filterReducer, initState);

  const onReset = (state) => dispatch({ type: "FILTER_RESET", payload: state });

  const onRatingChange = (values) =>
    dispatch({ type: "SET_RATINGS", payload: values });

  const onMinVotesChange = (val) =>
    dispatch({ type: "SET_VOTES", payload: val });

  const onYearChange = (val) => dispatch({ type: "SET_YEARS", payload: val });

  // TODO: pass state if it mutates somewhere before being applied?
  // const onApply = (state) => {
  const onApply = () => {
    console.log("FilterMenu: state onApply(): ", state);
    // const initState = { ...defaultFilters, ...filterState };
    onApplyFilters(state);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log("FilterMenuSelect: state ", state);
  }, [state]);

  useEffect(() => {
    onReset(filterState);
  }, [isOpen, filterState]);

  // useEffect(() => {
  //   setIsLocked(isOpen);
  // }, [isOpen, setIsLocked]);

  const onGenreChange = (value, action) => {
    const selected = value ? value.map((item) => item.value) : [];
    dispatch({ type: "SET_GENRES", payload: selected.sort() });
  };

  const onCertChange = (value, action) => {
    const selected = value.map((item) => item.value);
    dispatch({ type: "SET_CERTS", payload: selected.sort() });
  };

  const getSelectObjs = (selected, options) => {
    // console.log("getSelectDefaults: selected: ", selected);
    if (!selected) return [];
    const selectedList = Array.isArray(selected) ? [...selected] : [selected];
    const found = selectedList.map((value) =>
      options.find((item) => item.value === value)
    );
    // console.log("FoundDefaults: found: ", found);
    return found;
  };

  return (
    <Menu ref={ref} isOpen={isOpen}>
      <FilterWrap isOpen={isOpen}>
        <SectionWrap>
          <SectionHeader>
            <p>Genres</p>
          </SectionHeader>
          <Select
            isMulti
            options={genreSelectOptions}
            value={getSelectObjs(state.genres, genreSelectOptions)}
            onChange={onGenreChange}
            // isSearchable={false}
            maxMenuHeight={250} // default=300
            name={"genreSelectName"} // needed?
            // minMenuHeight={} // default=140
            // menuShouldBlockScroll={} // default=false
            // placeholder={}
            closeMenuOnSelect={false}
          />
        </SectionWrap>
        <SectionWrap>
          <SectionHeader>
            <p>Age Rating</p>
          </SectionHeader>
          <Select
            isMulti
            options={certSelectOptions}
            value={getSelectObjs(state.certification, certSelectOptions)}
            onChange={onCertChange}
            isSearchable={false}
            maxMenuHeight={250} // default=300
            name={"certSelectName"} // needed?
          />
        </SectionWrap>
        <SectionWrap>
          <SectionHeader>
            <p>Rating</p>
            <span>
              {`${Number.parseFloat(state.rating_min).toPrecision(2)} - 
              ${Number.parseFloat(state.rating_max).toPrecision(2)}`}
            </span>
          </SectionHeader>
          <RangeSlider
            value={[state.rating_min, state.rating_max]}
            min={defaultFilters.rating_min}
            max={defaultFilters.rating_max}
            step={0.1}
            onChange={onRatingChange}
            onFinalChange={onRatingChange}
          />
        </SectionWrap>
        <SectionWrap>
          <SectionHeader>
            <p>Votes</p>
            <span>{state.votes_min.toLocaleString()}</span>
          </SectionHeader>
          <RangeSlider
            value={[state.votes_min]}
            min={0}
            max={defaultFilters.votes_min}
            step={1000}
            onChange={onMinVotesChange}
            onFinalChange={onMinVotesChange}
          />
        </SectionWrap>
        <SectionWrap>
          <SectionHeader>
            <p>Year</p>
            <span>{`${state.year_min} - ${state.year_max}`}</span>
          </SectionHeader>
          <RangeSlider
            value={[state.year_min, state.year_max]}
            min={defaultFilters.year_min}
            max={defaultFilters.year_max}
            step={1}
            onChange={onYearChange}
            onFinalChange={onYearChange}
          />
        </SectionWrap>
        <ActionButtonWrap>
          <Button
            onClick={onApply}
            // disabled={defaultFilters === state}
          >
            Apply
          </Button>
        </ActionButtonWrap>
      </FilterWrap>
    </Menu>
  );
}

const FilterWrap = styled.div`
  // if displayed it stretches out the width of the page while only visible: hidden
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;

  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: opacity 400ms cubic-bezier(0, 1, 0.5, 1),
    visibility 400ms cubic-bezier(0, 1, 0.5, 1);

  //border: 1px solid orange;

  @media ${device.min.tablet} {
    flex-direction: row;
  }
`;

const SectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  padding: 0.5rem 1rem;
  //margin: 10px 0px;
  //border: 1px solid blue;

  @media ${device.min.tablet} {
    width: 50%;
  }
`;

const Menu = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  display: flex;

  transition: opacity 400ms cubic-bezier(0, 1, 0.5, 1),
    visibility 400ms cubic-bezier(0, 1, 0.5, 1);
  max-width: 900px;
  //margin: 0.25rem;

  width: 100%;
  //border: 1px solid red;
  margin-top: 0.5rem;
  border-top: 1px solid lightgray;

  @media ${device.min.tablet} {
    //flex-direction: row;
  }
`;

const ActionButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  padding: 0.5rem 0 0.5rem;
  //border-top: 1px solid lightgray;
  background: white;

  position: sticky;
  bottom: 0;
  @media ${device.min.tablet} {
    width: 50%;
  }
`;

const Button = styled.button`
  padding: 0.75rem 0.5rem;
  color: #fff;
  background: var(--color-charcoal);
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  width: 75%;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    font-weight: 500;
  }

  span {
  }
`;

// const RangeSliderWrap = styled.div`
//background: whitesmoke;
//margin: 0 15px;

// & .bp3-slider-progress.bp3-intent-primary {
//background: #2162a4;
//background: var(--color-charcoal);
//background: red;
// }
// `;
