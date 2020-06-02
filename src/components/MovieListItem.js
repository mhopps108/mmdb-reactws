import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import lazySizes from "lazysizes";

const StyledMovieListItem = styled.div`
  background: white;
  max-width: 400px;
  height: 128px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const MovieListItemLayout = styled.div`
  display: grid;
  grid-template-areas: "poster infowrap";
  grid-template-columns: 85px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 8px;
  width: 100%;
  height: 100%;
`;

const Poster = styled.img`
  grid-area: poster;
  align-self: center;
  margin-left: 5px;
  width: 80px;
  height: 120px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const InfoWrap = styled.div`
  grid-area: infowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 4px;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  line-height: 1.25rem;
  max-height: 2.5rem;
  overflow: hidden;
  white-space: normal;
  margin-bottom: 12px;
  & a {
    text-decoration: none;
    color: #333;
  }
`;

const InfoRow = styled.div`
  display: flex;
  color: grey;
  margin-bottom: 8px;
  font-size: 0.8rem;
  padding-left: 4px;
`;

const InfoItem = styled.div`
  padding-right: 12px;
`;

const InfoList = ({ year, runtime, certification, imdb_rating_avg }) => {
  return (
    <>
      {year && <InfoItem>{year}</InfoItem>}
      <InfoItem>
        {runtime || "0"}
        <small> mins</small>
      </InfoItem>

      <InfoItem>{certification || "-"}</InfoItem>

      <InfoItem>
        {imdb_rating_avg || "0.0"}
        <small> /10</small>
      </InfoItem>
    </>
  );
};

const GenreList = ({ genres }) => {
  return genres.splice(0, 3).map((genre, index) => {
    if (genre === "Science Fiction") {
      genre = "Sci-Fi";
    }
    return <InfoItem key={index}>{genre}</InfoItem>;
  });
};

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
        {/*<Poster src={poster_url} />*/}
        <Poster data-src={poster_url} className="lazyload" />
        <InfoWrap>
          <Title>
            <Link to={`/movie/${imdb_id}`}>{title}</Link>
          </Title>
          <InfoRow>
            <InfoList
              year={year}
              runtime={runtime}
              certification={certification}
              imdb_rating_avg={imdb_rating_avg}
            />
          </InfoRow>
          <InfoRow>
            <GenreList genres={genres} />
          </InfoRow>
          {/*<InfoRow>{genres && <GenreList genres={genres} />}</InfoRow>*/}
        </InfoWrap>
      </MovieListItemLayout>
    </StyledMovieListItem>
  );
}

export default MovieListItem;
