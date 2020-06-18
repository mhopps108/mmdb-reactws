import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
// import lazySizes from "lazysizes";

const StyledMovieListItem = styled.div`
  background: white;
  max-width: 400px;
  //height: 128px;
  //height: 108px;
  height: 120px;
  border-radius: 4px;
  //border: 1px solid rgba(0, 0, 0, 0.2);
`;

const MovieListItemLayout = styled.div`
  display: grid;
  grid-template-areas: "poster infowrap";
  grid-template-columns: 80px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 8px;
  width: 100%;
  height: 100%;
`;

const Poster = styled.img`
  grid-area: poster;
  align-self: center;
  //margin-left: 5px;
  //width: 80px;
  //height: 120px;
  margin-left: 4px;
  //width: 67px;
  //height: 100px;
  width: 76px;
  height: 114px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const InfoWrap = styled.div`
  grid-area: infowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //padding: 10px 4px;
  padding: 0 6px 0 4px;
`;

const Title = styled.h3`
  //font-size: 1.2rem;
  //line-height: 1.3rem;
  //max-height: 2.4rem;
  font-size: 1.1rem;
  line-height: 1.2rem;
  max-height: 2.4rem;
  overflow: hidden;
  white-space: normal;
  margin-bottom: 12px;
  //margin-bottom: 8px;
  & a {
    text-decoration: none;
    //color: rgba(35, 35, 39, 0.85);
    color: #282c35;
  }
`;

const InfoRow = styled.div`
  display: flex;
  //color: grey;
  //color: rgba(35, 35, 39, 0.7);
  color: rgba(40, 44, 53, 0.75);
  margin-bottom: 4px;
  font-size: 0.9rem;
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
        <small>m</small>
      </InfoItem>
      <InfoItem>{certification || "-"}</InfoItem>
      <InfoItem>{imdb_rating_avg || "0.0"}</InfoItem>
    </>
  );
};

const GenreList = ({ genres }) => {
  if (!genres) return null;
  return genres.splice(0, 3).map((genre, index) => {
    if (genre === "Science Fiction") {
      genre = "Sci-Fi";
    }
    return <InfoItem key={index}>{genre}</InfoItem>;
  });
};

// const GenreList = ({ genres }) => {
//   // console.log(`genres: ${typeof genres}`);
//   console.log(genres);
//
//   const max = genres && genres.length >= 3 ? 3 : genres.length;
//   return genres.splice(0, max).map((genre, index) => {
//     if (genre === "Science Fiction") {
//       genre = "Sci-Fi";
//     }
//     return <InfoItem key={index}>{genre}</InfoItem>;
//   });
// };

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
