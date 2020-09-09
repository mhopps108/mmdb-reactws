import React, { useState, useEffect, useRef, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import qs from "query-string";

import { Header, DiscoveryToolbar, MovieList } from "../components";
import API from "../api/api";
import { useQueryParams, useIntersectionObserver } from "../hooks";
import { discoverySortOptions } from "../constants";

const qsOptions = {
  arrayFormat: "comma",
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: true,
  sort: false,
};

export default function DiscoverT() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  let navigate = useNavigate();
  const location = useLocation();
  const sortOptions = discoverySortOptions;
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [params, setParams] = useState(qs.parse(location.search, qsOptions));
  console.log("params: ", params);

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    const { value, label } = getSortObject(paramKeys.sortby, sortOptions);
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
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(["discover", { ...params }], getMovies, {
    getFetchMore: (lastPage, allPages) => lastPage.next_page,
  });

  // TODO: pull out into a constants.js helper function
  const getSortObject = (toFind, objArry) => {
    const item = objArry.find(({ value, label }) => {
      if ([value, label].includes(toFind)) {
        return { value, label };
      }
      return null;
    });
    return item ? item : onSortChange(sortOptions[0]);
  };

  const onSortChange = ({ value, label }) => {
    console.log("On Sort - Set: ", value, label);
    setParams({ ...params, sortby: label });
  };

  const toggleShowFilters = () => setShowFilterMenu(!showFilterMenu);

  const onApplyFilters = (filterState) => {
    console.log("onApplyFilters: newFilterState: ", filterState);
    // const updatedParams = { ...params, ...filterState }; // TODO: need to spread together??
    setParams(filterState);
    setShowFilterMenu(false);
  };

  useEffect(() => {
    const { label } = getSortObject(params.sortby, sortOptions);
    const queryString = qs.stringify({ sortby: label, ...params }, qsOptions);
    navigate("/discover?" + queryString);
  }, [navigate, params]); // TODO: need to useCallback or useMemo on getSortObject, sortOptions

  // toolbar data
  const listData = {
    name: "Discover",
    movie_count: data ? data[0].count : "#", // data?.count || "-",
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
      <DiscoveryToolbar
        listData={listData}
        filterMenuIsOpen={showFilterMenu}
        toggleShowFilters={toggleShowFilters}
        filterState={params}
        onApplyFilters={onApplyFilters}
        sortOptions={sortData}
      />
      <MovieList
        movies={
          data && data.reduce((acc, page) => [...acc, ...page.results], [])
        }
        isLoading={status === "loading"}
        isError={error}
        // dateType={type}
      />
      <LoadMoreButton
        // ref={loadMoreButtonRef}
        onClick={() => fetchMore()}
        hidden={!canFetchMore}
        disabled={isFetchingMore}
      >
        {isFetching ? "Loading..." : "Show More"}
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
