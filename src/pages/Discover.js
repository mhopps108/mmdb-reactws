import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Header,
  Sidebar,
  Toolbar,
  MovieList,
  MoviePosterList,
  NavMenu,
  DiscoveryMenu,
  FilterMenu,
} from "../components";
import styled, { css } from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import { device } from "../devices";

export default function Discover({ navMenuVisible, toggleNavMenu }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [queryString, setQueryString] = useState("");

  const listUrl = `https://www.matthewhopps.com/api/movie?${queryString}`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleShowFilters = () => setShowFilters(!showFilters);

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
      <NavMenu isOpen={navMenuVisible} toggleOpen={toggleNavMenu} />
      <Toolbar listData={listData} filter={toggleShowFilters}>
        <FilterMenu
          isOpen={showFilters}
          toggleOpen={toggleShowFilters}
          setQuery={setQueryString}
        />
      </Toolbar>
      <MovieList
        movies={data?.results}
        isLoading={isLoading}
        isError={isError}
      />
      <DiscoveryMenu isOpen={menuOpen} toggleOpen={toggleMenu} />
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
