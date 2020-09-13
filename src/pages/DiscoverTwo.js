import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import qs from "query-string";

import { Header, DiscoverToolbarTwo, MovieList } from "../components";
import API from "../api/api";
import { discoverySortOptions } from "../constants";

const qsOptions = {
  arrayFormat: "comma",
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: true,
  sort: false,
};

export default function DiscoverTwo() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  let navigate = useNavigate();
  const location = useLocation();
  const sortOptions = discoverySortOptions;

  const [params, setParams] = useState(qs.parse(location.search, qsOptions));
  console.log("params: ", params);

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    const { value } = getSortObject(paramKeys.sortby, sortOptions);
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
    // console.log("func - sortObj - called");
    const item = objArry.find(({ value, label }) => {
      if ([value, label].includes(toFind)) {
        return { value, label };
      }
      return null;
    });
    return item ? item : onSortChange(sortOptions[0]);
  };
  // console.log(
  //   `${renderRef.current}: func - sortObj: `,
  //   getSortObject(params.sortby, sortOptions)
  // );

  // const sortObj = useMemo(() => {
  //   console.log("useMemo - sortObj - called");
  //   const item = sortOptions.find(({ value, label }) => {
  //     if ([value, label].includes(params.sortby)) {
  //       return { value, label };
  //     }
  //     return null;
  //   });
  //   return item ? item : "default";
  // }, [params.sortby]);
  //
  // console.log(`${renderRef.current}: useMemo - sortObj: `, sortObj);

  const onSortChange = ({ value, label }) => {
    console.log(`On Sort - Set: ${value} (${label})`);
    setParams({ ...params, sortby: label });
  };

  const onApplyFilters = (filterState) => {
    console.log("onApplyFilters: newFilterState: ", filterState);
    // const updatedParams = { ...params, ...filterState }; // TODO: need to spread together??
    setParams(filterState);
  };

  useEffect(() => {
    const { label } = getSortObject(params.sortby, sortOptions);
    const queryString = qs.stringify({ sortby: label, ...params }, qsOptions);
    navigate("/discover-two?" + queryString);
  }, [navigate, params]); // TODO: need to useCallback or useMemo on getSortObject, sortOptions

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
      <DiscoverToolbarTwo
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
