import styled, { css } from "styled-components/macro";
import { device } from "../devices";

export const ApplyButtonWrap = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;

export const ApplyButton = styled.button`
  background: #2162a4;
  color: white;
  width: 200px;
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  padding: 8px;
`;

export const FilterMenuWrap = styled.div`
  background: white;
  color: white;
  //height: 0;
  width: 100%;
  transition: max-height 250ms linear;
  //max-height: ${(props) => (props.isOpen ? "700px" : 0)};
  max-height: ${(props) => (props.isOpen ? "100%" : 0)};
`;

export const FilterMenuContentWrap = styled.div`
  //border: 1px solid red;
  //padding: 20px 30px;
  width: 100%;
  //transition: opacity 200ms ease;
  transition: all 200ms ease;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  display: ${(props) => (props.isOpen ? "flex" : "none")};

  //display: flex;
  flex-direction: column;

  @media ${device.min.tablet} {
    flex-direction: row;
  }
`;

export const FilterSection = styled.div`
  width: 100%;
  padding: 0 15px;
  @media ${device.min.tablet} {
    width: 50%;
  }
`;

export const CheckBoxesWrap = styled.div``;

export const SliderWrap = styled.div``;

/*--- RANGE SLIDER ---*/

export const RangeSliderWrap = styled.div`
  background: white;

  & .bp3-slider-progress.bp3-intent-primary {
    background: #2162a4;
  }
`;

export const SectionHeader = styled.p`
  color: #2162a4;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;
