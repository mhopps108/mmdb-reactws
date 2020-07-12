import React, { useState } from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { DatePager, ActionMenu, Portal } from "../components";
import { FaSort, FaTimes } from "react-icons/fa";
import SortDropdown from "../old-other/SortDropdown";

const DatePagerWrap = styled.div`
  grid-area: datepager;
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
    "titleandcount titleandcount"
    "datepager datepager";
  //grid-template-columns: 1fr 1fr;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  @media ${device.min.tablet} {
    grid-template-areas: "titleandcount datepager";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

const ListInfo = styled.div`
  grid-area: titleandcount;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  p {
    font-size: 1.25rem;
    font-weight: 600;
    margin-right: 10px;
    color: rgba(35, 35, 39, 0.9);
  }

  & > div {
    font-size: 1.1rem;
    border: 1px solid lightgray;
    background: whitesmoke;
    color: #282c35;
    //font-weight: 500;
    border-radius: 10px;
    height: 28px;
    min-width: 28px;
    padding: 0 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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

const SortWrap = styled.div`
  //grid-area: sort;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  background: whitesmoke;
  margin-left: auto;
  border-radius: 4px;
  //margin-right: 8px;
  padding: 2px 6px;
  height: 30px;

  & > button {
    margin-left: 8px;
  }
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

  return (
    <StyledToolbar>
      <ToolBarWrap listName={name}>
        <ListInfo>
          <p>{name || "Loading..."}</p>
          <div>{movie_count || "#"}</div>

          <SortWrap>
            {orderByValue.split(",")[0]}
            <button onClick={toggleSortOpen}>
              <FaSort size={"1rem"} />
            </button>
          </SortWrap>

          {/*<SortWrap>*/}
          {/*  <SortDropdown*/}
          {/*    sortData={sortData}*/}
          {/*    sortValue={orderByValue}*/}
          {/*    onOrderChange={onOrderChange}*/}
          {/*  />*/}
          {/*</SortWrap>*/}
        </ListInfo>

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
