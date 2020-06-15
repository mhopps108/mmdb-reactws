import styled, { css } from "styled-components/macro";
import { device } from "../devices";

export const ApplyButtonWrap = styled.div`
  width: 100%;
  margin-top: 15px;
  //position: relative;
  display: flex;
  justify-content: flex-end;
`;

export const ApplyButton = styled.button`
  background: #2162a4;
  color: white;
  //width: 200px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
`;

export const FilterMenuWrap = styled.div`
  border-top: 1px solid lightgrey;
  background: white;
  color: white;
  //height: 0;
  width: 100%;
  transition: max-height 300ms ease-in-out;
  max-height: ${(props) => (props.isOpen ? "90vh" : 0)};

  @media ${device.min.tablet} {
    max-height: ${(props) => (props.isOpen ? "600px" : 0)};
  }
`;

export const FilterMenuContentWrap = styled.div`
  //border: 1px solid red;
  //padding: 20px 30px;
  width: 100%;
  //transition: opacity 200ms ease;
  transition: all 400ms linear;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  //display: ${(props) => (props.isOpen ? "flex" : "none")};

  display: flex;
  flex-direction: column;  

  @media ${device.min.tablet} {
    flex-direction: row;
  }
`;

export const FilterSection = styled.div`
  width: 100%;
  //padding: 10px 20px;
  padding: 10px 8px;
  //align-items: flex-start;
  @media ${device.min.tablet} {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

/*--- RANGE SLIDER ---*/

export const RangeSliderWrap = styled.div`
  background: white;
  //padding: 12px;
  margin: 0 15px;

  & .bp3-slider-progress.bp3-intent-primary {
    background: #2162a4;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    color: #2162a4;
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
  }
`;
