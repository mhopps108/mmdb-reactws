import React, { useState } from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { DatePager, ActionMenu, Portal } from "../components";
import {
  FaSort,
  FaTimes,
  FaSortAmountUpAlt,
  FaSortAmountDownAlt,
} from "react-icons/fa";
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
    //color: rgba(35, 35, 39, 0.9);
    color: #282c35;
    text-transform: uppercase;
  }

  span {
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  //height: 30px;
  text-transform: uppercase; // capitalize

  border: 1px solid lightgray;
  border-radius: 4px;
  padding-left: 6px;

  //width: 120px;
  color: #282c35;

  button {
    //padding: 2px 6px 4px;
    padding-bottom: 4px;
    //border-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border-left: 1px solid lightgray;
    height: 30px;
    width: 30px;
    //border: 1px solid lightgray;
    background: whitesmoke;
    margin-left: 8px;
  }
`;

const StackedText = styled.div`
  display: flex;
  flex-direction: column;
  height: 30px;
  //color: #282c35;

  .top {
    height: 10px;
    font-size: 10px;
    margin-right: auto;
    margin-left: auto;
    color: #777;
  }
  .bottom {
    height: 20px;
    font-size: 14px;
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
          <span>{movie_count || "#"}</span>

          <SortWrap>
            <StackedText>
              <div className={"top"}>sort</div>
              <div className={"bottom"}>
                {orderByValue?.split(",")[0] || "sort"}
              </div>
            </StackedText>
            <button onClick={toggleSortOpen}>
              <FaSortAmountDownAlt size={"1rem"} />
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
