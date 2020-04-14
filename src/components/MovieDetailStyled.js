import styled, { css } from "styled-components/macro";
import { device } from "../devices";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  width: 100%;
`;

export const StyledMovieDetail = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #ddd;
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

export const MDBasics = styled.div`
  //border: 1px solid red;
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);

  @media ${device.min.small} {
    padding: 15px;
  }
`;

export const StyledBasics = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  justify-content: end;
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

export const Info = styled.div`
  display: flex;
  width: 50%;
  & > div {
    padding-right: 15px;
  }
`;

export const Title = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 15px;
  @media ${device.min.small} {
    font-size: 2rem;
  }
`;
