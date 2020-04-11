import React, { useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import { useDataApi } from "../useDataApi";
import MovieListItem from "./MovieListItem";

const StyledMain = styled.div`
  background-color: lightgray;
  grid-area: main;
  height: calc(100vh - 100px);
  overflow: scroll;
`;

const MovieListLayout = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(333px, 1fr));
  justify-content: center;
  padding: 10px;
`;

export default function Main() {
  let { slug } = useParams();
  slug = slug || "tmdb-popular"; // temp to fill '/' Route
  const listUrl = `https://www.matthewhopps.com/api/list/${slug}/`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  const { name, source, movie_count, movielistitems } = data;

  useEffect(() => {
    setUrl(listUrl);
  }, [slug, listUrl, setUrl]);

  useEffect(() => {
    console.log(`List state data ${slug}`);
    console.log(state);
  }, [state, slug]);
  return (
    <StyledMain>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <MovieListLayout>
          {(movielistitems || []).map(movie => (
            <MovieListItem key={movie.movie.imdb_id} movie={movie.movie} />
          ))}
        </MovieListLayout>
      )}
    </StyledMain>
  );
}
