import React from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

const DatePagerWrap = styled.div`
  display: flex;
  height: 30px;
`;

const Button = styled.button`
  padding: 4px 8px;
  background: whitesmoke;
  color: #444;
  border: 1px solid lightgray;
  border-radius: 4px;

  svg {
    padding-bottom: 2px;
  }

  //&:active,
  & :hover {
    background: #282c35;
    color: white;
  }
`;

export default function DatePager({
  goPrev,
  goNext,
  goToToday,
  displayDateStr,
}) {
  return (
    <DatePagerWrap>
      <Button onClick={goToToday} style={{ marginRight: "8px" }}>
        <FiCalendar size={"1rem"} />
      </Button>
      <Button onClick={goToToday} style={{ marginRight: "auto" }}>
        Today
      </Button>

      <p style={{ fontSize: "1.2rem" }}>{displayDateStr}</p>

      <Button onClick={goPrev} style={{ marginLeft: "auto" }}>
        <FaAngleLeft size={"1rem"} />
      </Button>
      <Button onClick={goNext} style={{ marginLeft: "8px" }}>
        <FaAngleRight size={"1rem"} />
      </Button>
    </DatePagerWrap>
  );
}
