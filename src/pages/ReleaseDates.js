import React, { useState, useEffect, useReducer } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { Header, Toolbar, MovieList } from "../components";
import styled from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import { device } from "../devices";
import moment from "moment";
import twix from "twix";
import { releasesSortOptions } from "../constants";

// Todo: useReducer
// NextWeek, PrevWeek, ThisWeek,
// if sorting by release date, use correct release_date
//   eg: release type digital, orderBy: digital_release

// export const releasesSortOptions = [
//   { value: "digital_release,-rating", label: "Release" },
//   // { value: "release_date", label: "Release Date" },
//   { value: "-rating,digital_release", label: "Rating" },
//   { value: "-votes,digital_release", label: "Votes" },
//   { value: "title,digital_release", label: "Title" },
//   { value: "year,digital_release", label: "Year" },
// ];

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const startOfWeek = (date) => (moment(date) || moment()).startOf("week");
const endOfWeek = (date) => (moment(date) || moment()).endOf("week");

export default function ReleaseDates({ navMenuVisible, toggleNavMenu }) {
  let queryParams = useQueryParams();
  const orderby = queryParams.get("orderby") || "";
  // releasesSortOptions[0] ??
  const [orderBy, setOrderBy] = useState([
    "digital_release",
    "imdb_rating_avg",
  ]);

  let history = useHistory();
  let match = useRouteMatch("/release-dates/:week");

  console.log("history: ", history);
  console.log("match: ", match);

  // const startWeek = match ? match.params.week : null;
  // const { dates, prevWeek, nextWeek, startOfWeek } = useDateRange(startWeek);

  const startWeek = (match) => {
    const week = match ? match.params.week : startOfWeek();
    return moment(week).format("YYYY-MM-DD");
  };

  const [startDate, setStartDate] = useState(startWeek);

  const listUrl =
    `https://matthewhopps.com/api/movie/` +
    `?orderby=${orderBy.join(",")}` +
    `&digital_release__gte=${startOfWeek(startDate).format("YYYY-MM-DD")}` +
    `&digital_release__lt=${endOfWeek(startDate).format("YYYY-MM-DD")}`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  // const { count, results, next, previous } = data;

  const pushWeek = (week) => {
    history.push(`/release-dates/${week.format("YYYY-MM-DD")}`);
  };
  const prevWeek = () => pushWeek(moment(startDate).subtract(7, "d"));
  const nextWeek = () => pushWeek(moment(startDate).add(7, "d"));

  useEffect(() => {
    // startDate changes: history.push new url
    // read url for setting state with fallback values for
    // missing "week" & "orderby"
  }, [startDate]);

  const onOrderChange = (val) => {
    console.log("selected ORDERBY value:", val);
    // console.log(typeof val);
    setOrderBy([val, orderBy[1]]);
    console.log("ORDERBY: ", orderBy.join(","));
  };

  const listData = { movie_count: data?.count, name: "Digital Releases" };
  const dateData = {
    prev: prevWeek,
    next: nextWeek,
    goToToday: startOfWeek,
    currentDate: startDate,
  };
  const sortData = {
    sortData: releasesSortOptions,
    orderByValue: orderBy,
    onOrderChange: onOrderChange,
  };

  useEffect(() => {
    setUrl(listUrl);
  }, [setUrl, startDate, listUrl]);

  useEffect(() => {
    setStartDate(startWeek(match));
  }, [match]);

  return (
    <StyledReleases>
      <Header />
      <Toolbar
        listData={listData}
        dateData={dateData}
        sortOptions={sortData}
        // sortValue={orderBy}
        // setOrderBy={setOrderBy}
      />
      <MovieList
        movies={data?.results}
        isLoading={isLoading}
        isError={isError}
      />
    </StyledReleases>
  );
}

const StyledReleases = styled.div`
  max-width: 1000px;
  display: grid;
  grid-template-areas:
    "header"
    "toolbar"
    "main";
  grid-template-columns: 1fr;
  grid-template-rows: 55px auto 1fr;
  margin: 0 auto;
`;
