import React, { useState, useReducer, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { RangeSlider, CheckButtonGroup } from "../components";
import { useLockBodyScroll, useOnClickOutside } from "../hooks";
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
import { FaFilter } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { FiMenu } from "react-icons/fi";

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

export default function FilterMenuSheet({ filterState, onApplyFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [setIsLocked] = useLockBodyScroll(isOpen);

  const ref = useRef();
  // useOnClickOutside(ref, () => setIsOpen(false));

  const initState = { ...defaultFilters, ...filterState };
  const [state, dispatch] = useReducer(filterReducer, initState);

  const onReset = () => dispatch({ type: "FILTER_RESET" });

  const onCancel = () => {
    dispatch({ type: "FILTER_RESET", payload: filterState });
    setIsOpen(false);
  };

  const setCertsChecked = (checked) =>
    dispatch({ type: "SET_CERTS", payload: checked });

  const setGenresChecked = (checked) =>
    dispatch({ type: "SET_GENRES", payload: checked });

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
    setIsLocked(false);
  };

  useEffect(() => {
    setIsLocked(() => isOpen);
  }, [isOpen, setIsLocked]);

  return (
    <>
      <FilterButtonWrap>
        <MenuButton onClick={toggleOpen}>
          <FaFilter />
        </MenuButton>
      </FilterButtonWrap>
      <FilterMenuMobileWrap isOpen={isOpen}>
        <Menu ref={ref} isOpen={isOpen}>
          <FilterSection>
            <CheckButtonGroup
              sectionName="Age Rating"
              options={certOptions}
              checked={state.certification || []}
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
          </FilterSection>
        </Menu>
        <ActionButtonWrap isOpen={isOpen}>
          <Button onClick={onCancel}>Close</Button>
          {/*<Button onClick={() => console.log("click")} primary>*/}
          <Button onClick={() => onApply(state)} primary>
            Apply
          </Button>
        </ActionButtonWrap>
      </FilterMenuMobileWrap>
    </>
  );
}

const FilterMenuMobileWrap = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1100;
  display: flex;
  justify-content: center;
  //background: rgba(0, 0, 0, 0.5);
  background: ${(props) =>
    props.isOpen ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.0)"};

  //transition: all 150ms ease;
  transition: opacity 300ms cubic-bezier(0, 1, 0.5, 1),
    visibility 300ms cubic-bezier(0, 1, 0.5, 1);

  @media ${device.min.desktop} {
    display: none;
  }
`;

const Menu = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  position: fixed;
  bottom: 0;
  // TODO: scroll view for short phones
  display: flex;
  flex-direction: column;

  background: whitesmoke;
  border: 2px solid lightgray;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

  max-width: 600px;
  max-height: calc(100vh - 100px);
  overflow-y: scroll;

  margin: 5px 0 50px;

  transform: ${(props) =>
    props.isOpen ? "translateY(0%)" : "translateY(100%)"};
  //transition: all 200ms ease;
  transition: transform 300ms cubic-bezier(0, 1, 0.5, 1),
    opacity 300ms cubic-bezier(0, 1, 0.5, 1),
    visibility 300ms cubic-bezier(0, 1, 0.5, 1);

  @media ${device.min.desktop} {
    //display: none;
  }
`;

const ActionButtonWrap = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: ${(props) =>
    props.isOpen ? "translateY(0%)" : "translateY(100%)"};
  transition: transform 200ms cubic-bezier(0, 1, 0.5, 1),
    opacity 300ms cubic-bezier(0, 1, 0.5, 1),
    visibility 300ms cubic-bezier(0, 1, 0.5, 1);

  box-shadow: 0 -8px 10px 2px rgba(0, 0, 0, 0.1);

  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: white;
  height: 50px;
  border-top: 1px solid lightgray;
`;

const Button = styled.button`
  font-size: 1.1rem;
  margin: 0 0.5rem;
  padding: 0.25rem 0.5rem;
  color: ${(props) => (props.primary ? "#fff" : "#33425b")};
  background: ${(props) => (props.primary ? "#33425b" : "fff")};
  border: 1px solid lightgray;
  border-radius: 6px;
`;

const MenuButton = styled.button`
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  font-size: 1.5rem;
  padding: 4px 8px;
  color: #282c35;
  background: whitesmoke;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${device.min.tablet} {
    display: none;
    //visibility: hidden;
  }
`;

const FilterButtonWrap = styled.button`
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);

  color: ${(props) => (props.isOpen ? "#fff" : "#333")};
  background: ${(props) => (props.isOpen ? "#1f4b99" : "whitesmoke")};
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  text-decoration: none;
`;

const RangeSliderWrap = styled.div`
  //background: whitesmoke;
  //padding: 12px;
  margin: 10px 15px;

  & .bp3-slider-progress.bp3-intent-primary {
    background: #2162a4;
  }
`;
