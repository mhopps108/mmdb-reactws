import React from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { Link } from "react-router-dom";

const StyledToolbar = styled.div`
  grid-area: toolbar;
  background-color: white;
  color: #333;
  position: sticky;
  min-height: 40px;
  top: 55px;
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ToolbarGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const ToolbarItem = styled.div`
  display: flex;
  //flex-direction: row;
  //width: 100%;
  //justify-content: space-between;
  //justify-content: start;
  p,
  button {
    font-size: 1.2rem;
  }
`;

const ToolbarButton = styled.button`
  border: none;
  background: none;
  color: #333;
  & a {
    color: #333;
    text-decoration: none;
  }
`;

const ListName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const MovieCountTag = styled.div`
  border: 1px solid #777;
  color: #333;
  font-weight: 600;
  border-radius: 5px;
  text-align: center;
  padding: 2px 5px;
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
  children,
}) {
  const { name, source, movie_count } = listData;
  return (
    <StyledToolbar>
      <ToolBarWrap>
        <ToolbarGroup>
          <MovieCountTag>{movie_count || "#"}</MovieCountTag>
          <ListName>{name || "Loading..."}</ListName>

          {/*<ToolbarItem></ToolbarItem>*/}
          {/*<ToolbarItem></ToolbarItem>*/}
        </ToolbarGroup>
        {filter && (
          <ToolbarGroup>
            <ToolbarItem>
              <FilterButton onClick={filter}>Filter</FilterButton>
            </ToolbarItem>
          </ToolbarGroup>
        )}
        {dateData && (
          <ToolbarItem>
            <ToolbarButton onClick={dateData.prevWeek}>{"<"}</ToolbarButton>
            <ToolbarButton onClick={dateData.thisWeek}>
              <Link to="/release-dates">{dateData.dateString}</Link>
            </ToolbarButton>
            <ToolbarButton onClick={dateData.nextWeek}>{">"}</ToolbarButton>
          </ToolbarItem>
        )}
      </ToolBarWrap>
      <ChildWrap>{children}</ChildWrap>
    </StyledToolbar>
  );
}
