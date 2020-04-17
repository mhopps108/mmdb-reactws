import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataApi } from "../useDataApi";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import "boxicons";
import {
  Flex,
  StyledMovieDetail,
  MDBasicsWrap,
  BackdropImage,
  PosterImage,
  Title,
  MDBasics,
  InfoRow,
  BorderedTag,
  StyledRatings,
  StyledRating,
  Small,
  RatingAvg,
  SectionHeader,
  MainWrap,
  StyledReleaseDate,
  StyledRatingsWrap,
  StyledReleaseDatesWrap,
  StyledOverviewWrap,
  StyledTrailerWrap,
  StyledSimilarWrap,
  HorizontalScroll,
  ScrollPoster,
  ScrollPosterTag,
  HorizontalScrollItem,
  StyledRecommendedWrap,
  StyledCreditsWrap,
  ScrollCreditPoster,
  ScrollCreditPosterTag,
} from "./MovieDetailStyled";

export default function MovieDetail() {
  let { imdbId } = useParams();
  const movieUrl = `https://www.matthewhopps.com/api/movie/${imdbId}/`;
  const [state, setUrl] = useDataApi(movieUrl, []);
  const { data, isLoading, isError } = state;

  useEffect(() => {
    setUrl(movieUrl);
  }, [imdbId, movieUrl, setUrl]);

  useEffect(() => {
    console.log(`State - (MovieDetail) - useParams= ${imdbId}`);
    console.log(state);
  }, [state, imdbId]);

  return (
    <StyledMovieDetail>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <>
          <BackdropImage url={data.backdrop_url} />
          <Basics data={data} />
          <MainWrap>
            <Ratings data={data} />
            <ReleaseDates data={data} />
            <Overview data={data} />
            <Trailer data={data} />
            <Credits data={data} />
            <Similar data={data} />
            <Recommended data={data} />
            {/*<ExternalLinks data={data} />*/}
          </MainWrap>
        </>
      )}
    </StyledMovieDetail>
  );
}

function Basics({ data }) {
  const {
    title,
    year,
    runtime,
    certification,
    genres,
    budget,
    revenue,
    poster_url,
  } = data;

  return (
    <MDBasicsWrap>
      <PosterImage src={poster_url} />
      <MDBasics>
        <Title>{title}</Title>
        <InfoRow>
          {year && <div>{year}</div>}
          {runtime && <div>{runtime}m</div>}
          {certification && <div>{certification}</div>}
        </InfoRow>
        <InfoRow>
          {genres &&
            genres.map((genre, index) => {
              return <div key={index}>{genre}</div>;
            })}
        </InfoRow>
      </MDBasics>
    </MDBasicsWrap>
  );
}

function Ratings({ data }) {
  const {
    imdb_rating_avg,
    imdb_rating_count,
    tmdb_rating_avg,
    tmdb_rating_count,
  } = data;

  return (
    <StyledRatingsWrap>
      <SectionHeader>Ratings</SectionHeader>
      <StyledRatings>
        <StyledRating>
          <BorderedTag>IMDb</BorderedTag>
          <RatingAvg>
            {imdb_rating_avg}
            <Small>/10</Small>
          </RatingAvg>
          <Small>{`${imdb_rating_count} votes`}</Small>
        </StyledRating>

        <StyledRating>
          <BorderedTag>TMDb</BorderedTag>
          <RatingAvg>
            {tmdb_rating_avg}
            <Small>/10</Small>
          </RatingAvg>
          <Small>{`${tmdb_rating_count} votes`}</Small>
        </StyledRating>
      </StyledRatings>
    </StyledRatingsWrap>
  );
}

function ReleaseDates({ data }) {
  const {
    theatrical_release,
    digital_release,
    physical_release,
    tv_release,
  } = data;

  return (
    <StyledReleaseDatesWrap>
      <SectionHeader>Release Dates</SectionHeader>
      {theatrical_release && (
        <StyledReleaseDate>
          <BorderedTag>Theatrical</BorderedTag>
          {new Date(theatrical_release).toDateString()}
        </StyledReleaseDate>
      )}
      {digital_release && (
        <StyledReleaseDate>
          <BorderedTag>Digital</BorderedTag>
          {new Date(digital_release).toDateString()}
        </StyledReleaseDate>
      )}
      {physical_release && (
        <StyledReleaseDate>
          <BorderedTag>Physical</BorderedTag>
          {new Date(physical_release).toDateString()}
        </StyledReleaseDate>
      )}
      {tv_release && (
        <StyledReleaseDate>
          <BorderedTag>TV</BorderedTag>
          {new Date(tv_release).toDateString()}
        </StyledReleaseDate>
      )}
    </StyledReleaseDatesWrap>
  );
}

