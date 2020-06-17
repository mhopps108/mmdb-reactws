import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { device } from "../devices";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

import moment from "moment";
// import twix from "twix";

const DatePagerWrap = styled.div`
  display: flex;
  justify-content: space-between;
  //align-content: center;
  align-items: center;
  //margin-top: 8px;
`;

const DatePagerButton = styled.button`
  font-size: 1.3rem;
  //padding: 0 28px;
  //margin: 0 20px;
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

export default function DatePager({
  goPrevWeek,
  goNextWeek,
  // prev,
  // next,
  goToToday,
  currentDate,
}) {
  // console.log(`DatePager: goPrevWeek: ${goPrevWeek}`);
  // console.log(`DatePager: goNextWeek: ${goNextWeek}`);
  // console.log(`DatePager: prev: ${prev}`);
  // console.log(`DatePager: next: ${next}`);
  // console.log(`goToToday: ${goToToday}`);
  // console.log(`currentDate: ${currentDate}`);

  return (
    <DatePagerWrap>
      <DatePagerButton onClick={goPrevWeek}>
        {/*/!*<FaAngleLeft />*!/«*/}←
      </DatePagerButton>
      <DatePagerButton onClick={goToToday}>
        <FiCalendar /> {dateStrFormatted(currentDate)}
        {/*<Link to="/releases">{dateStrFormatted(currentDate)}</Link>*/}
      </DatePagerButton>
      <DatePagerButton onClick={goNextWeek}>
        {/*<FaAngleRight />*/}→
      </DatePagerButton>
    </DatePagerWrap>
  );

  // return (
  //   <DatePagerWrap>
  //     <DatePagerLink to={prev}>
  //       <FaAngleLeft />
  //     </DatePagerLink>
  //     <DatePagerLink to="/releases">This Week</DatePagerLink>
  //     <DatePagerLink>{dateStrFormatted(currentDate)}</DatePagerLink>
  //     <DatePagerLink to={next}>
  //       <FaAngleRight />
  //     </DatePagerLink>
  //   </DatePagerWrap>
  // );
}
