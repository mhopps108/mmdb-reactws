import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { device } from "../devices";
import { DatePager, SortDropdown } from "../components";
import { SelectPicker, Dropdown, IconButton, Icon } from "rsuite";

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
  padding: 8px 16px;
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
  color: #666;
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

const FilterButton = styled.button`
  border: 1px solid #333;
  color: #333;
  padding: 2px 5px;
  font-size: 1rem;
  //margin-right: 5px;
  border-radius: 5px;
  background: white;
`;

const ChildWrap = styled.div`
  display: flex;
  width: 100%;
`;

export default function Toolbar({
  listData,
  dateData = null,
  filter = null,
  sortOptions = null,
  children,
}) {
  const { name, source, movie_count } = listData;
  // const { prev, next, goToToday, currentDate } = dateData || {};
  // const { goPrevWeek, goNextWeek, prevLink, nextLink, goToToday, currentDate } =
  //   dateData || {};
  const { goPrevWeek, goNextWeek, goToToday, currentDate } = dateData || {};
  const { sortData, orderByValue, onOrderChange } = sortOptions || {};

  // const getSortLabel = () => {
  //   console.log("orderByValue: ", orderByValue);
  //   const found = sortData.find((item) => item.value === orderByValue);
  //   return found.label;
  // };

  return (
    <StyledToolbar>
      <ToolBarWrap listName={name}>
        <ListNameWrap>
          <ListName>{name || "Loading..."}</ListName>
          <MovieCountTag>{movie_count || "#"}</MovieCountTag>
        </ListNameWrap>

        {filter && <FilterButton onClick={filter}>Filter</FilterButton>}
        {dateData && (
          <DatePagerWrap>
            <DatePager
              goPrevWeek={goPrevWeek}
              goNextWeek={goNextWeek}
              // prev={prevLink}
              // next={nextLink}
              goToToday={goToToday}
              currentDate={currentDate}
            />
          </DatePagerWrap>
        )}
        {sortOptions && (
          <SortWrap>
            <SortDropdown
              sortData={sortData}
              sortValue={orderByValue}
              onOrderChange={onOrderChange}
            />
          </SortWrap>
        )}
        {/*<SortWrap>*/}
        {/*<Dropdown*/}
        {/*  noCaret*/}
        {/*  placement={"bottomEnd"}*/}
        {/*  activeKey={orderByValue}*/}
        {/*  onSelect={onOrderChange}*/}
        {/*  // title={() => getSortLabel()}*/}
        {/*  // icon={<Icon icon="sort-amount-desc" />}*/}
        {/*  renderTitle={() => {*/}
        {/*    return (*/}
        {/*      <IconButton*/}
        {/*        appearance="link"*/}
        {/*        icon={<Icon icon="sort-amount-desc" />}*/}
        {/*        placement="right"*/}
        {/*        size={"sm"}*/}
        {/*      >*/}
        {/*        {getSortLabel()}*/}
        {/*      </IconButton>*/}
        {/*    );*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {sortData.map(({ value, label }) => (*/}
        {/*    <Dropdown.Item eventKey={value}>{label}</Dropdown.Item>*/}
        {/*  ))}*/}
        {/*</Dropdown>*/}
        {/* </SortWrap>*/}
        {/*)}*/}
      </ToolBarWrap>
      {/*<ChildWrap>{children}</ChildWrap>*/}
    </StyledToolbar>
  );
}
