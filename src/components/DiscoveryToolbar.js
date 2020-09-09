import React from "react";
import styled from "styled-components/macro";
import { FilterMenu, FilterMenuSheet, Portal, Dropdown } from "../components";
import { IconButton, Icon } from "rsuite";
import { FaSortAmountDownAlt } from "react-icons/fa";

export default function DiscoveryToolbar({
  listData,
  filterMenuIsOpen,
  toggleShowFilters,
  filterState,
  onApplyFilters,
  sortOptions,
}) {
  const { name, movie_count } = listData;
  const { sortData, orderByValue, onOrderChange } = sortOptions || {};

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
    return filterState[key] || "";
  };

  return (
    <StyledToolbar>
      <DiscoveryToolBarWrap listName={name}>
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
          <FilterButtonWrap isOpen={filterMenuIsOpen}>
            <IconButton
              classPrefix={"filter-btn"}
              onClick={toggleShowFilters}
              icon={<Icon icon={filterMenuIsOpen ? "close" : "filter"} />}
              // icon={<Icon icon="filter" />}
              // size={"lg"}
              placement="right"
              appearance="link"
              // appearance={"ghost"}
            />
          </FilterButtonWrap>
        </ListNameWrap>
        {/*<ActiveFiltersBar>*/}
        {/*  <div style={{ marginRight: "auto" }}>{"Filters"}</div>*/}
        {/*  <ActiveFilterTag>{filterState.genres}</ActiveFilterTag>*/}
        {/*  <ActiveFilterTag>{filterState.certification}</ActiveFilterTag>*/}
        {/*  <ActiveFilterTag>{filterState.votes}</ActiveFilterTag>*/}
        {/*  <ActiveFilterTag>{`${filterState.rating_min} - ${filterState.rating_max}`}</ActiveFilterTag>*/}
        {/*  <ActiveFilterTag>{`${filterState.votes_min}`}</ActiveFilterTag>*/}
        {/*  <ActiveFilterTag>{`${filterState.year_min} - ${filterState.year_max}`}</ActiveFilterTag>*/}
        {/*</ActiveFiltersBar>*/}
        <ActiveFiltersBar>
          <div style={{ marginRight: "auto" }}>{"Filters"}</div>
          <ActiveFilterTag>{displayFilter("genres")}</ActiveFilterTag>
          <ActiveFilterTag>{displayFilter("certification")}</ActiveFilterTag>
          <ActiveFilterTag>{`${displayFilter("rating_min")} - ${displayFilter(
            "rating_max"
          )}`}</ActiveFilterTag>
          <ActiveFilterTag>{displayFilter("votes_min")}</ActiveFilterTag>
          <ActiveFilterTag>{`${displayFilter("year_min")} - ${displayFilter(
            "year_max"
          )}`}</ActiveFilterTag>
        </ActiveFiltersBar>

        {/* Tablet/Desktop Filters */}
        <FilterMenuWrap>
          <FilterMenu
            isOpen={filterMenuIsOpen}
            toggleOpen={toggleShowFilters}
            filterState={filterState}
            onApplyFilters={onApplyFilters}
          />
        </FilterMenuWrap>

        {/* Mobile Filters */}
        <Portal>
          <FilterMenuSheet
            filterState={filterState}
            onApplyFilters={onApplyFilters}
          />
        </Portal>

        {/*<SortButton onClick={toggleSortOpen}>*/}
        {/*  <FaSort />*/}
        {/*</SortButton>*/}
        {/*<Portal>*/}
        {/*  <ActionMenu*/}
        {/*    isOpen={sortOpen}*/}
        {/*    toggleOpen={toggleSortOpen}*/}
        {/*    sortData={sortData}*/}
        {/*    sortValue={orderByValue}*/}
        {/*    onOrderChange={onOrderChange}*/}
        {/*  />*/}
        {/*</Portal>*/}
      </DiscoveryToolBarWrap>
    </StyledToolbar>
  );
}

const StyledToolbar = styled.div`
  grid-area: toolbar;
  background-color: white;
  color: #333;
  position: sticky; // TODO: make Header and Toolbar fixed
  //min-height: 40px;
  top: 55px;
  padding: 8px 16px;
  box-shadow: 0 5px 25px 6px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  max-width: 1000px;
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
  margin-right: 12px;
  color: rgba(35, 35, 39, 0.9);
`;

const MovieCountTag = styled.div`
  font-size: 1.1rem;
  border: 1px solid lightgray;
  background: whitesmoke;
  color: #282c35;
  border-radius: 10px;
  height: 28px;
  min-width: 28px;
  padding: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
`;

// TODO END: make the following styled components shared between Toolbars

const SortWrap = styled.div`
  grid-area: sort;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  //height: 30px;
  color: #33425b;
  margin-right: 0.5rem;
`;

const FilterButtonWrap = styled.button`
  //border: 1px solid #333;
  //color: #333;
  //padding: 2px 5px;
  //font-size: 1rem;
  //margin-right: 5px;
  //border-radius: 5px;
  //background: white;

  & .filter-btn {
    color: ${(props) => (props.isOpen ? "#fff" : "#333")};
    background: ${(props) => (props.isOpen ? "#1f4b99" : "whitesmoke")};

    border: 1px solid lightgray;
    //padding: 2px 5px;
    //width: 28px;
    //height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1rem;
    text-decoration: none;
    //line-height: 1rem;
    //margin-right: 5px;
    border-radius: 5px;
  }
`;

const DiscoveryToolBarWrap = styled.div`
  // width: 100%;
  display: grid;
  // grid-row-gap: 12px;  // TODO: use breakpoint for setting grid-gap ??
  grid-template-areas:
    "discoverytoolbar"
    "activefiltersbar"
    "filtermenu";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto auto;
`;

const ActiveFiltersBar = styled.div`
  grid-area: activefiltersbar;
  color: gray;
  //padding-top: 4px;
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  //justify-content: flex-start;
  align-items: center;
`;

const FilterMenuWrap = styled.div`
  grid-area: filtermenu;
`;

const ActiveFilterTag = styled.div`
  background: whitesmoke;
  color: #333;
  //color: #1f4b99;
  //border: 1px solid lightgray;
  margin-right: 8px;
  padding: 2px 4px;
  border-radius: 4px;
`;
