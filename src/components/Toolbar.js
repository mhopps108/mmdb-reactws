import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components/macro";
import { device } from "../devices";

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

const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
  control: (base, state) => ({
    ...base,
    background: "#023950",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "yellow" : "green",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "red" : "blue",
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
  ValueContainer: (provided, state) => {
    return { ...provided, width: "200px" };
  },
};

const SortSelect = ({ name, options, isMulti = false }) => {
  return (
    <div
      style={{
        fontSize: "16px",
        color: "#2162a4",
        // width: "120px",
        // height: "35px",
      }}
    >
      <Select
        style={customSelectStyles}
        // className="basic-single"
        // classNamePrefix="select"
        // defaultValue={""}
        isMulti={isMulti}
        blurInputOnSelect={true}
        isSearchable={false}
        // isClearable={isClearable}
        // menuShouldBlockScroll={true}
        name={name}
        options={options}
      />
    </div>
  );
};

export default function Toolbar({
  listData,
  dateData = null,
  filter = null,
  sortOptions = null,
  children,
}) {
  const { name, source, movie_count } = listData;
  return (
    <StyledToolbar>
      <ToolBarWrap>
        <ToolbarGroup>
          <ListName>{name || "Loading..."}</ListName>
          <MovieCountTag>{movie_count || "#"}</MovieCountTag>

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
        {sortOptions && <SortSelect name={"SortBy"} options={sortOptions} />}
      </ToolBarWrap>
      <ChildWrap>{children}</ChildWrap>
    </StyledToolbar>
  );
}
