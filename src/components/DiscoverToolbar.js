import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { FilterMenu, Portal, Dropdown, Modal } from "../components";
import {
  FaSortAmountDownAlt,
  FaRegCheckSquare,
  FaRegStar,
  FaRegCalendar,
  FaFilter,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { device } from "../devices";

export default function DiscoverToolbar({
  listData,
  sortOptions,
  filterState,
  onApplyFilters,
}) {
  const { name, movie_count } = listData;
  const { sortData, orderByValue, onOrderChange } = sortOptions || {};

  const [showFilters, setShowFilters] = useState(false);
  const toggleShowFilters = () => {
    console.log("clicked - toggleShowFilters - ", showFilters);
    setShowFilters(!showFilters);
  };

  const displayFilter = (key) => {
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
    if (filterState[key] === defaultFilters[key]) return "";
    if (Array.isArray(filterState[key])) {
      return filterState[key].join(", ");
    }

    return filterState[key] || "";
  };

  return (
    <StyledToolbar>
      <DiscoveryToolBarWrap>
        <ListNameWrap>
          <ListName>{name || "Loading..."}</ListName>
          <MovieCountTag>{movie_count || "#"}</MovieCountTag>
          <SortWrap>
            <Dropdown
              title={"Sort"}
              selected={orderByValue}
              onSelect={onOrderChange}
              items={sortData}
              icon={<FaSortAmountDownAlt />}
            />
          </SortWrap>
          <Button onClick={toggleShowFilters}>
            {showFilters ? <IoMdClose size={18} /> : <FaFilter size={14} />}
          </Button>
        </ListNameWrap>
        {/*TODO: move to own component*/}
        <ActiveFiltersBar>
          <div style={{ marginRight: "auto" }}>{"Filters"}</div>
          <ActiveFilterTag>{displayFilter("genres")}</ActiveFilterTag>
          <ActiveFilterTag>{displayFilter("certification")}</ActiveFilterTag>
          <ActiveFilterTag>
            <FaRegStar />{" "}
            {`${displayFilter("rating_min")} - ${displayFilter("rating_max")}`}
          </ActiveFilterTag>
          <ActiveFilterTag>
            <FaRegCheckSquare />
            {displayFilter("votes_min")}
          </ActiveFilterTag>
          <ActiveFilterTag>
            <FaRegCalendar />
            {`${displayFilter("year_min")} - ${displayFilter("year_max")}`}
          </ActiveFilterTag>
        </ActiveFiltersBar>

        {/* Tablet/Desktop Filters */}
        <FilterMenuWrapLarge isOpen={showFilters}>
          <FilterMenu
            isOpen={showFilters}
            setIsOpen={setShowFilters}
            filterState={filterState}
            onApplyFilters={onApplyFilters}
          />
        </FilterMenuWrapLarge>

        {/* Mobile Filters */}
        <Modal
          title={"Filters"}
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
        >
          <FilterMenu
            isOpen={showFilters}
            setIsOpen={setShowFilters}
            filterState={filterState}
            onApplyFilters={onApplyFilters}
          />
        </Modal>
        {/*<Portal>*/}
        {/*  <FilterMenuWrapSmall isOpen={showFilters}>*/}
        {/*    <FilterMenu*/}
        {/*      isOpen={showFilters}*/}
        {/*      setIsOpen={setShowFilters}*/}
        {/*      filterState={filterState}*/}
        {/*      onApplyFilters={onApplyFilters}*/}
        {/*    />*/}
        {/*  </FilterMenuWrapSmall>*/}
        {/*</Portal>*/}
      </DiscoveryToolBarWrap>
    </StyledToolbar>
  );
}

const FilterMenuWrapLarge = styled.div`
  grid-area: filtermenu;
  display: none;

  @media ${device.min.tablet} {
    display: flex;
    justify-content: center;
    border-radius: 6px;
    max-height: ${(props) => (props.isOpen ? "600px" : 0)};
    transition: max-height 350ms cubic-bezier(0, 1, 0.5, 1);
  }
`;

const FilterMenuWrapSmall = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100vw;
  //height: 100vh;
  max-width: 600px;
  max-height: calc(100vh - 100px);
  overflow-y: scroll;
  z-index: 1100;
  display: flex;
  justify-content: center;
  //border-top-left-radius: 6px;
  //border-top-right-radius: 6px;
  //box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  // background: ${(props) =>
    props.isOpen ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.0)"};

  //transform: ${(props) =>
    props.isOpen ? "translateY(0%)" : "translateY(100%)"};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};

  transition: transform 300ms cubic-bezier(0, 1, 0.5, 1),
    opacity 300ms cubic-bezier(0, 1, 0.5, 1),
    visibility 300ms cubic-bezier(0, 1, 0.5, 1);

  @media ${device.min.tablet} {
    display: none;
  }
`;

const DiscoveryToolBarWrap = styled.div`
  display: grid;
  // grid-row-gap: 12px;  // TODO: use breakpoint for setting grid-gap ??
  grid-template-areas:
    "discoverytoolbar"
    "activefiltersbar"
    "filtermenu";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto auto;
`;

const StyledToolbar = styled.div`
  grid-area: toolbar;
  background-color: white;
  position: sticky; // TODO: make Header and Toolbar fixed
  //min-height: 40px;
  top: 55px;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 5px 25px 6px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  max-width: 1000px;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 6px 12px;
  background: white;
  //display: flex;
  //justify-content: space-between;
  //align-items: center;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  //border: none;
  border-radius: 0.25rem;

  transition: box-shadow 0.4s ease;

  :hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }
`;

// TODO: make the following styled components shared between Toolbars

const ListNameWrap = styled.div`
  grid-area: discoverytoolbar;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ListName = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 0.5rem;
  //text-transform: uppercase;
`;

const MovieCountTag = styled.div`
  font-size: 1.1rem;
  border: 1px solid lightgray;
  background: whitesmoke;
  border-radius: 26px;
  height: 26px;
  //min-width: 28px;
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SortWrap = styled.div`
  grid-area: sort;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 0.5rem;
`;

const ActiveFiltersBar = styled.div`
  grid-area: activefiltersbar;
  color: gray;
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  //row-gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
`;

const ActiveFilterTag = styled.div`
  background: whitesmoke;
  color: #333;
  //border: 1px solid lightgray;
  margin: 4px 8px;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  text-transform: capitalize;

  svg {
    color: #666;
    margin-right: 0.25rem;
  }
`;
