import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useHistory } from "react-router-dom";
import {
  Header,
  MovieList,
  MoviePosterList,
  NavMenu,
  DiscoveryToolbar,
} from "../components";
import styled, { css } from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import { device } from "../devices";
import { discoverySortOptions } from "../constants";

// TODO: remove filter from url if not used??

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export const queryToFilterState = (queryParams) => {
  if (!queryParams) return null;
  return {
    // sortby: queryParams.get("sortby"),
    genres:
      (queryParams.get("genres") && queryParams.get("genres").split(",")) || "",
    certs:
      (queryParams.get("certification") &&
        queryParams.get("certification").split(",")) ||
      "",
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

export default function Discover({ navMenuVisible, toggleNavMenu }) {
  let history = useHistory();
  let queryParams = useQueryParams();
  const initSort = queryParams.get("sortby") || discoverySortOptions[0].value;
  const [sort, setSort] = useState(initSort);

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  // const [showFilterMenu, setShowFilterMenu] = useState(true);
  const [queryString, setQueryString] = useState(queryParams.toString());

  const listUrl = `https://www.matthewhopps.com/api/discover/?sortby=${sort}&${queryString}`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;

  const toggleShowFilters = () => setShowFilterMenu(!showFilterMenu);
  const onSortChange = (val) => {
    setSort(val);
    // history.push(`/discover/?sortby=${sort}&${queryString}`);
    queryParams.set("sortby", val);
    history.push(`/discover/?${queryParams.toString()}`);
  };
  const onApplyFilters = (queryString) => {
    toggleShowFilters();
    history.push(`/discover/?sortby=${sort}&${queryString}`);
  };

  useEffect(() => {
    console.log(
      "queryToFilterState--DISCOVER",
      queryToFilterState(queryParams)
    );
    setQueryString(queryParams.toString());
  }, [queryParams]);

  useEffect(() => {
    setUrl(listUrl);
  }, [queryString, listUrl, setUrl, sort]);

  useEffect(() => {
    console.log(`Discovery state data & queryString & sort`);
    console.log(state);
    console.log(queryString);
    console.log(sort);
  }, [sort, state, queryString]);

  const listData = {
    name: "Discovery",
    movie_count: data?.count || "-",
  };

  const sortData = {
    sortData: discoverySortOptions,
    orderByValue: sort,
    onOrderChange: onSortChange,
  };

  return (
    <StyledDiscover>
      <Header toggleNavMenu={toggleNavMenu} />
      {/*TODO: move NavMenu inside header*/}
      <NavMenu isOpen={navMenuVisible} toggleOpen={toggleNavMenu} />
      <DiscoveryToolbar
        listData={listData}
        filterMenuIsOpen={showFilterMenu}
        toggleShowFilters={toggleShowFilters}
        setQuery={setQueryString}
        filterState={queryToFilterState(queryParams)}
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
