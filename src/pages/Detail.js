import React from "react";
import { Header, MovieDetail } from "../components";
import styled from "styled-components/macro";
import { device } from "../devices";

export default function Detail() {
  return (
    <StyledDetail>
      <Header />
      <MovieDetail />
    </StyledDetail>
  );
}

const StyledDetail = styled.div`
  max-width: 1000px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "header"
    "main";
  grid-template-columns: 1fr;
  grid-template-rows: 55px 1fr;
  margin: 0 auto;

  // @media ${device.min.desktop} {
  //   grid-template-areas:
  //     "header header"
  //     "sidebar main";
  //   grid-template-columns: 200px 1fr;
  //   grid-template-rows: 55px 1fr;
  // }
`;
