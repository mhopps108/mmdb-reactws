import styled, { css } from "styled-components/macro";
import { device } from "../devices";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  width: 100%;
`;

export const SectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

export const SectionHeader = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const BorderedTag = styled.div`
  border: 1px solid #444;
  border-radius: 5px;
  width: 90px;
  text-align: center;
  padding: 2px 5px;
  margin-right: 10px;
`;

export const Small = styled.div`
  font-size: 0.85rem;
`;

export const StyledMovieDetail = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100%;
  color: #333;
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

// --- MDBasics --- //
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

// --- Ratings --- //
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

// --- Release Dates --- //
export const StyledReleaseDate = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  //width: 75%;
  //justify-content: space-between;
  align-items: center;
`;
