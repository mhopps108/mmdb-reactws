import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
// import { device } from "../devices";
import lazySizes from "lazysizes";
import moment from "moment";

const formatVoteCount = (votes) => {
  if (!votes) return null;
  if (votes > 9999) {
    votes = (votes / 1000).toFixed(0);
    return `${votes.toLocaleString()}K`;
  }
  return votes.toLocaleString();
};

const InfoList = ({ release, runtime, certification, rating, votes }) => {
  return (
    <>
      {release && <InfoItem>{release}</InfoItem>}
      <InfoItem>
        {runtime || "0"}
        <small>m</small>
      </InfoItem>
      <InfoItem>{certification || "NR"}</InfoItem>
      <InfoItem>{rating || "0.0"}</InfoItem>
      <InfoItem>{formatVoteCount(votes)}</InfoItem>
    </>
  );
};

// const GenreList = ({ genres }) => {
//   genres = genres || [];
//   if (Array.isArray(genres) && genres.length > 3) {
//     genres = genres.splice(0, 3);
//   }
//   return (
//     genres &&
//     genres.map((genre, index) => {
//       return <InfoItem key={genre}>{genre}</InfoItem>;
//     })
//   );
// };

const GenreList = ({ genres }) => {
  // if (!genres) return [];
  let genreList = genres || [];
  if (Array.isArray(genreList) && genreList.length > 3) {
    genreList = genres.splice(0, 3);
  }
  return (
    genreList &&
    genreList.map((genre, index) => {
      return <InfoItem key={genre}>{genre}</InfoItem>;
    })
  );
};

function MovieListItem({ movie, dateType }) {
  const {
    imdb_id,
    title,
    year,
    runtime,
    certification,
    imdb_rating_avg,
    imdb_rating_count,
    genres,
    poster_url,
    theatrical_release,
    digital_release,
    physical_release,
  } = movie;

  // console.log("genres-render: ", genres);

  const releaseDate = () => {
    let date = year;
    switch (dateType) {
      case "theatrical":
        date = moment(theatrical_release).format("MMM DD");
        break;
      case "digital":
        date = moment(digital_release).format("MMM DD");
        break;
      case "physical":
        date = moment(physical_release).format("MMM DD");
        break;
      // case "full":
      //   date = moment(physical_release).format("MMM DD");
      // TODO: date format
      // case "first available date": ??
      default:
        date = year;
    }
    return date;
  };

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
              // year={year}
              release={releaseDate()}
              runtime={runtime}
              certification={certification}
              rating={imdb_rating_avg}
              votes={imdb_rating_count}
            />
          </InfoRow>
          <InfoRow>{<GenreList genres={genres} />}</InfoRow>
          {/*<InfoRow>{genres && <GenreList genres={genres} />}</InfoRow>*/}
        </InfoWrap>
      </MovieListItemLayout>
    </StyledMovieListItem>
  );
}

const StyledMovieListItem = styled.div`
  background: white;
  max-width: 400px;
  height: 120px;
  border-radius: 4px;
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
  margin-left: 3px;
  width: 76px;
  height: 114px;
  border-radius: 4px;
  //border: 1px solid lightgray;
  border: 1px solid whitesmoke;
  //box-shadow: inset 0 2px 4px 4px rgba(0, 0, 0, 0.2);
  //box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.2);
`;

const InfoWrap = styled.div`
  grid-area: infowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 6px 0 4px;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  line-height: 1.2rem;
  max-height: 2.4rem;
  overflow: hidden;
  white-space: normal;
  margin-bottom: 12px;
  & a {
    text-decoration: none;
    //color: #282c35;
    color: #33425b;
  }
`;

const InfoRow = styled.div`
  display: flex;
  //color: rgba(40, 44, 53, 0.75);
  color: #33425b;
  margin-bottom: 4px;
  font-size: 0.9rem;
  padding-left: 4px;
`;

const InfoItem = styled.div`
  padding-right: 12px;
`;

export default MovieListItem;
