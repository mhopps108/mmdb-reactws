import React, { useState, useEffect, useRef, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
// import { device } from "../devices";
import { useQueryParams } from "../hooks";

import {
  // Header,
  HeaderWithSearch,
  MovieList,
  FilterMenu,
  // Portal,
  Dropdown,
  // Modal,
  ActiveFilters,
} from "../components";

import {
  StyledToolbar,
  DiscoveryToolBar,
  FilterMenuWrap,
  ListInfo,
  ButtonWrap,
  Button,
} from "../styled/ToolbarStyled";

import API from "../api/api";
import { discoverySortOptions } from "../constants";
import { FaSortAmountDownAlt, FaFilter } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BsArrowDownShort, BsArrowDown } from "react-icons/bs";

export default function Discovery() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  const sortOptions = discoverySortOptions;
  const [queryParams, updateQueryParams] = useQueryParams({
    sort: "votes",
    genres: [],
    certification: [],
    rating_min: 0.0,
    rating_max: 10.0,
    votes_min: 0,
    year_min: 1890,
    year_max: new Date().getFullYear() + 5,
  });
  console.log("Discover: useQueryParams: ", queryParams);

  const printGetsMovieData = (key, paramKeys, nextPage, queryParams) => {
    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);
    console.log("getMovies(): queryParams: ", queryParams);
  };

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    const { value } = sortOptions.find(({ value, label }) => {
      return [value, label].includes(paramKeys.sort);
    });
    const qParams = { ...paramKeys, sortby: value, page_size: 15 };
    printGetsMovieData(key, paramKeys, nextPage, qParams);

    const response = await API.get(`/discover/`, {
      params: { page: nextPage, ...qParams },
    });
    return response.data;
  };

  const {
    status,
    data,
    error,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(["discover", { ...queryParams }], getMovies, {
    getFetchMore: (lastPage, allPages) => lastPage.next_page,
  });

  const onSortChange = ({ value, label }) => {
    console.log(`On Sort - Set: ${value} (${label})`);
    updateQueryParams({ ...queryParams, sort: label });
  };

  const onApplyFilters = (filterState) => {
    console.log("onApplyFilters: newFilterState: ", filterState);
    updateQueryParams(filterState);
  };

  const [showFilters, setShowFilters] = useState(false);
  const toggleShowFilters = () => {
    console.log("clicked - toggleShowFilters - ", showFilters);
    setShowFilters(!showFilters);
  };

  return (
    <StyledDiscover>
      {/*<Header />*/}
      <HeaderWithSearch />
      <StyledToolbar>
        <DiscoveryToolBar>
          <ListInfo>
            <p>{"Discover" || "Loading..."}</p>
            <span>{data ? data[0].count : "#"}</span>
          </ListInfo>

          <ButtonWrap>
            <Dropdown
              title={"Sort"}
              selected={queryParams.sort}
              onSelect={onSortChange}
              items={discoverySortOptions}
              // icon={<FaSortAmountDownAlt />}
              icon={<BsArrowDown />}
            />
            <Button onClick={toggleShowFilters}>
              {showFilters ? <IoMdClose size={18} /> : <FiFilter size={14} />}
            </Button>
          </ButtonWrap>

          <ActiveFilters filters={queryParams} />

          <FilterMenuWrap isOpen={showFilters}>
            <FilterMenu
              isOpen={showFilters}
              setIsOpen={setShowFilters}
              filterState={queryParams}
              onApplyFilters={onApplyFilters}
            />
          </FilterMenuWrap>
        </DiscoveryToolBar>
      </StyledToolbar>

      <MovieList
        movies={
          data && data.reduce((acc, page) => [...acc, ...page.results], [])
        }
        isLoading={status === "loading"}
        isError={error}
        // dateType={type}
      />
      {/*TODO: move to MovieList?*/}
      <LoadMoreButton
        // ref={loadMoreButtonRef}
        onClick={() => fetchMore()}
        hidden={!canFetchMore}
        disabled={isFetchingMore}
      >
        {isFetchingMore ? "Loading More..." : "Show More"}
      </LoadMoreButton>
    </StyledDiscover>
  );
}

const LoadMoreButton = styled.button`
  height: 40px;
  width: 90%;
  max-width: 400px;
  margin: 10px auto 100px;
  border-radius: 6px;
  background: white;
`;

const StyledDiscover = styled.div`
  max-width: 1000px;
  height: 100%;
  display: grid;
  grid-template-areas:
    "header"
    "toolbar"
    "main";
  grid-template-columns: 1fr;
  grid-template-rows: 55px auto 1fr;
  margin: 0 auto;
`;
