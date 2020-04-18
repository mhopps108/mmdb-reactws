import React from "react";
import styled from "styled-components/macro";
// import MovieListItem from "./MovieListItem";
import { device } from "../devices";

const StyledMoviePosterListItem = styled.div`
  //display: flex;
  background: black;
`;

const MoviePosterItem = styled.img`
  //max-width: 220px;
  width: 100%;
  height: 100%;
  //border-radius: 4px;
  //border: 1px solid #555;
  @media ${device.min.small} {
    //width: 180px;
    //height: 270px;
  }
`;

const MoviePosterListItem = ({ movie }) => {
  return (
    <StyledMoviePosterListItem>
      <MoviePosterItem src={movie.poster_url} />
    </StyledMoviePosterListItem>
  );
};

export default function MoviePosterList({ movies, isLoading, isError }) {
  return (
    <StyledMoviePosterList>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && movies && (
        <MoviePosterListLayout>
          {(movies || []).map((movie) => (
            <MoviePosterListItem key={movie.imdb_id} movie={movie} />
          ))}
        </MoviePosterListLayout>
      )}
    </StyledMoviePosterList>
  );
}

const StyledMoviePosterList = styled.div`
  grid-area: main;
  background-color: lightgray;
  //display: grid;
  //grid-gap: 10px;
  //grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  //grid-template-columns: repeat(auto-fill, 200px);
`;

const MoviePosterListLayout = styled.div`
  display: grid;
  //grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  //grid-template-columns: repeat(auto-fill, minmax(100px, 200px));
  //grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  //justify-content: center;
  //padding: 10px;
  //display: flex;
  //flex-direction: row;
  //flex-wrap: wrap;
  //justify-content: center;

  @media ${device.min.small} {
    //width: 180px;
    grid-template-columns: repeat(6, 1fr);
    //height: 270px;
  }
`;
