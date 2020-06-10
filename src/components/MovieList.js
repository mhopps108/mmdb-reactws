import React from "react";
import styled from "styled-components";
import MovieListItem from "./MovieListItem";

export default function MovieList({ movies, isLoading, isError }) {
  return (
    <StyledMovieList>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && movies && (
        <MovieListLayout>
          {(movies || []).map((movie) => (
            <MovieListItem key={movie.imdb_id} movie={movie} />
          ))}
        </MovieListLayout>
      )}
    </StyledMovieList>
  );
}

const StyledMovieList = styled.div`
  grid-area: main;
  //background-color: lightgray;
  background: repeating-linear-gradient(
    45deg,
    rgb(27, 27, 27) 0px,
    rgb(27, 27, 27) 97px,
    rgb(24, 24, 24) 97px,
    rgb(24, 24, 24) 194px,
    rgb(20, 20, 20) 194px,
    rgb(20, 20, 20) 291px
  );
  display: grid;
  box-shadow: 0 0 25px 20px lightgrey;
  //height: calc(100vh - 100px);
  //overflow: scroll;
`;

const MovieListLayout = styled.div`
  display: grid;
  grid-gap: 10px;
  //grid-template-columns: repeat(auto-fill, minmax(333px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  justify-content: center;
  padding: 10px;
`;
