import styled, { css } from "styled-components/macro";
import { device } from "../devices";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  width: 100%;
`;

export const SectionWrap = styled.div`
  font-size: 1.1rem;
  //line-height: 1.1rem;
  //margin-bottom: 20px;
  //background: rgba(0, 0, 0, 0.75);
  background: white;
  //padding: 5px 20px 20px;
  padding: 10px 20px;
  border-radius: 5px;
  //box-shadow: 0 0 100px 100px rgba(0, 0, 0, 0.1);
  //box-shadow: 0 0 15px 5px #fff;
  //padding: 8px;
  //background-color: #eee;

  //backdrop-filter: saturate(180%) blur(20px);
  //background-color: rgba(0, 0, 0, 0.7);
  //background-color: rgba(255, 255, 255, 0.7);
  //margin-top: 20px;
`;

export const SectionHeader = styled.div`
  font-size: 1.2rem;
  //margin-bottom: 4px;
  //margin-top: -30px;
  background: whitesmoke;
  color: #333;
  border: 1px solid lightgray;
  padding: 4px 8px;
  border-radius: 4px;
  width: 150px;
  //z-index: -1;
`;

export const BorderedTag = styled.div`
  //border: 1px solid lightgray;
  color: #333;
  font-weight: 300;
  font-size: 0.9rem;
  border-radius: 5px;
  width: 90px;
  text-align: center;
  padding: 2px 5px;
  margin-right: 10px;
`;

export const Smaller = styled.div`
  font-size: 0.8rem;
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
  //position: absolute;
  position: fixed;
  z-index: 1;
  //opacity: 0.25;
  width: 100%;
  max-width: 1000px;
  height: 200px;
  background-image: url(${(props) => props.url});
  background-position: center 25%;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: inset 0px -40px 20px 2px rgba(0, 0, 0, 0.85);
  //border-bottom-right-radius: 8px;
  //border-bottom-left-radius: 8px;

  //backdrop-filter: saturate(180%) blur(20px);
  //background-color: rgba(255, 255, 255, 0.7);

  @media ${device.min.small} {
    height: 300px;
  }
`;

// --- --- --- --- --- --- //
//   MDBasics              //
// --- --- --- --- --- --- //

export const MDBasicsWrap = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: row;
  padding: 10px;
  //background-color: rgba(0, 0, 0, 0.6);
  color: #ddd;
  //border-bottom-right-radius: 8px;
  //border-bottom-left-radius: 8px;
  position: sticky;
  top: 55px; // nav height

  //backdrop-filter: saturate(180%) blur(1px);
  background-color: rgba(0, 0, 0, 0.7);

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
  font-size: 1rem;
  & > div {
    color: #ddd;
    padding-right: 16px;
    padding-top: 8px;
  }
`;

export const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #ffffff;
  @media ${device.min.small} {
    font-size: 2rem;
  }
`;

// --- --- --- --- --- --- //
//   Main Grid Wrap        //
// --- --- --- --- --- --- //

export const MainWrap = styled.div`
  padding: 15px 10px;
  //background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  //background: white;
  color: #333;
  background-color: rgba(0, 0, 0, 0.7);
  //backdrop-filter: saturate(180%) blur(3px);

  &:before {
    //background-position: center 25%;
    //background-repeat: no-repeat;
    content: "";
    position: fixed;
    //top: 255px; // need prop breakpoint here for 300px top
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    overflow: hidden;

    display: block;
    //background: lightgrey;
    //background-image: url(${(props) => props.url});
    //background: repeating-linear-gradient(45deg, rgb(27, 27, 27) 0px, rgb(27, 27, 27) 97px,rgb(24, 24, 24) 97px, rgb(24, 24, 24) 194px,rgb(20, 20, 20) 194px, rgb(20, 20, 20) 291px);
  
    //background-size: cover;
    width: 100vw;
    height: 100vh;

    //backdrop-filter: saturate(180%) blur(5px);
    //background-color: rgba(0, 0, 0, 0.7);

    //filter: blur(8px);
  }

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
      "ratings releasedates"
      "overview trailer"
      "credits credits"
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
  display: flex;
  flex-direction: column;
`;

export const StyledRatings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 150px;
`;

export const StyledRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  //margin-bottom: 14px;
  font-size: 1rem;
  //height: 150px;
  width: 50%;
`;

export const RatingsTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
`;
export const RatingProgress = styled.div`
  width: 90px;
`;

export const RatingAvg = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 5px;
`;

// export const StyledRatingsWrap = styled(SectionWrap)`
//   grid-area: ratings;
// `;
//
// export const StyledRatings = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
//
// export const StyledRating = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-end;
//   margin-bottom: 14px;
//   font-size: 1.1rem;
// `;
//
// export const RatingAvg = styled.div`
//   display: flex;
//   align-items: flex-end;
//   margin-right: 5px;
// `;

// --- --- --- --- --- --- //
//   Release Dates         //
// --- --- --- --- --- --- //

export const StyledReleaseDatesWrap = styled(SectionWrap)`
  grid-area: releasedates;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  //align-items: center;
`;

export const StyledReleaseDate = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  align-items: center;
  //justify-content: center;
  color: #333;
`;

// --- --- --- --- --- --- //
//   Overview              //
// --- --- --- --- --- --- //

export const StyledOverviewWrap = styled(SectionWrap)`
  grid-area: overview;
  p {
    line-height: 1.4rem;
    font-size: 1rem;
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
  //width: 67px;
  //height: 100px;
  width: 80px;
  height: 120px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid lightgray;
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
  //width: 80px;
  //height: 120px;
  width: 100px;
  height: 150px;

  border-radius: 4px;
  border: 1px solid lightgray;
`;

export const ScrollPosterTag = styled.p`
  font-size: 0.75rem;
  overflow: hidden;
  line-height: 1rem;
  height: 2rem;
`;