function Overview({ data }) {
  const { overview, tagline } = data;
  return (
    <StyledOverviewWrap>
      <SectionHeader>Overview</SectionHeader>
      {/* {tagline && <small style={{ textAlign: "center" }}>{tagline}</small>} */}
      {overview && <p>{overview}</p>}
    </StyledOverviewWrap>
  );
}

function Trailer({ data }) {
  const { trailer_url, title } = data;
  const youtube_src = `${trailer_url}?controls=1`;

  return (
    <StyledTrailerWrap>
      <SectionHeader>Trailer</SectionHeader>
      {trailer_url && (
        <div>
          <iframe title={title} src={youtube_src} />
        </div>
      )}
    </StyledTrailerWrap>
  );
}

function Similar({ data }) {
  const { similar } = data;
  return (
    <StyledSimilarWrap>
      <SectionHeader>Similar</SectionHeader>
      <HorizontalScroll>
        {similar &&
          similar.map((item) => {
            const { imdb_id, title, poster_url } = item;
            return (
              <HorizontalScrollItem key={imdb_id}>
                <Link to={`/movie/${imdb_id}`} key={imdb_id}>
                  <ScrollPoster src={poster_url} alt={title} />
                  <ScrollPosterTag>{title}</ScrollPosterTag>
                </Link>
              </HorizontalScrollItem>
            );
          })}
      </HorizontalScroll>
    </StyledSimilarWrap>
  );
}

function Recommended({ data }) {
  const { recommended } = data;
  return (
    <StyledRecommendedWrap>
      <SectionHeader>Recommended</SectionHeader>
      <HorizontalScroll>
        {recommended &&
          recommended.map((item) => {
            const { imdb_id, title, poster_url } = item;
            return (
              <HorizontalScrollItem key={imdb_id}>
                <Link to={`/movie/${imdb_id}`} key={imdb_id}>
                  <ScrollPoster src={poster_url} alt={title} />
                  <ScrollPosterTag>{title}</ScrollPosterTag>
                </Link>
              </HorizontalScrollItem>
            );
          })}
      </HorizontalScroll>
    </StyledRecommendedWrap>
  );
}

function Credits({ data }) {
  const { credits } = data;
  return (
    <StyledCreditsWrap>
      <SectionHeader>Credits</SectionHeader>
      <HorizontalScroll>
        {credits &&
          credits.map((item, index) => {
            const { order, character, actor } = item;
            return (
              <HorizontalScrollItem key={index}>
                <ScrollCreditPoster src={actor.profile_url} alt={actor.name} />
                <ScrollCreditPosterTag>{actor.name}</ScrollCreditPosterTag>
                <ScrollCreditPosterTag>{character}</ScrollCreditPosterTag>
              </HorizontalScrollItem>
            );
          })}
      </HorizontalScroll>
    </StyledCreditsWrap>
  );
}

function ExternalLinks({ data }) {
  const { imdb_id, tmdb_id, homepage_url, trailer_url } = data;

  return (
    <>
      <h4 className="detail-section-header">Links</h4>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {imdb_id && (
          <a href={`https://www.imdb.com/title/${imdb_id}`} target={"_blank"}>
            <img
              src={
                "https://uploads.codesandbox.io/uploads/user/906db8ec-ac6e-47bb-a465-6d94f13116ce/j2yP-imdb-icon.png"
              }
              style={{ height: "50px" }}
              alt="asdf"
            />
          </a>
        )}
        {tmdb_id && (
          <a
            href={`https://www.themoviedb.com/movie/${tmdb_id}`}
            target={"_blank"}
          >
            <img
              src={
                "https://uploads.codesandbox.io/uploads/user/906db8ec-ac6e-47bb-a465-6d94f13116ce/ENPU-tmdb-icon.png"
              }
              style={{ height: "30px" }}
              alt="asdf"
            />
          </a>
        )}
        {/* {homepage_url && (
          <a href={homepage_url} target={"_blank"}>
            <HomeOutlined style={{ fontSize: "30px", color: "#333" }} />
          </a>
        )}
        {trailer_url && (
          <a href={trailer_url} target={"_blank"}>
            <YoutubeOutlined style={{ fontSize: "30px", color: "#333" }} />
          </a>
        )} */}
      </div>
    </>
  );
}
