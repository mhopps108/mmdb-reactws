import React, { useEffect } from "react";
// import { useParam } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Header,
  Sidebar,
  Toolbar,
  MovieList,
  MoviePosterList,
  NavMenu,
} from "../components";
import styled, { css } from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import { device } from "../devices";

export default function List({
  sidebarVisible,
  toggleSidebar,
  navMenuVisible,
  toggleNavMenu,
  view = "list",
}) {
  // export default function List(props) {
  let { slug } = useParams();
  slug = slug || "tmdb-popular";
  const listUrl = `https://www.matthewhopps.com/api/list/${slug}/`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  // const { name, source, movie_count, movielistitems } = data;

  useEffect(() => {
    setUrl(listUrl);
  }, [slug, listUrl, setUrl]);

  useEffect(() => {
    console.log(`List state data ${slug}`);
    console.log(state);
  }, [state, slug]);

  return (
    <StyledList>
      <Header toggleSidebar={toggleSidebar} toggleNavMenu={toggleNavMenu} />
      <NavMenu isOpen={navMenuVisible} toggleOpen={toggleNavMenu} />
      <Toolbar listData={data} />
      {view === "poster" && (
        <MoviePosterList
          movies={(data?.movielistitems || []).map((item) => item.movie)}
          isLoading={isLoading}
          isError={isError}
        />
      )}
      {view === "list" && (
        <MovieList
          movies={(data?.movielistitems || []).map((item) => item.movie)}
          isLoading={isLoading}
          isError={isError}
        />
      )}
    </StyledList>
  );
}

const StyledList = styled.div`
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

  // @media ${device.min.desktop} {
  //   grid-template-areas:
  //     "header header"
  //     "sidebar toolbar"
  //     "sidebar main";
  //   grid-template-columns: 200px 1fr;
  //   grid-template-rows: 55px auto 1fr;
  // }
`;
