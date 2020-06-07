import { useState, useEffect } from "react";
import moment from "moment";

const startOfWeek = (date) =>
  formatDate((moment(date) || moment()).startOf("week"));
const endOfWeek = (date) =>
  formatDate((moment(date) || moment()).endOf("week"));

const getPrevWeek = (date) => formatDate(moment(date).subtract(7, "d"));
const getNextWeek = (date) => formatDate(moment(date).add(7, "d"));

const formatDate = (date) => moment(date).format("YYYY-MM-DD");

const useDateRange = (startDate) => {
  console.log(`useDateRange: startDate: `, startDate);
  const startWeek = formatDate(startOfWeek(startDate));
  console.log(`useDateRange: startWeek: `, startWeek);
  const [startFrom, setStartFrom] = useState(startWeek);

  const startOfThisWeek = () => setStartFrom(startOfWeek());
  const goPrevWeek = () => setStartFrom(getPrevWeek(startFrom));
  const goNextWeek = () => setStartFrom(getNextWeek(startFrom));
  const updateStartFrom = (newStart) => setStartFrom(newStart);

  useEffect(() => {
    console.log("useDateRange: start", startFrom);
  }, [startFrom]);

  return {
    start: formatDate(startFrom),
    end: formatDate(endOfWeek(startFrom)),
    goPrevWeek,
    goNextWeek,
    prev: getPrevWeek(startFrom),
    next: getNextWeek(startFrom),
    startOfThisWeek,
    updateStartFrom,
  };

  // return {
  //   start: formatDate(startFrom),
  //   end: formatDate(endOfWeek(startFrom)),
  //   prevWeek,
  //   nextWeek,
  //   startOfThisWeek,
  // };
};

export default useDateRange;
