import React from "react";
import styled from "styled-components/macro";
import { MovieListItem } from "../components";

export default function MovieList({
  movies,
  isLoading,
  isError,
  dateType = "year",
}) {
  // console.log("MovieList: dateType: ", dateType);
  return (
    <StyledMovieList>
      {isError && <p>Error</p>}
      {movies && (
        <MovieListLayout>
          {(movies || []).map((movie) => (
            <MovieListItem
              key={movie.imdb_id}
              movie={movie}
              dateType={dateType}
            />
          ))}
        </MovieListLayout>
      )}
      {isLoading && (
        <div style={{ color: "red", height: "40px", background: "grey" }}>
          <p>Loading movies...</p>
        </div>
      )}
    </StyledMovieList>
    // <StyledMovieList>
    //   {isError && <p>Error</p>}
    //   {isLoading && <p>Loading movies...</p>}
    //   {!isLoading && movies && (
    //     <MovieListLayout>
    //       {(movies || []).map((movie) => (
    //         <MovieListItem
    //           key={movie.imdb_id}
    //           movie={movie}
    //           dateType={dateType}
    //         />
    //       ))}
    //     </MovieListLayout>
    //   )}
    // </StyledMovieList>
  );
}

const StyledMovieList = styled.div`
  grid-area: main;
  background: #33425b;
  display: grid;
`;

const MovieListLayout = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  justify-content: center;
  padding: 10px;
`;
