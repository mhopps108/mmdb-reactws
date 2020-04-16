import React from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { Link } from "react-router-dom";

const StyledToolbar = styled.div`
  grid-area: toolbar;
  background-color: white;
  color: #333;
  position: sticky;
  top: 55px;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  box-shadow: 0px 5px 25px 6px rgba(0, 0, 0, 0.2);

  @media ${device.min.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ToolbarItem = styled.div`
  display: flex;
  flex-direction: row;
  //max-width: 100%;
  width: 100%;
  justify-content: space-between;
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
  font-size: 1.1rem;
`;

const MovieCountTag = styled.div`
  border: 1px solid #777;
  color: #333;
  font-weight: 300;
  border-radius: 5px;
  text-align: center;
  padding: 2px 5px;
`;

export default function Toolbar({ listData, dateData = null }) {
  const { name, source, movie_count } = listData;
  return (
    <StyledToolbar>
      <ToolbarItem>
        <ListName>{name}</ListName>
        <MovieCountTag>{movie_count}</MovieCountTag>
      </ToolbarItem>
      {dateData && (
        <ToolbarItem>
          <ToolbarButton onClick={dateData.prevWeek}>{"<"}</ToolbarButton>
          <ToolbarButton onClick={dateData.thisWeek}>
            <Link to="/release-dates">{dateData.dateString}</Link>
          </ToolbarButton>
          <ToolbarButton onClick={dateData.nextWeek}>{">"}</ToolbarButton>
        </ToolbarItem>
      )}
    </StyledToolbar>
  );
}
