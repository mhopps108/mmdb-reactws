import React from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { DatePager, Dropdown } from "../components";
import { FaSortAmountDownAlt, FaRegCalendar } from "react-icons/fa";

const ButtonGroup = styled.div``;

const DatePagerWrap = styled.div`
  grid-area: datepager;
`;

const StyledToolbar = styled.div`
  grid-area: toolbar;
  position: sticky;
  min-height: 40px;
  top: 55px;
  max-width: 1000px;

  @media ${device.min.tablet} {
  }
`;

const ToolBarWrap = styled.div`
  display: grid;
  grid-row-gap: ${(props) => (props.dateData ? "0.5rem" : 0)};
  grid-template-areas:
    "titleandcount sort"
    "datepager datepager";
  grid-template-columns: auto auto;
  grid-template-rows: 40px auto;
  @media ${device.min.tablet} {
    grid-template-areas: "titleandcount datepager sort";
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
    margin-right: 0.5rem;
  }

  span {
    border-radius: 26px;
    height: 26px;
    padding: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SortWrap = styled.div`
  grid-area: sort;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

const Button = styled.button`
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ListToolbar() {
  return (
    <StyledToolbar>
      <ToolBarWrap>
        <ListInfo>
          <p>name</p>
          <span>movie_count</span>
        </ListInfo>

        <ButtonGroup>
          <Dropdown />
        </ButtonGroup>
      </ToolBarWrap>
    </StyledToolbar>
  );
}

function ReleaseDatesToolbar() {
  return (
    <StyledToolbar>
      <ToolBarWrap>
        <ListInfo>
          <p>name</p>
          <span>movie_count</span>
        </ListInfo>

        <ButtonGroup>
          <Dropdown />
          <Button />
        </ButtonGroup>

        <DatePagerWrap>
          <DatePager />
        </DatePagerWrap>
      </ToolBarWrap>
    </StyledToolbar>
  );
}

function DiscoveryToolbar() {
  return (
    <StyledToolbar>
      <ToolBarWrap>
        <ListInfo>
          <p>name</p>
          <span>movie_count</span>
        </ListInfo>

        <ButtonGroup>
          <Dropdown />
          <Button />
        </ButtonGroup>
      </ToolBarWrap>
    </StyledToolbar>
  );
}
