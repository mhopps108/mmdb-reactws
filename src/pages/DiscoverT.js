import React, { useState, useEffect, useRef, useReducer } from "react";
import {
  useParams,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import moment from "moment";
import qs from "query-string";

import { Header, DiscoveryToolbar, MovieList } from "../components";
import { useDataApi } from "../useDataApi";
import API from "../api/api";
import { useQueryParams, useIntersectionObserver } from "../hooks";
import { discoverySortOptions } from "../constants";

// TODO: remove filter from url if not used??

export const queryToFilterState = (queryParams) => {
  if (!queryParams) return null;
  return {
    // sortby: queryParams.get("sortby"),
    genres:
      (queryParams.get("genres") && queryParams.get("genres").split(",")) || "",
    certification:
      (queryParams.get("certification") &&
        queryParams.get("certification").split(",")) ||
      [],
    ratings: [
      parseFloat(queryParams.get("rating_min") || 0),
      parseFloat(queryParams.get("rating_max") || 10),
    ],
    votes: [0, parseInt(queryParams.get("votes_min") || 0)],
    years: [
      parseFloat(queryParams.get("year_min") || 1890),
      parseFloat(queryParams.get("year_max") || 2030),
    ],
  };
};

const qsOptions = {
  arrayFormat: "comma",
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: true,
};

export default function DiscoverT() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  let navigate = useNavigate();
  const location = useLocation();
  // console.log("location: ", location);

  const defaultFilters = {
    sortby: "votes",
    genres: [],
    certification: [],
    rating_min: 0.0,
    rating_max: 10.0,
    votes_min: 0,
    year_min: null,
    year_max: undefined,
  };

  const [params, setParams] = useState(qs.parse(location.search, qsOptions));
  console.log("params: ", params);

  useEffect(() => {
    navigate(`/discover/?${qs.stringify(params, qsOptions)}`);
  }, [navigate, params]);

  const p = {
    sortby: "votes",
    genres: ["Comedy", "Action"],
    // certification: ["R", "PG-13"],
    certification: [],
    rating_min: 5.0,
    rating_max: 10.0,
    votes_min: "",
    year_min: null,
    year_max: undefined,
  };

  // useEffect [state]
  //     navigate(/discovery?${sq.stringify(state)})

  // const params = qs.parse(location.search);

  // const parsed = qs.parse(location.search, {
  //   arrayFormat: "comma",
  //   skipNull: true,
  //   skipEmptyString: true,
  //   parseNumbers: true,
  // });
  // console.log("parsed URL: ", parsed);

  // const stringified = qs.stringify(p, {
  //   arrayFormat: "comma",
  //   skipNull: true,
  //   skipEmptyString: true,
  // });
  // const par = qs.parse(stringified, {
  //   arrayFormat: "comma",
  //   skipNull: true,
  //   skipEmptyString: true,
  //   parseNumbers: true,
  // });
  // console.log("stringified p: ", stringified);
  // console.log("parsed  p: ", par);

  // let queryParams = useQueryParams();
  // const initSort = queryParams.get("sortby") || discoverySortOptions[0].value;
  // const [sort, setSort] = useState(initSort);

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  // const [showFilterMenu, setShowFilterMenu] = useState(true);
  // const [queryString, setQueryString] = useState(queryParams.toString());

  // const listUrl = `https://www.matthewhopps.com/api/discover/?sortby=${sort}&${queryString}`;
  const listUrl = `https://www.matthewhopps.com/api/discover/?${qs.stringify(
    params
  )}`;
  console.log("listUrl: ", listUrl);
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;

  const toggleShowFilters = () => setShowFilterMenu(!showFilterMenu);

  const onSortChange = (val) => {
    // setSort(val);
    // queryParams.set("sortby", val);
    // navigate(`/discover/?${queryParams.toString()}`);
    setParams({ ...params, sortby: val });
  };

  const onApplyFilters = (queryString, filterState) => {
    // filter state obj -> stringify it and
    setParams({ ...params, ...filterState });
    setShowFilterMenu(false);
    // console.log("DISCOVERYT - filterState: ", filterState);
    // navigate(`/discover/?sortby=${sort}&${queryString}`);
  };

  useEffect(() => {
    setUrl(listUrl);
  }, [listUrl, setUrl, params]);

  // useEffect(() => {
  // console.log(
  //   "queryToFilterState--DISCOVER",
  //   queryToFilterState(queryParams)
  // );
  // setQueryString(queryParams.toString());
  // }, [queryParams]);

  // useEffect(() => {
  //   setUrl(listUrl);
  // }, [queryString, listUrl, setUrl, sort]);

  // useEffect(() => {
  // console.log(`Discovery state data & queryString & sort`);
  // console.log("state: ", state);
  // console.log("queryString: ", queryString);
  // console.log("sort: ", sort);
  // }, [sort, state, queryString]);

  const listData = {
    name: "Discovery",
    movie_count: data?.count || "-",
  };
  const sortData = {
    sortData: discoverySortOptions,
    // orderByValue: sort,
    orderByValue: params.sort,
    onOrderChange: onSortChange,
  };

  return (
    <StyledDiscover>
      <Header />
      <DiscoveryToolbar
        listData={listData}
        filterMenuIsOpen={showFilterMenu}
        toggleShowFilters={toggleShowFilters}
        // setQuery={setQueryString}
        setQuery={() => console.log("not implemented: setQuery")}
        // filterState={queryToFilterState(queryParams)}
        filterState={params}
        onApplyFilters={onApplyFilters}
        sortOptions={sortData}
      />
      <MovieList
        movies={data?.results}
        isLoading={isLoading}
        isError={isError}
      />
    </StyledDiscover>
  );
}

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
