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
} from "../components";
import styled, { css } from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import { device } from "../devices";

export default function Discover({ navMenuVisible, toggleNavMenu }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(`DISCOVER: toggleMenu Clicked - isOpen (${menuOpen})`);
  };

  return (
    <StyledDiscover>
      <Header toggleNavMenu={toggleNavMenu} />
      <NavMenu isOpen={navMenuVisible} toggleOpen={toggleNavMenu} />
      {/*<Toolbar listData={{}} />*/}
      <div>
        <button onClick={toggleMenu}>Filters</button>
      </div>
      <MovieList
        movies={[].map((item) => item.movie)}
        isLoading={false}
        isError={false}
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
