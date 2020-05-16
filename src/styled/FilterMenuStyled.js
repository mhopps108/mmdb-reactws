import styled, { css } from "styled-components/macro";
import { device } from "../devices";

export const FilterMenuWrap = styled.div`
  //border: 1px solid green;
  background: white;
  color: white;
  //height: 0;
  width: 100%;
  transition: max-height 250ms linear;
  max-height: ${(props) => (props.isOpen ? "600px" : 0)};
`;

export const FilterMenuContentWrap = styled.div`
  //border: 1px solid red;
  padding: 20px 30px;
  width: 100%;
  transition: opacity 250ms ease 0s;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};

  display: flex;
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
