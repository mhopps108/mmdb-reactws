import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataApi } from "../useDataApi";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import "boxicons";

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  width: 100%;
`;

const MovieDetailWrap = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100%;
`;

const BackdropImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.url});
  background-position: center 25%;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: inset 0px -40px 20px 2px rgba(0, 0, 0, 0.85);
`;

const BasicsWrap = styled.div`
  display: flex;
  //margin-top: -45px;
`;

const PosterImage = styled.div`
  width: 120px;
  height: 180px;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 4px;
  border: 1px solid #555;
`;

const Title = styled.h1`
  font-size: 24px;
`;

export { Flex, MovieDetailWrap, BackdropImage, BasicsWrap, PosterImage, Title };

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
    <MovieDetailWrap>
      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <>
          <BackdropImage url={data.backdrop_url} />
          <Basics data={data} />
          <Ratings data={data} />
          <ReleaseDates data={data} />
          <Overview data={data} />
          <Trailer data={data} />
          <Similar data={data} />
          <Recommended data={data} />
          <Credits data={data} />
          <ExternalLinks data={data} />

          {/*
          <Ratings data={data} />
          <ReleaseDates data={data} />
          <Overview data={data} />
          <Trailer data={data} />
          <Similar data={data} />
          <Recommended data={data} />
          <Credits data={data} />
          <ExternalLinks data={data} />

          <div className="col-12 d-flex pl-4 pb-5 flex-column"></div>
          */}
        </>
      )}
    </MovieDetailWrap>
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
    <BasicsWrap>
      <PosterImage url={poster_url} />
      <Flex column>
        <Title>{title}</Title>
        <Flex column>
          <Flex>
            {year && <div>{year}</div>}
            {runtime && <div>{runtime}m</div>}
            {certification && <div>{certification}</div>}
          </Flex>
          <Flex>
            {genres &&
              genres.map((genre, index) => {
                return <div key={index}>{genre}</div>;
              })}
          </Flex>
        </Flex>
      </Flex>
    </BasicsWrap>
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
    <>
      <h4 className="detail-section-header">Ratings</h4>

      <div className="d-flex flex-row" style={{ fontSize: "1rem" }}>
        <div className="d-flex w-50 p-0 mb-3 m-0 align-items-center">
          <div
            className="mr-2"
            style={{
              color: "#ccc",
              backgroud: "#222",
              border: "1px solid #444",
              borderRadius: "5px",
              padding: "6px 8px",
            }}
          >
            IMDb
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center" style={{}}>
              {imdb_rating_avg}
              <div className="ml-1" style={{ fontSize: "0.7rem" }}>
                /10
              </div>
            </div>

            <div classname="" style={{ color: "#aaa", fontSize: "0.75rem" }}>
              {`${imdb_rating_count} votes`}
            </div>
          </div>
        </div>

        <div className="d-flex w-50 p-0 mb-3 m-0 align-items-center">
          <div
            className="mr-2"
            style={{
              color: "#ccc",
              backgroud: "#222",
              border: "1px solid #444",
              borderRadius: "5px",
              padding: "6px 5px",
            }}
          >
            TMDb
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center" style={{}}>
              {tmdb_rating_avg}
              <div className="ml-1" style={{ fontSize: "0.7rem" }}>
                /10
              </div>
            </div>

            <div classname="" style={{ fontSize: "0.75rem" }}>
              {`${tmdb_rating_count} votes`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ReleaseDates({ data }) {
  const {
    theatrical_release,
    digital_release,
    physical_release,
    tv_release,
  } = data;

  // const Release = rd => {
  //   return <div>{rd}</div>;
  // };

  return (
    <>
      <h4 className="detail-section-header">Release Dates</h4>
      <div>
        {theatrical_release && (
          <div className="d-flex align-items-center mb-3">
            <div
              className="mr-2"
              style={{
                color: "#ccc",
                backgroud: "#222",
                border: "1px solid #444",
                borderRadius: "5px",
                padding: "2px 5px",
              }}
            >
              Theatrical
            </div>
            {new Date(theatrical_release).toDateString()}
          </div>
        )}
        {digital_release && (
          <div className="d-flex align-items-center mb-3">
            <div
              className="mr-2"
              style={{
                color: "#ccc",
                backgroud: "#222",
                border: "1px solid #444",
                borderRadius: "5px",
                padding: "2px 17px",
              }}
            >
              Digital
            </div>
            {new Date(digital_release).toDateString()}
          </div>
        )}
        {physical_release && (
          <div className="d-flex align-items-center mb-3">
            <div
              className="mr-2"
              style={{
                color: "#ccc",
                backgroud: "#222",
                border: "1px solid #444",
                borderRadius: "5px",
                padding: "2px 12px",
              }}
            >
              Physical
            </div>
            {new Date(physical_release).toDateString()}
          </div>
        )}
        {tv_release && <div>TV: {tv_release}</div>}
      </div>
    </>
  );
}

function Overview({ data }) {
  const { overview, tagline } = data;
  return (
    <>
      <h4 className="detail-section-header">Overview</h4>
      {/* {tagline && <small style={{ textAlign: "center" }}>{tagline}</small>} */}
      {overview && <p style={{}}>{overview}</p>}
    </>
  );
}

function Trailer({ data }) {
  const { trailer_url, title } = data;
  const youtube_src = `${trailer_url}?controls=1`;

  return (
    <>
      <h4 className="detail-section-header">Trailer</h4>
      {trailer_url && (
        <div class="embed-responsive embed-responsive-16by9">
          <iframe
            class="embed-responsive-item"
            title={title}
            src={youtube_src}
          />
        </div>
      )}
    </>
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
