import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataApi } from "../useDataApi";
import styled, { css } from "styled-components/macro";
import { device } from "../devices";
import "boxicons";
import { Progress } from "rsuite";
import lazySizes from "lazysizes";
import moment from "moment";
import twix from "twix";
import { FaTicketAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { IoMdDisc } from "react-icons/io";
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
  Smaller,
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
  RatingProgress,
  RatingsTitle,
} from "./MovieDetailStyled";

const BackgroundBlur = styled.div`
  background-image: url(${(props) => props.url});
  //background-position: center 25%;
  background-size: cover;
  //background-repeat: no-repeat;
`;

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
          {/*<BackgroundBlur url={data.poster_url} />*/}
          <MainWrap url={data.poster_url}>
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
          <div>{runtime || "0"} min</div>
          <div>{certification || "No Rating"}</div>
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
  // TODO: pass array of reviews, arr.map over them

  return (
    <StyledRatingsWrap>
      <SectionHeader>Ratings</SectionHeader>

      <StyledRatings>
        <StyledRating>
          <RatingsTitle>IMDb</RatingsTitle>
          <RatingProgress>
            <Progress.Circle
              percent={imdb_rating_avg * 10 || "0.0"}
              strokeColor="#1f4b99"
              strokeWidth={8}
              trailWidth={8}
            />
          </RatingProgress>
          <Smaller>{`${imdb_rating_count || "No"} votes`}</Smaller>
        </StyledRating>

        <StyledRating>
          <RatingsTitle>TMDb</RatingsTitle>
          <RatingProgress>
            <Progress.Circle
              percent={tmdb_rating_avg * 10 || "0.0"}
              strokeColor="#1f4b99"
              strokeWidth={8}
              trailWidth={8}
            />
          </RatingProgress>
          <Smaller>{`${tmdb_rating_count || "No"} votes`}</Smaller>
        </StyledRating>

        {/*<StyledRating>*/}
        {/*  <BorderedTag>TMDb</BorderedTag>*/}
        {/*  <RatingAvg>*/}
        {/*    {tmdb_rating_avg || "0.0"}*/}
        {/*    <Smaller>/10</Smaller>*/}
        {/*  </RatingAvg>*/}
        {/*  <Smaller>{`${tmdb_rating_count || "0"} votes`}</Smaller>*/}
        {/*</StyledRating>*/}
      </StyledRatings>
    </StyledRatingsWrap>
  );
}

// function Ratings({ data }) {
//   const {
//     imdb_rating_avg,
//     imdb_rating_count,
//     tmdb_rating_avg,
//     tmdb_rating_count,
//   } = data;
//
//   return (
//     <StyledRatingsWrap>
//       <SectionHeader>Ratings</SectionHeader>
//       <StyledRatings>
//         <StyledRating>
//           <BorderedTag>IMDb</BorderedTag>
//           <RatingAvg>
//             {imdb_rating_avg || "0.0"}
//             <Smaller>/10</Smaller>
//           </RatingAvg>
//           <Smaller>{`${imdb_rating_count || "0"} votes`}</Smaller>
//         </StyledRating>
//
//         <StyledRating>
//           <BorderedTag>TMDb</BorderedTag>
//           <RatingAvg>
//             {tmdb_rating_avg || "0.0"}
//             <Smaller>/10</Smaller>
//           </RatingAvg>
//           <Smaller>{`${tmdb_rating_count || "0"} votes`}</Smaller>
//         </StyledRating>
//       </StyledRatings>
//     </StyledRatingsWrap>
//   );
// }

