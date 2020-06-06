import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components/macro";
import { device } from "../devices";

import { SelectPicker } from "rsuite";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import moment from "moment";
// import twix from "twix";

const DatePagerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 8px;
`;

const DatePagerButton = styled.button`
  font-size: 1.3rem;
  padding: 0 28px;
  background: none;
  color: #333;
  & a {
    color: #333;
    text-decoration: none;
  }
`;

const dateStrFormatted = (startDate) => {
  const endDate = moment(startDate).endOf("week");
  return moment(startDate).twix(endDate, { allDay: true }).format();
};

export default function DatePager({ prev, next, goToToday, currentDate }) {
  // console.log(`prev: ${prev}`);
  // console.log(`next: ${next}`);
  // console.log(`goToToday: ${goToToday}`);
  // console.log(`currentDate: ${currentDate}`);

  return (
    <DatePagerWrap>
      <DatePagerButton onClick={prev}>
        <FaAngleLeft />
      </DatePagerButton>
      <DatePagerButton onClick={goToToday}>
        <Link to="/releases">{dateStrFormatted(currentDate)}</Link>
      </DatePagerButton>
      <DatePagerButton onClick={next}>
        <FaAngleRight />
      </DatePagerButton>
    </DatePagerWrap>
  );
}
