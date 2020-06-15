import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useHistory } from "react-router-dom";
import {
  Header,
  Sidebar,
  Toolbar,
  MovieList,
  MoviePosterList,
  NavMenu,
  DiscoveryMenu,
  FilterMenu,
  DiscoveryToolbar,
} from "../components";
import styled, { css } from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import { device } from "../devices";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export const queryToFilterState = (queryParams) => {
  if (!queryParams) return null;
  return {
    orderby: "-imdb_rating_avg,-imdb_rating_count",
    genres: queryParams.get("genres").split(","),
    certs: queryParams.get("certification").split(","),
    ratings: [
      parseFloat(queryParams.get("imdb_rating_avg__gte")),
      parseFloat(queryParams.get("imdb_rating_avg__lte")),
    ],
    votes: [0, parseInt(queryParams.get("imdb_rating_count__gte"))],
    years: [
      parseFloat(queryParams.get("year__gte")),
      parseFloat(queryParams.get("year__lte")),
    ],
  };
};

export default function Discover({ navMenuVisible, toggleNavMenu }) {
  let history = useHistory();
  let queryParams = useQueryParams();

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  // const [showFilterMenu, setShowFilterMenu] = useState(true);
  const [queryString, setQueryString] = useState(queryParams.toString());

  const listUrl = `https://www.matthewhopps.com/api/discover?${queryString}`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;

  const toggleShowFilters = () => setShowFilterMenu(!showFilterMenu);

  const onApplyFilters = (queryString) => {
    toggleShowFilters();
    history.push(`/discovery?${queryString}`);
  };

  const activeFiltersString = () => {
    // return {
    //   orderby: "-imdb_rating_avg,-imdb_rating_count",
    //   genres: queryParams.get("genres").split(","),
    //   certs: queryParams.get("certification").split(","),
    //   ratings: [
    //     parseFloat(queryParams.get("imdb_rating_avg__gte")),
    //     parseFloat(queryParams.get("imdb_rating_avg__lte")),
    //   ],
    //   votes: [0, parseInt(queryParams.get("imdb_rating_count__gte"))],
    //   years: [
    //     parseFloat(queryParams.get("year__gte")),
    //     parseFloat(queryParams.get("year__lte")),
    //   ],
    // };
  };

  useEffect(() => {
    console.log(
      "queryToFilterState--DISCOVERY",
      queryToFilterState(queryParams)
    );
    setQueryString(queryParams.toString());
  }, [queryParams]);

  useEffect(() => {
    setUrl(listUrl);
  }, [queryString, listUrl, setUrl]);

  useEffect(() => {
    console.log(`Discovery state data`);
    console.log(state);
    console.log(queryString);
  }, [state, queryString]);

  const listData = {
    name: "Discovery",
    movie_count: data?.count || "-",
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
        queryString={queryString}
      />

      {/*<DiscoveryToolbar*/}
      {/*  listData={listData}*/}
      {/*  toggleShowFilters={toggleShowFilters}*/}
      {/*>*/}
      {/*  <FilterMenu*/}
      {/*    isOpen={showFilters}*/}
      {/*    toggleOpen={toggleShowFilters}*/}
      {/*    setQuery={setQueryString}*/}
      {/*    filterState={queryToFilterState(queryParams)}*/}
      {/*    onApplyFilters={onApplyFilters}*/}
      {/*  />*/}
      {/*</DiscoveryToolbar>*/}
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
