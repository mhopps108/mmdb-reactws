import React from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowRight,
  FaArrowLeft,
  FaCaretSquareLeft,
  FaCaretSquareRight,
  FaCaretRight,
  FaCaretLeft,
  FaCalendar,
  FaRegCalendar,
} from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { FiCalendar, FiArrowLeftCircle } from "react-icons/fi";
import {
  IoMdArrowRoundForward,
  IoMdArrowRoundBack,
  IoIosCalendar,
} from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .react-datepicker-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PagerButton = styled.button`
  color: #33425b;
  background: none;
  font-size: 1rem;
  font-weight: 400;
  //padding: 0.25rem 0.5rem;
  padding: 6px 12px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;

  box-shadow: 0 1px 2px rgba(30, 30, 30, 0.3);

  svg {
    margin: 0 4px;
  }

  :hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }
`;

const StackedText = styled.div`
  display: flex;
  flex-direction: column;

  .top {
    font-size: 1.15rem;
    align-self: center;
    color: #33425b;
  }
  .bottom {
    font-size: 0.75rem;
    align-self: center;
    color: #777;
  }
`;

export default function DatePager({ dateData }) {
  const {
    goToToday,
    displayDateStr,
    prevPeriod,
    nextPeriod,
    goToDate,
  } = dateData;
  const [tempDate, setTempDate] = React.useState(new Date());
  console.log("prevPeriod: ", prevPeriod);
  console.log("displayDateStr: ", displayDateStr);
  console.log("nextPeriod: ", nextPeriod);

  const onDateChange = (val) => {
    console.log("datepicker val: ", val);
    setTempDate(val);
  };

  // const DatePickerInput = ({ value, onClick }) => (
  //   <PagerButton active onClick={onClick}>
  //     {/*<FaRegCalendar size={"1.25rem"} style={{ marginRight: "8px" }} />*/}
  //     <span style={{ fontSize: "1rem" }}>{displayDateStr}</span>
  //   </PagerButton>
  // );

  return (
    <Wrap>
      <PagerButton
        onClick={() => goToDate(prevPeriod)}
        style={{ marginRight: "auto" }}
      >
        <FaAngleLeft style={{ marginLeft: "-4px", color: "grey" }} />
        {moment(prevPeriod).format("MMM")}
      </PagerButton>

      {/*<DatePicker*/}
      {/*  selected={tempDate}*/}
      {/*  onChange={onDateChange}*/}
      {/*  dateFormat={"MMMM dd yyyy"}*/}
      {/*  customInput={<DatePickerInput />}*/}
      {/*  todayButton={"Today"} // this week/month*/}
      {/*  popperPlacement="bottom-center"*/}
      {/*/>*/}

      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: "400",
          color: "#33425b",
          textTransform: "uppercase",
        }}
      >
        {/*<FaRegCalendar size={"1.25rem"} style={{ marginRight: "8px" }} />*/}
        {displayDateStr}
      </h3>

      {/*<StackedText>*/}
      {/*  <div className={"top"}>{displayDateStr}</div>*/}
      {/*  <div className={"bottom"}>{"2020"}</div>*/}
      {/*</StackedText>*/}

      <PagerButton
        onClick={() => goToDate(nextPeriod)}
        style={{ marginLeft: "auto" }}
      >
        {moment(nextPeriod).format("MMM")}
        <FaAngleRight style={{ marginRight: "-4px" }} />
      </PagerButton>
    </Wrap>
  );
}
