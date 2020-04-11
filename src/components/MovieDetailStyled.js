import styled, { css } from "styled-components/macro";
import { device } from "../devices";

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const MovieDetailWrap = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 1000;
  height: 100vh;
`;

const BackdropImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.url});
  background-position: center 25%;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: inset 0px -40px 20px 2px rgba(0, 0, 0, 0.85);
`;

const BasicsWrap = styled.div`
  display: flex;
  /* margin-top: -45px; */
`;

const PosterImage = styled.div`
  width: 120px;
  height: 180px;
  background-image: url(${props => props.url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 4px;
  border: 1px solid #555;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  display: flex;
  font-size: 16px;
`;

export {
  FlexRow,
  MovieDetailWrap,
  BackdropImage,
  BasicsWrap,
  PosterImage,
  InfoWrap,
  Title,
  Info
};
