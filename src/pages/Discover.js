import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import qs from "query-string";

import { Header, DiscoverToolbar, MovieList } from "../components";
import API from "../api/api";
import { discoverySortOptions } from "../constants";

const qsOptions = {
  arrayFormat: "comma",
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: true,
  sort: false,
};

export default function Discover() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  let navigate = useNavigate();
  const location = useLocation();
  const sortOptions = discoverySortOptions;

  const [params, setParams] = useState(qs.parse(location.search, qsOptions));
  console.log("params: ", params);

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    if (!paramKeys.sortby) {
      onSortChange(sortOptions[0]);
    }
    const sortby = paramKeys.sortby || sortOptions[0].label;
    const { value } = sortOptions.find(({ value, label }) => {
      return [value, label].includes(sortby);
    });
    const queryParams = { ...paramKeys, sortby: value, page_size: 15 };

    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);
    console.log("getMovies(): queryParams: ", queryParams);

    const response = await API.get(`/discover/`, {
      params: { page: nextPage, ...queryParams },
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
  } = useInfiniteQuery(["discover", { ...params }], getMovies, {
    getFetchMore: (lastPage, allPages) => lastPage.next_page,
  });

  const onSortChange = ({ value, label }) => {
    console.log(`On Sort - Set: ${value} (${label})`);
    setParams({ ...params, sortby: label });
  };

  const onApplyFilters = (filterState) => {
    console.log("onApplyFilters: newFilterState: ", filterState);
    setParams(filterState);
  };

  useEffect(() => {
    navigate(location.pathname + "?" + qs.stringify({ ...params }, qsOptions));
  }, [navigate, location.pathname, params]);

  // toolbar data
  const listData = {
    name: "Discover",
    movie_count: data ? data[0].count : "#",
    // type: type,
  };
  const sortData = {
    sortData: discoverySortOptions,
    orderByValue: params.sortby,
    onOrderChange: onSortChange,
  };

  return (
    <StyledDiscover>
      <Header />
      <DiscoverToolbar
        listData={listData}
        sortOptions={sortData}
        filterState={params}
        onApplyFilters={onApplyFilters}
      />
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
