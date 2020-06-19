import React, { useEffect, useState, useReducer } from "react";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import { RangeSlider, CheckButtonGroup, FilterMenuMobile } from "../components";
import { discoveryQueryString } from "../api";
import { genreOptions, certOptions } from "../constants";
import {
  FilterMenuWrap,
  FilterMenuContentWrap,
  // RangeSliderWrap,
  SectionHeader,
  FilterSection,
  ApplyButton,
  ApplyButtonWrap,
} from "../styled/FilterMenuStyled";
import { Icon, IconButton } from "rsuite";

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

export default function FilterMenuSheet({
  setQuery,
  filterState,
  onApplyFilters,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

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
    setIsOpen(false);
  };

  return (
    <>
      <FilterButtonWrap isOpen={isOpen}>
        <IconButton
          classPrefix={"filter-btn"}
          onClick={toggleOpen}
          icon={<Icon icon={isOpen ? "close" : "filter"} />}
          // size={"lg"}
          placement="right"
          appearance="link"
          // appearance={"ghost"}
        />
      </FilterButtonWrap>
      <FilterMenuMobileWrap isOpen={isOpen}>
        {/*<Button onClick={toggleOpen}>Sort</Button>*/}

        <Menu isOpen={isOpen}>
          {/*<FilterMenuContentWrap isOpen={isOpen}>*/}
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
                <p>Rating</p>
                <p>{`${state.ratings[0]} - ${state.ratings[1]}`}</p>
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
                <p>{`${state.votes[0]} - ${state.votes[1]}`}</p>
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
                <p>{`${state.years[0]} - ${state.years[1]}`}</p>
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
          <ActionButtonWrap>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
            <Button onClick={onClick} action>
              Apply Filters
            </Button>
          </ActionButtonWrap>
          {/*</FilterMenuContentWrap>*/}
        </Menu>
      </FilterMenuMobileWrap>
    </>
  );
}

export const ActionButtonWrap = styled.div`
  width: 100%;
  //margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background: #282c35;
  height: 50px;
  border-top: 2px solid lightgray;
`;

const Button = styled.button`
  font-size: 1.1rem;
  margin: 0 12px;
  padding: 4px 8px;
  //height: 35px;
  //color: #fff;
  color: ${(props) => (props.action ? "#fff" : "#282c35")};
  background: ${(props) => (props.action ? "#282c35" : "fff")};
  border: 1px solid lightgray;
  border-radius: 4px;
`;

const FilterButtonWrap = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  & .filter-btn {
    color: ${(props) => (props.isOpen ? "#fff" : "#333")};
    background: ${(props) => (props.isOpen ? "#1f4b99" : "whitesmoke")};
    border: 1px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    text-decoration: none;
    border-radius: 5px;
  }
`;

export const RangeSliderWrap = styled.div`
  //background: whitesmoke;
  //padding: 12px;
  margin: 10px 15px;

  & .bp3-slider-progress.bp3-intent-primary {
    background: #2162a4;
  }
`;

const FilterMenuMobileWrap = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  background: rgba(0, 0, 0, 0.9);
  transition: all 100ms ease;

  @media ${device.min.tablet} {
    //flex-direction: row;
    display: none;
  }
`;

const Menu = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  position: fixed;
  bottom: 0;
  left: 0;
  // TODO: scroll view for short phones

  //display: grid;
  //grid-template-columns: repeat(4, 1fr);
  display: flex;
  flex-direction: column;

  background: white;

  //padding: 0 8px;
  border: 2px solid lightgray;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  //z-index: 11;

  min-height: 150px;
  max-height: 90vh;
  width: 100vw;
  max-width: 600px;

  transform: ${(props) =>
    props.isOpen ? "translateY(0%)" : "translateY(100%)"};
  transition: all 200ms ease;

  @media ${device.min.tablet} {
    //flex-direction: row;
    display: none;
  }
`;
