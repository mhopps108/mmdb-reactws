import React from "react";
import styled from "styled-components/macro";

const StyledToolbar = styled.div`
  background-color: white;
  grid-area: toolbar;
  position: sticky;
  top: 55px;
  /* min-height: 100px; */
  display: flex;
`;

export default function Toolbar({ tempProps }) {
  return <StyledToolbar>ListName #100</StyledToolbar>;
}