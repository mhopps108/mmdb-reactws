import React, { useState, useEffect, useCallback } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { Header, Toolbar, MovieList } from "../components";
import styled from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import moment from "moment";
import twix from "twix";
import { releasesSortOptions } from "../constants";

// TODO: if sorting by release date, use correct release_date
//   eg: release type digital, orderBy: digital_release
// releaseType (theatrical, digital, physical)
// const makeReleasesUrl = (sortby, startDate, endDate, releaseType) => {
//   return (
//       `https://matthewhopps.com/api/releases/` +
//       `?sortby=${sortby}` +
//       `&${releaseType}_after=${startDate}` +
//       `&${releaseType}_before=${endDate}`
//   );
// };
//
// const makeReleasesUrl = (sortby, startDate, endDate) => {
//   return (
//     `https://matthewhopps.com/api/releases/` +
//     `?sortby=${sortby}` +
//     `&digital_after=${startDate}` +
//     `&digital_before=${endDate}`
//   );
// };

const releaseTypes = {
  theatrical: { value: "theatrical", title: "Theaters" },
  digital: { value: "digital", title: "Digital" },
  physical: { value: "physical", title: "Physical" },
};

// week
const startOfWeek = (date) =>
  formatDate((moment(date) || moment()).startOf("week"));
const endOfWeek = (date) =>
  formatDate((moment(date) || moment()).endOf("week"));

const getPrevWeek = (date) => formatDate(moment(date).subtract(7, "days"));
const getNextWeek = (date) => formatDate(moment(date).add(7, "days"));

// month
const startOfMonth = (date) =>
  formatDate((moment(date) || moment()).startOf("month"));
const endOfMonth = (date) =>
  formatDate((moment(date) || moment()).endOf("month"));

const getPrevMonth = (date) => formatDate(moment(date).subtract(1, "months"));
const getNextMonth = (date) => formatDate(moment(date).add(1, "months"));

const formatDate = (date) => moment(date).format("YYYY-MM-DD");

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export default function Releases() {
  // this would need to be set on the Route in App.js
  // TODO: can you set a default for something unmatched?
  // let { type, month } = useParams();
  // console.log("router params: ", type, week);

  // start date
  let history = useHistory();
  let match = useRouteMatch(["/releases/:type/:month", "/releases/:type"]);
  console.log("Releases: match: ", match);

  const releaseType = match
    ? releaseTypes[match.params.type]
    : releaseTypes.digital;
  console.log("Releases: releaseType: ", releaseType);
  const startMonth = match ? startOfMonth(match.params.week) : startOfMonth();
  // console.log("Releases: startWeek: ", startWeek);
  const [startFrom, setStartFrom] = useState(startMonth);
  console.log("Releases: startFrom: ", startFrom);

  // sort
  let queryParams = useQueryParams();
  // console.log(`Releases: queryParams: `, queryParams);
  // console.log(`Releases: releaseType.value: `, releaseType.value);
  // console.log(
  //   `ReleaseDates: releasesSortOptions(releaseType.value): `,
  //   releasesSortOptions(releaseType.value)
  // );

  const sortOptions = releasesSortOptions(releaseType.value);
  const initSort = queryParams.get("sortby") || sortOptions[0].value;
  const [sort, setSort] = useState(initSort);

  const listUrl = useCallback(() => {
    return (
      `https://matthewhopps.com/api/releases/` +
      `?sortby=${sort}` +
      `&${releaseType.value}_after=${startFrom}` +
      `&${releaseType.value}_before=${endOfMonth(startFrom)}`
    );
  }, [sort, startFrom, releaseType]);
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  // const { count, results, next, previous } = data;

  const onSortChange = (val) => setSort(val);
  const startOfThisMonth = () => setStartFrom(startOfMonth());
  const goPrevMonth = () => setStartFrom(getPrevMonth(startFrom));
  const goNextMonth = () => setStartFrom(getNextMonth(startFrom));
  const dateStrFormatted = (date) => moment(date).format("MMMM y");

  // toolbar data
  const listData = {
    movie_count: data?.count,
    name: `${releaseType.title} Releases`,
    type: releaseType,
  };
  const dateData = {
    goPrev: goPrevMonth,
    goNext: goNextMonth,
    goToToday: startOfThisMonth,
    displayDateStr: dateStrFormatted(startFrom),
  };
  const sortData = {
    sortData: sortOptions,
    orderByValue: sort,
    onOrderChange: onSortChange,
  };

  useEffect(() => {
    setStartFrom(startMonth);
  }, [startMonth]);

  // sets url and push new state to url on state changes
  useEffect(() => {
    console.log(`Releases: setUrl/history.push(): `, listUrl);
    setUrl(listUrl);
    history.push(`/releases/${releaseType.value}/${startFrom}?sortby=${sort}`);
  }, [history, releaseType, sort, startFrom, listUrl, setUrl]);

  return (
    <StyledReleases>
      <Header />
      <Toolbar listData={listData} dateData={dateData} sortOptions={sortData} />
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
