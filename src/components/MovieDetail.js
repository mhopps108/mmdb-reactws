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
  SectionWrap,
  StyledReleaseDate,
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
            {/*<Similar data={data} />*/}
            {/*<Recommended data={data} />*/}
            {/*<Credits data={data} />*/}
            <ExternalLinks data={data} />
          </MainWrap>

          {/*<BackdropImage url={data.backdrop_url} />*/}
          {/*<Basics data={data} />*/}
          {/*<Ratings data={data} />*/}
          {/*<ReleaseDates data={data} />*/}
          {/*<Overview data={data} />*/}
          {/*<Trailer data={data} />*/}
          {/*<Similar data={data} />*/}
          {/*<Recommended data={data} />*/}
          {/*<Credits data={data} />*/}
          {/*<ExternalLinks data={data} />*/}
          {/*<div className="col-12 d-flex pl-4 pb-5 flex-column"></div>*/}
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
    <SectionWrap>
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
    </SectionWrap>
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
    <SectionWrap>
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
    </SectionWrap>
  );
}

function Overview({ data }) {
  const { overview, tagline } = data;
  return (
    <SectionWrap>
      <SectionHeader>Overview</SectionHeader>
      {/* {tagline && <small style={{ textAlign: "center" }}>{tagline}</small>} */}
      {overview && <p style={{}}>{overview}</p>}
    </SectionWrap>
  );
}

function Trailer({ data }) {
  const { trailer_url, title } = data;
  const youtube_src = `${trailer_url}?controls=1`;

  return (
    <SectionWrap>
      <SectionHeader>Trailer</SectionHeader>
      {trailer_url && (
        <div class="embed-responsive embed-responsive-16by9">
          <iframe
            class="embed-responsive-item"
            title={title}
            src={youtube_src}
          />
        </div>
      )}
    </SectionWrap>
  );
}

function Similar({ data }) {
  const { similar } = data;
  return (
    <>
      <h4 className="detail-section-header">Similar</h4>

      <div className="d-flex align-content-center flex-nowrap overflow-auto">
        {similar &&
          similar.map((item) => {
            const { imdb_id, title, poster_url } = item;
            return (
              <Link to={`/movie/${imdb_id}`} key={imdb_id}>
                <div className="d-flex flex-column mr-2">
                  <img
                    style={{
                      minWidth: "80px",
                      height: "120px",
                      borderRadius: "4px",
                      border: "1px solid #555",
                    }}
                    src={poster_url}
                    class="img-fluid"
                    alt={title}
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      overflow: "hidden",
                      lineHeight: "1.2em",
                      height: "2.4em",
                      color: "#cdcdcd",
                    }}
                    className="my-1"
                  >
                    {title}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

function Recommended({ data }) {
  const { recommended } = data;
  return (
    <>
      <h4 className="detail-section-header">Recommended</h4>

      <div className="d-flex align-content-center flex-nowrap overflow-auto">
        {recommended &&
          recommended.map((item) => {
            const { imdb_id, title, poster_url } = item;
            return (
              <Link to={`/movie/${imdb_id}`} key={imdb_id}>
                <div className="d-flex flex-column mr-2">
                  <img
                    style={{
                      minWidth: "80px",
                      height: "120px",
                      borderRadius: "4px",
                      border: "1px solid #555",
                    }}
                    src={poster_url}
                    class="img-fluid"
                    alt={title}
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      overflow: "hidden",
                      lineHeight: "1.2em",
                      height: "2.4em",
                      color: "#cdcdcd",
                    }}
                    className="my-1"
                  >
                    {title}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

function Credits({ data }) {
  const { credits } = data;
  return (
    <>
      <h4 className="detail-section-header">Credits</h4>
      <div style={{ height: "200px" }}>
        <ul
          style={{
            listStyleType: "none",
            height: "100%",
            padding: "0px 10px 16px 0px",
            cursor: "pointer",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            display: "flex",
            boxShadow: "inset -20px 0px 20px 2px rgba(0,0,0,0.85)",
            zIndex: "5",
          }}
        >
          {credits &&
            credits.map((item, index) => {
              const { order, character, actor } = item;
              return (
                <li
                  key={index}
                  style={{
                    padding: "0px 10px 0px 0px",
                    width: "80px",
                  }}
                >
                  <div
                    style={{
                      width: "67px",
                      height: "100px",
                      backgroundImage: `url(${actor.profile_url})`,
                      // objectFit: "contain"
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  />
                  <div
                    style={{
                      overflow: "hidden",
                      lineHeight: "1.2em",
                      height: "4.8em",
                      whiteSpace: "normal",
                    }}
                  >
                    <p className="p-0 m-0" style={{ fontSize: "0.75rem" }}>
                      {actor.name}
                    </p>
                    <p className="p-0 m-0" style={{ fontSize: "0.65rem" }}>
                      {character}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
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
