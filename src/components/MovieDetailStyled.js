import styled, { css } from "styled-components/macro";
import { device } from "../devices";

// --- --- --- --- --- --- //
//   Components            //
// --- --- --- --- --- --- //

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  width: 100%;
`;

export const SectionWrap = styled.div`
  margin-bottom: 20px;
  //box-shadow: 0 0 15px 5px #fff;
  //padding: 8px;
  //background-color: #eee;
`;

export const SectionHeader = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

export const BorderedTag = styled.div`
  border: 1px solid #777;
  color: #333;
  font-weight: 300;
  font-size: 0.9rem;
  border-radius: 5px;
  width: 90px;
  text-align: center;
  padding: 2px 5px;
  margin-right: 10px;
`;

export const Small = styled.div`
  font-size: 0.85rem;
`;

// --- --- --- --- --- --- //
//   Movie Detail Wrap     //
// --- --- --- --- --- --- //

export const StyledMovieDetail = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100%;
  color: #333;
  //background-color: #eee;
`;

export const BackdropImage = styled.div`
  position: absolute;
  z-index: -1;
  //opacity: 0.25;
  width: 100%;
  max-width: 1000px;
  height: 200px;
  background-image: url(${(props) => props.url});
  background-position: center 25%;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: inset 0px -40px 20px 2px rgba(0, 0, 0, 0.85);

  @media ${device.min.small} {
    height: 300px;
  }
`;

// --- --- --- --- --- --- //
//   MDBasics              //
// --- --- --- --- --- --- //

export const MDBasicsWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ddd;

  @media ${device.min.small} {
    padding: 15px 25px;
  }
`;

export const MDBasics = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  justify-content: flex-end;
  @media ${device.min.small} {
    padding-left: 25px;
  }
`;

export const PosterImage = styled.img`
  width: 120px;
  height: 180px;
  border-radius: 4px;
  border: 1px solid #555;
  @media ${device.min.small} {
    width: 180px;
    height: 270px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  & > div {
    padding-right: 15px;
    padding-top: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 15px;
  @media ${device.min.small} {
    font-size: 2rem;
  }
`;

// --- --- --- --- --- --- //
//   Main Grid Wrap        //
// --- --- --- --- --- --- //

export const MainWrap = styled.div`
  padding: 15px 25px;

  display: grid;
  grid-template-areas:
    "ratings"
    "releasedates"
    "overview"
    "trailer"
    "credits"
    "similar"
    "recommended";
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;

  @media ${device.min.tablet} {
    grid-template-areas:
      "ratings overview"
      "releasedates overview"
      "trailer credits"
      "similar similar"
      "recommended recommended";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
`;

// --- --- --- --- --- --- //
//   Ratings               //
// --- --- --- --- --- --- //

export const StyledRatingsWrap = styled(SectionWrap)`
  grid-area: ratings;
`;

export const StyledRatings = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledRating = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 8px;
`;

export const RatingAvg = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 5px;
`;

// --- --- --- --- --- --- //
//   Release Dates         //
// --- --- --- --- --- --- //

export const StyledReleaseDatesWrap = styled(SectionWrap)`
  grid-area: releasedates;
`;

export const StyledReleaseDate = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  align-items: center;
`;

// --- --- --- --- --- --- //
//   Overview              //
// --- --- --- --- --- --- //

export const StyledOverviewWrap = styled(SectionWrap)`
  grid-area: overview;
  p {
    line-height: 1.4rem;
  }
`;

// --- --- --- --- --- --- //
//   Trailer               //
// --- --- --- --- --- --- //

export const StyledTrailerWrap = styled(SectionWrap)`
  grid-area: trailer;
`;

// --- --- --- --- --- --- //
//   Credits               //
// --- --- --- --- --- --- //

export const StyledCreditsWrap = styled(SectionWrap)`
  grid-area: credits;
  overflow: hidden;
`;

export const ScrollCreditPoster = styled.img`
  display: flex;
  width: 67px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #555;
`;

export const ScrollCreditPosterTag = styled.p`
  font-size: 0.75rem;
  overflow: hidden;
  line-height: 1rem;
  height: 2rem;
`;

// --- --- --- --- --- --- //
//  Similar / Recommended  //
// --- --- --- --- --- --- //

export const StyledSimilarWrap = styled(SectionWrap)`
  grid-area: similar;
  overflow: hidden;
`;

export const StyledRecommendedWrap = styled(SectionWrap)`
  grid-area: recommended;
  overflow: hidden;
`;

export const HorizontalScroll = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export const HorizontalScrollItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
  a {
    text-decoration: none;
    color: #333;
  }
`;

export const ScrollPoster = styled.img`
  display: flex;
  width: 80px;
  height: 120px;
  border-radius: 4px;
  border: 1px solid #555;
`;

export const ScrollPosterTag = styled.p`
  font-size: 0.75rem;
  overflow: hidden;
  line-height: 1rem;
  height: 2rem;
`;
