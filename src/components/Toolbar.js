import React, { useState } from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { DatePager, Dropdown } from "../components";
import {
  FaSort,
  FaTimes,
  FaSortAmountUpAlt,
  FaSortAmountDownAlt,
  FaCalendar,
  FaRegCalendar,
} from "react-icons/fa";
import SortDropDown from "../old-other/SortDropdown";

const DatePagerWrap = styled.div`
  grid-area: datepager;
  //height: 100%;
`;

const StyledToolbar = styled.div`
  grid-area: toolbar;
  background-color: white;
  color: #333;
  position: sticky;
  min-height: 40px;
  top: 55px;
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
  padding: 0.5rem 0.75rem;
  display: grid;
  grid-row-gap: ${(props) => (props.dateData ? "0.5rem" : 0)};
  grid-template-areas:
    "titleandcount sort"
    "datepager datepager";
  grid-template-columns: auto auto;
  grid-template-rows: 40px auto;
  @media ${device.min.tablet} {
    grid-template-areas: "titleandcount datepager sort";
    //grid-template-columns: 1fr 333px 1fr;
    grid-template-columns: 1fr 1.5fr 1fr;
    grid-template-rows: 40px;
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
    margin-right: 0.5rem;
    color: #33425b;
    text-transform: uppercase;
  }

  span {
    font-size: 1.1rem;
    background: #eee;
    color: #33425b;
    border-radius: 26px;
    height: 26px;
    padding: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

const SortWrap = styled.div`
  grid-area: sort;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  //height: 30px;
  //text-transform: uppercase; // capitalize

  padding-left: 6px;
  color: #33425b;
`;

const Button = styled.button`
  color: #33425b;
  background: none;
  //font-size: 1.1rem;
  //padding: 0.25rem 0.5rem;
  padding: 6px 12px;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  //border: none;
  border: ${(props) => (props.active ? "1px solid #33425b" : "none")};

  svg {
    //padding-bottom: 2px;
  }

  //&:active,
  & :hover {
    //background: #282c35;
    //color: white;
    //color: #282c35;
  }
`;

export default function Toolbar({
  listData,
  dateData = null,
  sortOptions = null,
}) {
  const { name, movie_count } = listData;
  // const { goToToday, displayDateStr, prevPeriod, nextPeriod, goToDate } =
  //   dateData || {};
  const { options, selected, onChange } = sortOptions || {};

  return (
    <StyledToolbar>
      <ToolBarWrap dateData={dateData}>
        <ListInfo>
          <p>{name || "Loading..."}</p>
          <span>{movie_count || "#"}</span>
        </ListInfo>

        <SortWrap>
          <Button
            onClick={""}
            style={{
              marginRight: "0.5rem",
              height: "34px",
              padding: "0px 12px",
            }}
          >
            <FaRegCalendar size={"1rem"} />
          </Button>
          <Dropdown
            title={"Sort"}
            selected={selected}
            onSelect={onChange}
            items={options}
            icon={<FaSortAmountDownAlt />}
          />
        </SortWrap>

        {dateData && (
          <DatePagerWrap>
            <DatePager dateData={dateData} />
          </DatePagerWrap>
        )}
      </ToolBarWrap>
    </StyledToolbar>
  );
}
