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

const makeReleasesUrl = (sortby, startDate, endDate) => {
  return (
    `https://matthewhopps.com/api/releases/` +
    `?sortby=${sortby}` +
    `&digital_after=${startDate}` +
    `&digital_before=${endDate}`
  );
};

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export default function Releases({ navMenuVisible, toggleNavMenu }) {
  // orderBy
  let queryParams = useQueryParams();
  const initSort = queryParams.get("sort") || releasesSortOptions[0].value;
  const [sort, setSort] = useState(initSort);
  // date
  let history = useHistory();
  let match = useRouteMatch("/releases/:week");
  const startWeek = match ? match.params.week : moment().format("YYYY-MM-DD");
  const { start, end, prevWeek, nextWeek, startOfThisWeek } = useDateRange(
    startWeek
  );

  const listUrl = makeReleasesUrl(sort, start, end);
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  // const { count, results, next, previous } = data;

  const onSortChange = (val) => setSort(val);

  // toolbar data
  const listData = { movie_count: data?.count, name: "Digital Releases" };
  const dateData = {
    prev: prevWeek,
    next: nextWeek,
    goToToday: startOfThisWeek,
    currentDate: start,
  };
  const sortData = {
    sortData: releasesSortOptions,
    orderByValue: sort,
    onOrderChange: onSortChange,
  };

  // calls api for data
  useEffect(() => {
    setUrl(listUrl);
  }, [setUrl, listUrl]);

  // sets url on state changes
  useEffect(() => {
    history.push(`/releases/${start}?sortby=${sort}`);
  }, [history, start, sort]);

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
