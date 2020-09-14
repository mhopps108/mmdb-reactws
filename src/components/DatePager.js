import React from "react";
import styled from "styled-components/macro";
// import { device } from "../devices";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function DatePager({ dateData }) {
  const {
    goToToday,
    displayDateStr,
    prevPeriod,
    nextPeriod,
    goToDate,
  } = dateData;
  console.log("prevPeriod: ", prevPeriod);
  console.log("displayDateStr: ", displayDateStr);
  console.log("nextPeriod: ", nextPeriod);

  return (
    <Wrap>
      <PagerButton
        onClick={() => goToDate(prevPeriod)}
        style={{ marginRight: "auto", borderRadius: "0.25rem" }}
      >
        <FaAngleLeft style={{ marginLeft: "-4px" }} />
        {moment(prevPeriod).format("MMM")}
      </PagerButton>

      <h3
        style={{
          fontSize: "1.2rem",
          // textTransform: "uppercase",
        }}
        onClick={goToToday}
      >
        {displayDateStr}
      </h3>

      <PagerButton
        onClick={() => goToDate(nextPeriod)}
        style={{ marginLeft: "auto", borderRadius: "0.5rem" }}
      >
        {moment(nextPeriod).format("MMM")}
        <FaAngleRight style={{ marginRight: "-4px" }} />
      </PagerButton>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PagerButton = styled.button`
  background: none;
  font-size: 1rem;
  padding: 6px 12px;
  //border-radius: 0.25rem;

  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  //box-shadow: 0 1px 2px rgba(30, 30, 30, 0.3);
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);

  svg {
    margin: 0 4px;
  }

  :hover {
    //box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }
`;