function ReleaseDates({ data }) {
  const {
    theatrical_release,
    digital_release,
    physical_release,
    tv_release,
  } = data;
  // import { FaTicketAlt, FaCloudDownloadAlt } from "react-icons/fa";
  // import { IoMdDisc } from "react-icons/io";

  const ReleaseDate = ({ label, releaseDate, Icon }) => {
    if (!releaseDate) return null;
    return (
      releaseDate && (
        <StyledReleaseDate>
          {/*<BorderedTag>{label}</BorderedTag>*/}
          <Icon />
          {moment(releaseDate).format("MMM Do YYYY")}
          {/*{new Date(releaseDate).toDateString()}*/}
        </StyledReleaseDate>
      )
    );
  };

  return (
    <StyledReleaseDatesWrap>
      <SectionHeader>Release Dates</SectionHeader>

      {theatrical_release && (
        <StyledReleaseDate>
          <BorderedTag>
            <FaTicketAlt size={"1.4rem"} color={"#1f4b99"} />
            <Smaller>Theatrical</Smaller>
          </BorderedTag>
          <div style={{ fontSize: "1.15rem" }}>
            {moment(theatrical_release).format("MMM Do, YYYY")}
          </div>
        </StyledReleaseDate>
      )}

      {digital_release && (
        <StyledReleaseDate>
          <BorderedTag>
            <FaCloudDownloadAlt size={"1.4rem"} color={"#1f4b99"} />
            <Smaller>Digital</Smaller>
          </BorderedTag>
          <div style={{ fontSize: "1.15rem" }}>
            {moment(digital_release).format("MMM Do, YYYY")}
          </div>
        </StyledReleaseDate>
      )}

      {physical_release && (
        <StyledReleaseDate>
          <BorderedTag>
            <IoMdDisc size={"1.4rem"} color={"#1f4b99"} />
            <Smaller>Physical</Smaller>
          </BorderedTag>
          <div style={{ fontSize: "1.15rem" }}>
            {moment(physical_release).format("MMM Do, YYYY")}
          </div>
        </StyledReleaseDate>
      )}

      {/*<StyledReleaseDate>*/}
      {/*  <div style={{ marginRight: "16px", fontSize: "1.1rem" }}>*/}
      {/*    /!*<FaCloudDownloadAlt size={"1.5rem"} /> Digital*!/*/}
      {/*    <FaCloudDownloadAlt size={"1.5rem"} />*/}
      {/*  </div>*/}
      {/*  {moment(digital_release).format("MMM Do YYYY")}*/}
      {/*</StyledReleaseDate>*/}

      {/*<ReleaseDate label="Digital" releaseDate={digital_release} />*/}
      {/*<ReleaseDate label="Theatrical" releaseDate={theatrical_release} />*/}
      {/*<ReleaseDate label="Digital" releaseDate={digital_release} />*/}
      {/*<ReleaseDate label="Physical" releaseDate={physical_release} />*/}
      {/*<ReleaseDate label="TV" releaseDate={tv_release} />*/}
    </StyledReleaseDatesWrap>
  );
}

// function ReleaseDates({ data }) {
//   const {
//     theatrical_release,
//     digital_release,
//     physical_release,
//     tv_release,
//   } = data;
//
//   const ReleaseDate = ({ label, releaseDate }) => {
//     if (!releaseDate) return null;
//     return (
//       releaseDate && (
//         <StyledReleaseDate>
//           <BorderedTag>{label}</BorderedTag>
//           {moment(releaseDate).format("MMM Do YYYY")}
//           {/*{new Date(releaseDate).toDateString()}*/}
//         </StyledReleaseDate>
//       )
//     );
//   };
//
//   return (
//     <StyledReleaseDatesWrap>
//       <SectionHeader>Release Dates</SectionHeader>
//       <ReleaseDate label="Theatrical" releaseDate={theatrical_release} />
//       <ReleaseDate label="Digital" releaseDate={digital_release} />
//       <ReleaseDate label="Physical" releaseDate={physical_release} />
//       <ReleaseDate label="TV" releaseDate={tv_release} />
//     </StyledReleaseDatesWrap>
//   );
// }

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
  return !trailer_url ? null : (
    <StyledTrailerWrap>
      <SectionHeader>Trailer</SectionHeader>
      {trailer_url && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {/*<iframe title={title} src={youtube_src} allowFullScreen />*/}
          <iframe
            title={title}
            data-src={youtube_src}
            frameBorder="0"
            className="lazyload"
            allowFullScreen
          />
        </div>
      )}
    </StyledTrailerWrap>
  );
}

function Similar({ data }) {
  const { similar } = data;
  return !similar || similar.length === 0 ? null : (
    <StyledSimilarWrap>
      <SectionHeader>Similar</SectionHeader>
      <HorizontalScroll>
        {similar &&
          similar.map((item) => {
            const { imdb_id, title, poster_url } = item;
            return (
              <HorizontalScrollItem key={imdb_id}>
                <Link to={`/movie/${imdb_id}`} key={imdb_id}>
                  {/*<ScrollPoster src={poster_url} alt={title} />*/}
                  <ScrollPoster
                    data-src={poster_url}
                    className="lazyload"
                    alt={title}
                  />
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
  return !recommended || recommended.length === 0 ? null : (
    <StyledRecommendedWrap>
      <SectionHeader>Recommended</SectionHeader>
      <HorizontalScroll>
        {recommended &&
          recommended.map((item) => {
            const { imdb_id, title, poster_url } = item;
            return (
              <HorizontalScrollItem key={imdb_id}>
                <Link to={`/movie/${imdb_id}`} key={imdb_id}>
                  {/*<ScrollPoster src={poster_url} alt={title} />*/}
                  <ScrollPoster
                    data-src={poster_url}
                    className="lazyload"
                    alt={title}
                  />
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
                {/*<ScrollCreditPoster src={actor.profile_url} alt={actor.name} />*/}
                <ScrollCreditPoster
                  data-src={actor.profile_url}
                  className="lazyload"
                  alt={actor.name}
                />
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
