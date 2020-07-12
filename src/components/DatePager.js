import React from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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
  font-size: 1rem;

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
  const [tempDate, setTempDate] = React.useState(new Date());

  const onDateChange = (val) => {
    console.log("datepicker val: ", val);
    setTempDate(val);
  };

  const DatePickerInput = ({ value, onClick }) => (
    <Button onClick={onClick}>
      <FiCalendar size={"1rem"} style={{ marginRight: "8px" }} />
      {value}
    </Button>
  );

  return (
    <DatePagerWrap>
      {/*<Button onClick={goToToday} style={{ marginRight: "8px" }}>*/}
      {/*  <FiCalendar size={"1rem"} />*/}
      {/*</Button>*/}
      <DatePicker
        selected={tempDate}
        onChange={onDateChange}
        dateFormat={"MMMM dd yyyy"}
        customInput={<DatePickerInput />}
        todayButton={"Today"} // this week/month
        popperPlacement="bottom-start"
      />

      {/*<p style={{ fontSize: "1.2rem", marginRight: "auto" }}>*/}
      {/*  {displayDateStr}*/}
      {/*</p>*/}
      <Button onClick={goPrev} style={{ marginLeft: "auto" }}>
        <FaAngleLeft size={"1rem"} />
      </Button>
      {/*<Button onClick={goToToday} style={{ marginLeft: "8px" }}>*/}
      {/*  Today*/}
      {/*</Button>*/}
      <Button onClick={goNext} style={{ marginLeft: "8px" }}>
        <FaAngleRight size={"1rem"} />
      </Button>
    </DatePagerWrap>
  );
}
