import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";

const StyledMovieListItem = styled.div`
  display: flex;
  padding: 4px;
  background: white;
  /* height: 150px; */
  height: 125px;
  /* min-width: 350px; */
  max-width: 400px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const Poster = styled.div`
  /* min-width: 92px; */
  min-width: 80px;
  /* height: 138px; */
  height: 100%;
  background-image: url(${(props) => props.url});
  // objectFit: contain;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

// className="w-100 pl-3 pt-1 "
const DetailsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  /* margin: 10px; */
  padding: 8px;
`;

const Title = styled.h6`
  font-size: 1.1rem;
  color: #555;
  overflow: hidden;
  line-height: 1.25rem;
  max-height: 2.5rem;
  white-space: normal;
  //padding: 1px;
  margin-bottom: 12px;
  & a {
    text-decoration: none;
    color: #222;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  color: grey;
  font-size: 0.8rem;
`;

const DetailRow = styled.div`
  display: flex;
  /* padding: 8px 0; */
  margin-bottom: 8px;
`;

const DetailItem = styled.p`
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
    <>
      <StyledMovieListItem>
        <Poster url={poster_url} />
        <DetailsWrap>
          <Title>
            <Link to={`/movie/${imdb_id}`}>{title}</Link>
          </Title>
          <Details>
            <DetailRow>
              <DetailItem>{year}</DetailItem>
              <DetailItem>
                {runtime}
                <small> mins</small>
              </DetailItem>
              <DetailItem>{certification}</DetailItem>
              <DetailItem>
                {imdb_rating_avg}
                <small> /10</small>
              </DetailItem>
            </DetailRow>
            <DetailRow>
              {genres &&
                genres.map((genre, index) => {
                  return <DetailItem key={index}>{genre}</DetailItem>;
                })}
            </DetailRow>
          </Details>
        </DetailsWrap>
      </StyledMovieListItem>
    </>
  );
}

export default MovieListItem;
