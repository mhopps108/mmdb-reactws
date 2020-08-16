import React, { useState, useEffect, useCallback } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { Header, Toolbar, MovieList } from "../components";
import styled from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import moment from "moment";
import twix from "twix";
import { releasesSortOptions } from "../constants";

const releaseTypes = {
  theatrical: { value: "theatrical", title: "Theaters" },
  digital: { value: "digital", title: "Digital" },
  physical: { value: "physical", title: "Physical" },
};

const startOfWeek = (date) =>
  formatDate((moment(date) || moment()).startOf("week"));
const endOfWeek = (date) =>
  formatDate((moment(date) || moment()).endOf("week"));

const getPrevWeek = (date) => formatDate(moment(date).subtract(7, "d"));
const getNextWeek = (date) => formatDate(moment(date).add(7, "d"));

const formatDate = (date) => moment(date).format("YYYY-MM-DD");

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export default function ReleaseDates() {
  // start date
  let history = useHistory();
  // console.log("HISTORY: ", history);
  let match = useRouteMatch([
    "/release-dates/:type/:week",
    "/release-dates/:type",
  ]);

  // release type
  const releaseType = match
    ? releaseTypes[match.params.type]
    : releaseTypes.digital;
  console.log("ReleaseDates: releaseType: ", releaseType);
  const startWeek = match ? startOfWeek(match.params.week) : startOfWeek();
  // console.log("Releases: startWeek: ", startWeek);
  const [startFrom, setStartFrom] = useState(startWeek);
  // console.log("Releases: startFrom: ", startFrom);

  // sort
  let queryParams = useQueryParams();
  const sortOptions = releasesSortOptions(releaseType.value);
  const initSort = queryParams.get("sortby") || sortOptions[0].value;
  const [sort, setSort] = useState(initSort);

  const listUrl = useCallback(() => {
    return (
      `https://matthewhopps.com/api/releases/` +
      `?sortby=${sort}` +
      `&${releaseType.value}_after=${startFrom}` +
      `&${releaseType.value}_before=${endOfWeek(startFrom)}`
    );
  }, [sort, startFrom, releaseType]);
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  // const { count, results, next, previous } = data;

  const onSortChange = (val) => setSort(val);
  const startOfThisWeek = () => setStartFrom(startOfWeek());
  const goPrevWeek = () => setStartFrom(getPrevWeek(startFrom));
  const goNextWeek = () => setStartFrom(getNextWeek(startFrom));
  // TODO fix long date format for when dates span years, 2019-2020
  //  format as Dec 29, 19 - Jan 4, 20
  const dateStrFormatted = (date) => {
    const endDate = moment(date).endOf("week");
    return moment(date).twix(endDate, { allDay: true }).format();
  };

  // toolbar data
  const listData = {
    movie_count: data?.count,
    name: `${releaseType.title} Releases`,
    type: releaseType,
  };
  const dateData = {
    goPrev: goPrevWeek,
    goNext: goNextWeek,
    goToToday: startOfThisWeek,
    displayDateStr: dateStrFormatted(startFrom),
  };
  const sortData = {
    sortData: sortOptions,
    orderByValue: sort,
    onOrderChange: onSortChange,
  };

  useEffect(() => {
    setStartFrom(startWeek);
  }, [startWeek]);

  // sets url and push new state to url on state changes
  useEffect(() => {
    console.log(`ReleaseDates: setUrl/history.push(): `, listUrl);
    setUrl(listUrl);
    history.push(
      `/release-dates/${releaseType.value}/${startFrom}?sortby=${sort}`
    );
  }, [history, releaseType, sort, startFrom, listUrl, setUrl]);

  return (
    <StyledReleases>
      <Header />
      <Toolbar listData={listData} dateData={dateData} sortOptions={sortData} />
      <MovieList
        movies={data?.results}
        isLoading={isLoading}
        isError={isError}
        dateType={"digital"}
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
