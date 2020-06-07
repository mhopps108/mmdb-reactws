import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { Header, Toolbar, MovieList, NavMenu } from "../components";
import styled, { css } from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import { device } from "../devices";
import moment from "moment";
import twix from "twix";
import { releasesSortOptions } from "../constants";
import { useDateRange } from "../hooks";

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

export default function Releases({ navMenuVisible, toggleNavMenu }) {
  // sort
  let queryParams = useQueryParams();
  const initSort = queryParams.get("sort") || releasesSortOptions[0].value;
  const [sort, setSort] = useState(initSort);
  // start date
  let history = useHistory();
  let match = useRouteMatch("/releases/:week");
  console.log("Releases: match: ", match);
  const startWeek = match ? match.params.week : startOfWeek();
  console.log("Releases: startWeek: ", startWeek);
  const [startFrom, setStartFrom] = useState(startWeek);
  console.log("Releases: startFrom: ", startFrom);

  const listUrl = useCallback(() => {
    return (
      `https://matthewhopps.com/api/releases/` +
      `?sortby=${sort}` +
      `&digital_after=${startFrom}` +
      `&digital_before=${endOfWeek(startFrom)}`
    );
  }, [sort, startFrom]);
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  // const { count, results, next, previous } = data;

  const onSortChange = (val) => setSort(val);
  const startOfThisWeek = () => setStartFrom(startOfWeek());
  const goPrevWeek = () => setStartFrom(getPrevWeek(startFrom));
  const goNextWeek = () => setStartFrom(getNextWeek(startFrom));

  // const makeLinkUrl = (week) => {
  //   // return history.push(`/releases/${week}?sortby=${sort}`);
  //   return `/releases/${week}?sortby=${sort}`;
  // };

  // toolbar data
  const listData = { movie_count: data?.count, name: "Digital Releases" };
  const dateData = {
    goPrevWeek,
    goNextWeek,
    goToToday: startOfThisWeek,
    currentDate: startFrom,
  };
  const sortData = {
    sortData: releasesSortOptions,
    orderByValue: sort,
    onOrderChange: onSortChange,
  };

  useEffect(() => {
    setStartFrom(startWeek);
  }, [startWeek]);

  // calls api for data
  // useEffect(() => {
  //   console.log(`Releases: setUrl: `, listUrl);
  //   setUrl(listUrl);
  // }, [setUrl, listUrl, startFrom, sort]);

  // sets url on state changes
  useEffect(() => {
    console.log(`Releases: setUrl/history.push(): `, listUrl);
    setUrl(listUrl);
    history.push(`/releases/${startFrom}?sortby=${sort}`);
  }, [history, sort, startFrom, listUrl, setUrl]);

  return (
    <StyledReleases>
      <Header toggleNavMenu={toggleNavMenu} />
      <NavMenu isOpen={navMenuVisible} toggleOpen={toggleNavMenu} />
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
