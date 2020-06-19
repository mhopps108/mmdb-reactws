import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { device } from "../devices";
import { SortDropdown, FilterMenu, FilterMenuSheet } from "../components";
import { IconButton, Icon } from "rsuite";
import { queryToFilterState } from "../pages/Discover";
import Dropdown from "../components/Dropdown";

const StyledToolbar = styled.div`
  grid-area: toolbar;
  background-color: white;
  color: #333;
  position: sticky; // TODO: make Header and Toolbar fixed
  min-height: 40px;
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
  background: white;
  color: #333;
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
  justify-content: flex-end;
  align-content: end;
  border: 1px solid lightgray;
  background: whitesmoke;
  margin-left: auto;
  border-radius: 4px;
  margin-right: 8px;
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

export default function DiscoveryToolbar({
  listData,
  filterMenuIsOpen,
  toggleShowFilters,
  setQuery,
  filterState,
  onApplyFilters,
  sortOptions,
}) {
  const { name, movie_count } = listData;
  const { sortData, orderByValue, onOrderChange } = sortOptions || {};

  const activeFiltersArr = () => {
    console.log("DiscoveryToolbar: filterState: ", filterState);
    // return "need to clean";
    let filters = {};
    if (filterState["certs"] && filterState["certs"][0] !== "") {
      filters["certs"] = filterState["certs"].join(" ");
    }
    if (filterState["genres"] && filterState["genres"][0] !== "") {
      filters["genres"] = filterState["genres"].join(" ");
    }
    if (filterState["ratings"][0] > 0 || filterState["ratings"][1] < 10) {
      filters["ratings_min"] = filterState["ratings"][0];
      filters["ratings_max"] = filterState["ratings"][1];
      filters[
        "ratings_str"
      ] = `${filters["ratings_min"]} - ${filters["ratings_max"]}`;
    }
    if (filterState["votes"][0] > 0 || filterState["votes"][1] > 0) {
      filters["votes"] = filterState["votes"][1];
    }
    if (filterState["years"][0] > 1890 || filterState["years"][1] < 2030) {
      filters["years_min"] = filterState["years"][0];
      filters["years_max"] = filterState["years"][1];
      filters[
        "years_str"
      ] = `${filters["years_min"]} - ${filters["years_max"]}`;
    }
    console.log("DiscoverToolbar: filters obj: ", filters);
    return filters;
  };

  const activeFor = (fieldName) => {
    const active = activeFiltersArr();
    return active[fieldName];
  };

  return (
    <StyledToolbar>
      <DiscoveryToolBarWrap listName={name}>
        <ListNameWrap>
          <ListName>{name || "Loading..."}</ListName>
          <MovieCountTag>{movie_count || "#"}</MovieCountTag>
          <SortWrap>
            <SortDropdown
              sortData={sortData}
              sortValue={orderByValue}
              onOrderChange={onOrderChange}
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
        <ActiveFiltersBar>
          <div style={{ marginRight: "auto" }}>{"Filters"}</div>
          {/*ActiveFilters: {activeFiltersString()}*/}
          <ActiveFilterTag>{activeFor("genres")}</ActiveFilterTag>
          <ActiveFilterTag>{activeFor("certs")}</ActiveFilterTag>
          <ActiveFilterTag>{activeFor("votes")}</ActiveFilterTag>
          <ActiveFilterTag>{activeFor("ratings_str")}</ActiveFilterTag>
          <ActiveFilterTag>{activeFor("years_str")}</ActiveFilterTag>
          {/*<ActiveFilterTag>{activeFiltersArr()["genres"]}</ActiveFilterTag>*/}
          {/*<ActiveFilterTag>*/}
          {/*  {activeFiltersArr()["ratings_min"]} to{" "}*/}
          {/*  {activeFiltersArr()["ratings_max"]}*/}
          {/*</ActiveFilterTag>*/}
          {/*<ActiveFilterTag>{activeFiltersArr()["genres"]}</ActiveFilterTag>*/}
          {/*<ActiveFilterTag>{activeFiltersArr()["years"]}</ActiveFilterTag>*/}
        </ActiveFiltersBar>
        {/*activeFiltersArr*/}
        <FilterMenuWrap>
          <FilterMenu
            isOpen={filterMenuIsOpen}
            toggleOpen={toggleShowFilters}
            setQuery={setQuery}
            filterState={filterState}
            onApplyFilters={onApplyFilters}
          />
        </FilterMenuWrap>
        <FilterMenuSheet
          filterState={filterState}
          setQuery={setQuery}
          onApplyFilters={onApplyFilters}
        />
      </DiscoveryToolBarWrap>
    </StyledToolbar>
  );
}
