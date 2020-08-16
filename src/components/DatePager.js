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
  //min-height: 30px;
  justify-content: center;
  align-items: center;
  height: 100%;

  .react-datepicker-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PagerButton = styled.button`
  //padding: 4px 8px;
  //color: #444;
  color: #33425b;
  background: none;
  //border: 1px solid red;
  //border-radius: 4px;
  font-size: 1.1rem;
  height: 100%;
  //width: 30px;
  //padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    //padding-bottom: 2px;
  }

  //&:active,
  & :hover {
    //background: #282c35;
    //color: white;
    //color: #282c35;
  }
`;

export default function DatePager({
  goPrev,
  goNext,
  goToToday,
  displayDateStr,
}) {
  const [tempDate, setTempDate] = React.useState(new Date());

  const onDateChange = (val) => {
    console.log("datepicker val: ", val);
    setTempDate(val);
  };

  const DatePickerInput = ({ value, onClick }) => (
    <PagerButton onClick={onClick}>
      <FaRegCalendar size={"1.25rem"} style={{ marginRight: "8px" }} />
      {/*{value}*/}
      {/*<span style={{ fontSize: "1.2rem" }}>{displayDateStr}</span>*/}
      <div style={{ display: "flex" }}>{displayDateStr}</div>
    </PagerButton>
  );

  return (
    <Wrap>
      <PagerButton
        onClick={goPrev}
        style={{ marginRight: "auto", color: "#555" }}
      >
        <FaCaretLeft size={"1.4rem"} />
        {"Jul"}
      </PagerButton>

      <DatePicker
        selected={tempDate}
        onChange={onDateChange}
        dateFormat={"MMMM dd yyyy"}
        customInput={<DatePickerInput />}
        todayButton={"Today"} // this week/month
        popperPlacement="bottom-center"
      />

      <PagerButton onClick={goNext} style={{ marginLeft: "auto" }}>
        {"Sep"}
        <FaCaretRight size={"1.25rem"} />
      </PagerButton>
    </Wrap>
  );
}
