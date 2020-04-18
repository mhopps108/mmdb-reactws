import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";

const StyledMovieListItem = styled.div`
  background: white;
  max-width: 400px;
  height: 128px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const MovieListItemLayout = styled.div`
  display: grid;
  grid-template-areas:
    "poster ..."
    "poster title"
    "poster infotoprow"
    "poster infobottomrow"
    "poster ...";
  grid-template-columns: 80px 1fr;
  grid-template-rows: 1fr 2fr 1fr 1fr 1fr;
  grid-column-gap: 15px;
  width: 100%;
  height: 100%;
`;

const Poster = styled.img`
  grid-area: poster;
  width: 80px;
  height: 120px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-left: 4px;
  align-self: center;
`;

const Title = styled.h6`
  grid-area: title;
  font-size: 1.1rem;
  color: #444;
  overflow: hidden;
  line-height: 1.25rem;
  max-height: 2.5rem;
  white-space: normal;
  align-self: center;
  //padding: 1px;
  margin-bottom: 12px;
  & a {
    text-decoration: none;
    color: #222;
  }
  width: 100%;
`;

const InfoRow = styled.div`
  display: flex;
  //margin-bottom: 8px;
  color: grey;
  font-size: 0.8rem;
  //height: 100%;
  //align-self: center;
  width: 100%;
`;

const InfoTopRow = styled(InfoRow)`
  grid-area: infotoprow;
`;

const InfoBottomRow = styled(InfoRow)`
  grid-area: infobottomrow;
`;

const InfoItem = styled.div`
  padding-right: 12px;
`;

function MovieListItem({ movie }) {
  const {
    imdb_id,
    title,
    year,
    runtime,
    certification,
    imdb_rating_avg,
    genres,
    poster_url,
  } = movie;

  return (
    <StyledMovieListItem>
      <MovieListItemLayout>
        <Poster src={poster_url} />
        <Title>
          <Link to={`/movie/${imdb_id}`}>{title}</Link>
        </Title>
        <InfoTopRow>
          <InfoItem>{year}</InfoItem>
          <InfoItem>
            {runtime}
            <small> mins</small>
          </InfoItem>
          <InfoItem>{certification}</InfoItem>
          <InfoItem>
            {imdb_rating_avg}
            <small> /10</small>
          </InfoItem>
        </InfoTopRow>
        <InfoBottomRow>
          {genres &&
            genres.map((genre, index) => {
              return <InfoItem key={index}>{genre}</InfoItem>;
            })}
        </InfoBottomRow>
      </MovieListItemLayout>
    </StyledMovieListItem>
  );
}

export default MovieListItem;
