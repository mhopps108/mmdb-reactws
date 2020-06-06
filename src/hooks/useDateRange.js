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
  const startWeek = formatDate(startOfWeek(startDate));
  const [startFrom, setStartFrom] = useState(startWeek);

  const startOfThisWeek = () => setStartFrom(startOfWeek());
  const prevWeek = () => setStartFrom(getPrevWeek(startFrom));
  const nextWeek = () => setStartFrom(getNextWeek(startFrom));

  useEffect(() => {
    console.log("useDateRange: start", startFrom);
  }, [startFrom]);

  return {
    start: formatDate(startFrom),
    end: formatDate(endOfWeek(startFrom)),
    prevWeek,
    nextWeek,
    startOfThisWeek,
  };
};

export default useDateRange;
