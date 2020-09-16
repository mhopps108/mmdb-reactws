import React, { useState, useReducer, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { RangeSlider, CheckButtonGroup } from "../components";
import { useLockBodyScroll, useOnClickOutside } from "../hooks";
import { genreOptions, certOptions } from "../constants";

const defaultFilters = {
  sortby: "rating",
  genres: [],
  certification: [],
  rating_min: 0.0,
  rating_max: 10.0,
  votes_min: 10000, // TODO: 100,000; with stepSize=1,000?
  year_min: 1890,
  year_max: 2030, // TODO: new Date() -> year + 5?
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
    // case "SET_VOTES":
    //   return { ...state, votes_min: action.payload[1] };
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
  const [setIsLocked] = useLockBodyScroll(isOpen);
  // const [isLocked, setIsLocked] = useLockBodyScroll(isOpen);
  // console.log("FilterMenuMain: isLocked: ", isLocked);
  const ref = useRef();
  // useOnClickOutside(ref, () => setIsOpen(false));

  const initState = { ...defaultFilters, ...filterState };
  console.info("FilterMenuSheet: initState: ", initState);
  const [state, dispatch] = useReducer(filterReducer, initState);

  const onReset = () =>
    dispatch({ type: "FILTER_RESET", payload: defaultFilters });

  const setCertsChecked = (checked) =>
    dispatch({ type: "SET_CERTS", payload: checked.sort() });

  const setGenresChecked = (checked) =>
    dispatch({ type: "SET_GENRES", payload: checked.sort() });

  const onRatingChange = (val) => {
    // console.log("onRatingCahnge: ", val);
    dispatch({ type: "SET_RATINGS", payload: val });
  };

  const onMinVotesChange = (val) =>
    dispatch({ type: "SET_VOTES", payload: val });

  const onYearChange = (val) => dispatch({ type: "SET_YEARS", payload: val });

  const onApply = (state) => {
    console.log("state: ", state);
    onApplyFilters(state);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch({ type: "FILTER_RESET", payload: filterState });
  }, [filterState]);

  useEffect(() => {
    setIsLocked(isOpen);
  }, [isOpen, setIsLocked]);

  return (
    <Menu ref={ref} isOpen={isOpen}>
      <FilterSection>
        <CheckButtonGroup
          sectionName="Age Rating"
          options={certOptions}
          checked={state.certification}
          setChecked={setCertsChecked}
        />
        <CheckButtonGroup
          sectionName="Genres"
          options={genreOptions.sort()}
          checked={state.genres || []}
          setChecked={setGenresChecked}
        />
      </FilterSection>
      <FilterSection>
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
            {/*<p>{`${0} - ${state.votes_min}`}</p>*/}
            <p>{state.votes_min}</p>
          </SectionHeader>
          <RangeSlider
            // value={[0, state.votes_min]}
            value={[state.votes_min]}
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
        <ActionButtonWrap>
          {/*<Button onClick={onCancel}>Close</Button>*/}
          <Button onClick={() => onApply(state)} primary>
            Apply
          </Button>
        </ActionButtonWrap>
      </FilterSection>
    </Menu>
  );
}

const Menu = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  display: flex;
  flex-direction: column;
  //background: whitesmoke;
  background: white;
  //border-radius: 6px;
  //border: 1px solid lightgray;
  transition: opacity 300ms cubic-bezier(0, 1, 0.5, 1),
    visibility 300ms cubic-bezier(0, 1, 0.5, 1);
  max-width: 900px;
  //margin: 0.25rem;

  @media ${device.min.tablet} {
    flex-direction: row;
  }
`;

const ActionButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem 0 0.5rem;
  border-top: 1px solid lightgray;
  background: white;

  position: sticky;
  bottom: 0;
`;

const Button = styled.button`
  //font-size: 1.1rem;
  //margin: 0 0.5rem;
  padding: 0.5rem 0.5rem;
  //padding: 1rem;
  color: ${(props) => (props.primary ? "#fff" : "#33425b")};
  background: ${(props) => (props.primary ? "#33425b" : "fff")};
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  width: 75%;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 8px;

  @media ${device.min.tablet} {
    width: 50%;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem -0.5rem 0.5rem;
  //color: #2162a4;

  & p {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
  }

  & span {
    //color: #2162a4;
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
  }
`;

const RangeSliderWrap = styled.div`
  //background: whitesmoke;
  margin: 0 15px;

  & .bp3-slider-progress.bp3-intent-primary {
    //background: #2162a4;
    //background: var(--color-charcoal);
    //background: red;
  }
`;
