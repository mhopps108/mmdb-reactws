import styled, { css } from "styled-components/macro";
import { device } from "../devices";

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CenterContentWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  //bottom: 0;
`;

export const StyledDiscoveryMenu = styled.div`
  border: 2px solid #333;
  //background: #2162a4;
  max-height: calc(100vh - 55px);
  width: 100%;
  max-width: 600px;
  position: fixed;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 99;
  background: white;

  display: flex;
  flex-direction: column;
  padding: 20px 16px;

  transform: translateY(0%);
  //z-index: -10;
  transition: transform 0.3s ease-in-out;
  ${(props) =>
    props.isOpen
      ? css`
          //z-index: 99;
          //transform: translateY(0%);
        `
      : css`
          //transform: translateY(100%);
        `}
`;

export const CloseButton = styled.button`
  //position: relative;
  height: 20px;
  //top: 20px;
  //right: 20px;
`;

/*--- PARTS ---*/

export const FilterHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #222;
  padding: 10px -15px;
  margin-bottom: 10px;
`;

export const GenreOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

/*--- SECTION ---*/

export const SectionTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;
`;

export const FilterTitle = styled.h3`
  color: #2162a4;
  font-size: 1.3rem;
  font-weight: 700;
`;

export const SectionHeader = styled.p`
  color: #2162a4;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 20px;
`;

export const SectionButton = styled.button`
  border: 1px lightgray;
  background: white;
  color: #2162a4;
  padding: 2px 4px;
  border-radius: 4px;
`;

/*--- CHECKBOX ---*/

export const StyledCheckButton = styled.button`
  color: ${(props) => (props.checked ? "white" : "#2162a4")};
  background: ${(props) => (props.checked ? "#2162a4" : "white")};
  padding: 4px 8px;
  margin: 2px 4px;
  border-radius: 4px;
  border: 1px solid lightgray;
  //&:active {
  //  text-decoration: none;
  //}
`;

/*--- RANGE SLIDER ---*/

export const RangeSliderWrap = styled.div`
  background: white;

  & .bp3-slider-progress.bp3-intent-primary {
    background: #2162a4;
  }
`;
