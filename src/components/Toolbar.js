import React, { useState } from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { DatePager, ActionMenu, Portal } from "../components";
import { FaSort, FaTimes } from "react-icons/fa";

const DatePagerWrap = styled.div`
  grid-area: datepager;
`;

const ListNameWrap = styled.div`
  grid-area: titleandcount;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SortWrap = styled.div`
  grid-area: sort;
  display: flex;
  justify-content: flex-end;
  align-content: end;
  border: 1px solid lightgray;
  background: whitesmoke;
  margin-left: auto;
  border-radius: 4px;
`;

const StyledToolbar = styled.div`
  grid-area: toolbar;
  background-color: white;
  color: #333;
  position: sticky;
  min-height: 40px;
  top: 55px;
  //display: flex;
  //flex-direction: column;
  //justify-content: space-between;
  //padding: 8px 16px;
  box-shadow: 0 5px 25px 6px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  max-width: 1000px;

  @media ${device.min.tablet} {
    //flex-direction: row;
    //justify-content: space-between;
  }
`;

const ToolBarWrap = styled.div`
  padding: 8px 16px;
  //display: flex;
  //flex-direction: row;
  //justify-content: space-between;
  //width: 100%;
  //height: 80px;
  display: grid;
  //grid-row-gap: 12px;

  grid-row-gap: ${(props) =>
    props?.listName?.includes("Release") ? "12px" : 0};
  grid-template-areas:
    "titleandcount sort"
    "datepager datepager";
  //grid-template-columns: 1fr 1fr;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  @media ${device.min.tablet} {
    grid-template-areas: "titleandcount datepager sort";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

const ListName = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 10px;
  //color: #333;
  //color: rgb(66, 82, 110);
  color: rgba(35, 35, 39, 0.9);
`;

const MovieCountTag = styled.div`
  font-size: 1.1rem;
  border: 1px solid lightgray;
  //background: rgba(35, 35, 39, 0.7);
  background: whitesmoke;
  color: #282c35;
  //color: white;
  //font-weight: 500;
  //border-radius: 5px;
  border-radius: 10px;
  height: 28px;
  min-width: 28px;
  padding: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SortButton = styled.button`
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  font-size: 1.5rem;
  padding: 4px 8px;
  background: whitesmoke;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

export default function Toolbar({
  listData,
  dateData = null,
  sortOptions = null,
}) {
  const { name, movie_count } = listData;
  const { goPrev, goNext, goToToday, displayDateStr } = dateData || {};
  const { sortData, orderByValue, onOrderChange } = sortOptions || {};
  const [sortOpen, setSortOpen] = useState(false);
  const toggleSortOpen = () => setSortOpen(!sortOpen);

  function getSortLabel(orderByValue) {
    const found = sortData.find((item) => item.value === orderByValue);
    return found.label;
  }

  return (
    <StyledToolbar>
      <ToolBarWrap listName={name}>
        <ListNameWrap>
          <ListName>{name || "Loading..."}</ListName>
          <MovieCountTag>{movie_count || "#"}</MovieCountTag>
        </ListNameWrap>

        {/*{filter && <FilterButton onClick={filter}>Filter</FilterButton>}*/}
        {dateData && (
          <DatePagerWrap>
            <DatePager
              goPrev={goPrev}
              goNext={goNext}
              goToToday={goToToday}
              displayDateStr={displayDateStr}
            />
          </DatePagerWrap>
        )}
        {sortOptions && (
          <SortWrap>
            <span>SortBy: {getSortLabel(orderByValue)}</span>
          </SortWrap>
        )}
        {sortOptions && (
          <SortButton onClick={toggleSortOpen}>
            <FaSort />
          </SortButton>
        )}
      </ToolBarWrap>
      {sortOptions && (
        <Portal>
          <ActionMenu
            isOpen={sortOpen}
            toggleOpen={toggleSortOpen}
            sortData={sortData}
            sortValue={orderByValue}
            onOrderChange={onOrderChange}
          />
        </Portal>
      )}
    </StyledToolbar>
  );
}
