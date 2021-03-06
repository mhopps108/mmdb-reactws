import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import {
  FilterMenu,
  Portal,
  Dropdown,
  Modal,
  ActiveFilters,
  FilterMenuSelect,
} from "../components";
import { FaSortAmountDownAlt, FaFilter } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BsArrowDownShort, BsArrowDown } from "react-icons/bs";
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

  // const defaultFilters = {
  //   sortby: "rating",
  //   genres: [],
  //   certification: [],
  //   rating_min: 0.0,
  //   rating_max: 10.0,
  //   votes_min: 10000,
  //   year_min: 1890,
  //   year_max: 2030,
  // };

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
              icon={<BsArrowDown />}
            />
          </SortWrap>
          <Button onClick={toggleShowFilters}>
            {showFilters ? <IoMdClose size={18} /> : <FiFilter size={14} />}
          </Button>
        </ListNameWrap>

        <ActiveFilters filters={filterState} />

        {/* Tablet/Desktop Filters */}
        <FilterMenuWrapLarge isOpen={showFilters}>
          {/*<FilterMenuWrapLarge isOpen={true}>*/}
          <FilterMenuSelect
            isOpen={showFilters}
            // isOpen={true}
            setIsOpen={setShowFilters}
            filterState={filterState}
            onApplyFilters={onApplyFilters}
          />
          {/*<FilterMenu*/}
          {/*  isOpen={showFilters}*/}
          {/*  setIsOpen={setShowFilters}*/}
          {/*  filterState={filterState}*/}
          {/*  onApplyFilters={onApplyFilters}*/}
          {/*/>*/}
        </FilterMenuWrapLarge>

        {/* Mobile Filters */}
        {/*<Modal*/}
        {/*  title={"Filters"}*/}
        {/*  isOpen={showFilters}*/}
        {/*  onClose={() => setShowFilters(false)}*/}
        {/*>*/}
        {/*  <FilterMenuSelect*/}
        {/*    isOpen={showFilters}*/}
        {/*    setIsOpen={setShowFilters}*/}
        {/*    filterState={filterState}*/}
        {/*    onApplyFilters={onApplyFilters}*/}
        {/*  />*/}
        {/*</Modal>*/}
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
  //display: none;
  display: flex;
  justify-content: center;
  border-radius: 6px;
  max-height: ${(props) => (props.isOpen ? "750px" : 0)};
  transition: max-height 300ms cubic-bezier(0, 1, 0.5, 1);

  @media ${device.min.tablet} {
  }
`;

// TODO: make the following styled components shared between Toolbars

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
  //font-size: 1rem;
  padding: 4px 12px;
  background: white;
  //display: flex;
  //justify-content: space-between;
  //align-items: center;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  //border: none;
  border-radius: 0.25rem;

  transition: box-shadow 0.4s ease;

  :hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

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
