import React from "react";
import styled from "styled-components/macro";
// import { device } from "../devices";
import moment from "moment";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// export default function DatePager({ dateData }) {
export default function DatePager({
  goToToday,
  displayDateStr,
  prevPeriod,
  nextPeriod,
  goToDate,
}) {
  // const {
  //   goToToday,
  //   displayDateStr,
  //   prevPeriod,
  //   nextPeriod,
  //   goToDate,
  // } = dateData;
  // console.log("prevPeriod: ", prevPeriod);
  // console.log("displayDateStr: ", displayDateStr);
  // console.log("nextPeriod: ", nextPeriod);

  return (
    <Wrap>
      <PagerButton onClick={() => goToDate(prevPeriod)}>
        <FaAngleLeft style={{ marginLeft: "-4px" }} />
        {moment(prevPeriod).format("MMM")}
      </PagerButton>

      <CurrentDate onClick={goToToday}>{displayDateStr}</CurrentDate>

      <PagerButton onClick={() => goToDate(nextPeriod)}>
        {moment(nextPeriod).format("MMM")}
        <FaAngleRight style={{ marginRight: "-4px" }} />
      </PagerButton>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //height: 40px;
  height: 100%;
`;

const CurrentDate = styled.h2`
  font-size: 1.2rem;
  //line-height: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const PagerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  text-transform: uppercase;
  padding: 6px 12px;
  background: none;
  border-radius: 0.25rem;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);

  svg {
    margin: 0 4px;
  }

  :hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }
`;
