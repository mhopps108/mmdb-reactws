// import React from "react";
import styled from "styled-components/macro";
import { device } from "../devices";

export const StyledToolbar = styled.div`
  grid-area: toolbar;
  position: sticky;

  max-width: 1000px;
  min-height: 40px;
  top: 55px;
  background-color: white;
  box-shadow: 0 5px 25px 6px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  @media ${device.min.tablet} {
  }
`;

export const ListToolBar = styled.div`
  display: grid;
  grid-template-areas: "listinfo buttons";
  grid-template-columns: auto auto;
  grid-template-rows: 40px;
  padding: 0.5rem 0.75rem;
`;

export const ReleaseDatesToolBar = styled.div`
  display: grid;
  // grid-row-gap: ${(props) => (props.dateData ? "0.5rem" : 0)};
  grid-row-gap: 0.5rem;
  grid-template-areas:
    "listinfo buttons"
    "datepager datepager";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40px 40px;
  
  padding: 0.5rem 0.75rem;
  
  @media ${device.min.tablet} {
    grid-template-areas: "listinfo datepager buttons";
    grid-template-columns: 1fr 1.5fr 1fr;
    grid-template-rows: 40px;
  }
`;

// Shared //

export const ListInfo = styled.div`
  grid-area: listinfo;
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
    border: 1px solid lightgray;
    background: whitesmoke;
    border-radius: 26px;
    height: 26px;
    //min-width: 28px;
    padding: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    //box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

export const ButtonWrap = styled.div`
  grid-area: buttons;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 34px;
  padding: 6px 12px;
  margin-left: 0.5rem;
  background: none;
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 0 0, rgba(0, 0, 0, 0.04) 0 0 0 1px;
`;

// Release Dates

export const DatePagerWrap = styled.div`
  grid-area: datepager;
`;

// layouts

function ListToolbar() {
  // return (
  // <StyledToolbar>
  //   <ReleaseDatesToolBar>
  //     <ListInfo>
  //       <p>name</p>
  //       <span>movie_count</span>
  //     </ListInfo>
  //
  //     <ButtonGroup>
  //       <Dropdown />
  //     </ButtonGroup>
  //   </ReleaseDatesToolBar>
  // </StyledToolbar>
  // );
}

function ReleaseDatesToolbar() {
  // return (
  // <StyledToolbar>
  //   <ToolBarWrap>
  //     <ListInfo>
  //       <p>name</p>
  //       <span>movie_count</span>
  //     </ListInfo>
  //
  //     <ButtonGroup>
  //       <Dropdown />
  //       <Button />
  //     </ButtonGroup>
  //
  //     <DatePagerWrap>
  //       <DatePager />
  //     </DatePagerWrap>
  //   </ToolBarWrap>
  // </StyledToolbar>
  // );
}

function DiscoveryToolbar() {
  // return (
  // <StyledToolbar>
  //   <ToolBarWrap>
  //     <ListInfo>
  //       <p>name</p>
  //       <span>movie_count</span>
  //     </ListInfo>
  //
  //     <ButtonGroup>
  //       <Dropdown />
  //       <Button />
  //     </ButtonGroup>
  //   </ToolBarWrap>
  // </StyledToolbar>
  // );
}

function SearchToolbar() {
  // return (
  // <StyledToolbar>
  //   <ToolBarWrap>
  //     <ListInfo>
  //        <SeachIcon />
  //       <p>Search</p> (on tablet +)
  //       <span>movie_count</span>
  //     </ListInfo>
  //      <input> for search  <ClearIcon /> />
  //
  //     <ButtonGroup>
  //       <SearchButton />
  //     </ButtonGroup>
  //   </ToolBarWrap>
  // </StyledToolbar>
  // );
}
