import React, { useState, useEffect, useReducer, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import moment from "moment";
import { Header, Toolbar, MovieList } from "../components";
import { releasesSortOptions } from "../constants";
import API from "../api/api";
import { dateUtil } from "../utils/dates";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const { formatPeriod, startOf, endOf, getPrev, getNext, formatDate } = dateUtil;

const releaseTypes = {
  theatrical: { value: "theatrical", title: "Theaters" },
  digital: { value: "digital", title: "Digital" },
  physical: { value: "physical", title: "Physical" },
};

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const paramStateToQuery = (paramState) => {
  const { page_size, period, sortby, startDate, type } = paramState;
  return {
    page_size,
    sortby,
    [`${type}_after`]: startDate,
    [`${type}_before`]: endOf(startDate, period),
  };
};

//   release-dates?sort=date&period=week&type=digital&start=2020-08-31
//   release-dates/digital/month?sort=date&start=2020-08-31
//   release-dates/

//   release-dates/:type/:period:/:?startDate
//   release-dates/digital/week?sort=default

export default function ReleaseDates() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  let navigate = useNavigate();
  const loc = useLocation();
  console.log("loc: ", loc);
  let {
    type = "digital",
    period = "week",
    startDate = startOf(moment(), period),
  } = useParams();

  console.log("type: ", type);
  console.log("period: ", period);
  console.log("startDate: ", startDate);
  const page_size = 15;
  const sortOptions = releasesSortOptions(type);

  const onSortChange = (val) => {
    console.log("On Sort - Set: ", val);
    const { value, label } = sortOptions.find((item) => item.value === val);
    navigate(loc.pathname + `?sort=${label.toLowerCase()}`);
  };

  const getSortValue = (sort) => {
    if (sort) {
      const { value, label } = sortOptions.find(
        (item) => item.label.toLowerCase() === sort
      );
      return value;
    }
    onSortChange(sortOptions[0].value);
  };

  const queryParams = useQueryParams();
  const sortby = getSortValue(queryParams.get("sort"));
  console.log("sortby: ", sortby);

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);

    const queryParams = paramStateToQuery(paramKeys);
    const response = await API.get(`/releases/`, {
      params: { page: nextPage, ...queryParams },
    });
    return response.data;
  };

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    ["releases", { page_size, sortby, type, period, startDate }],
    getMovies,
    {
      getFetchMore: (lastPage, allPages) => lastPage.next_page,
    }
  );

  const goToDate = (newStartDate) => {
    console.log("goToDate - Clicked - newStartDate: ", newStartDate);
    const { value, label } = sortOptions.find((item) => item.value === sortby);
    const newLoc = `/release-dates/${type}/${period}/${newStartDate}?sort=${label.toLowerCase()}`;
    navigate(newLoc);
  };

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    name: type,
    type: type,
  };
  const dateData = {
    goToToday: () => console.log("not implemented"), // resetStartFrom,
    displayDateStr: formatPeriod(startDate, period),
    prevPeriod: getPrev(startDate, period),
    nextPeriod: getNext(startDate, period),
    goToDate,
  };
  console.log("");
  const sortData = {
    options: sortOptions,
    selected: sortby,
    onChange: onSortChange,
  };

  // toolbar data
  // const listData = {
  //   movie_count: data?.count,
  //   name: `${releaseType.title} Releases`,
  //   type: releaseType,
  // };
  // const dateData = {
  //   goPrev: goPrevWeek,
  //   goNext: goNextWeek,
  //   goToToday: startOfThisWeek,
  //   displayDateStr: dateStrFormatted(startFrom),
  // };
  // const sortData = {
  //   sortData: sortOptions,
  //   orderByValue: sort,
  //   onOrderChange: onSortChange,
  // };

  // useEffect(() => {
  //   setStartFrom(startWeek);
  // }, [startWeek]);

  // sets url and push new state to url on state changes
  // useEffect(() => {
  //   console.log(`ReleaseDates: setUrl/history.push(): `, listUrl);
  //   setUrl(listUrl);
  //   navigate(`/release-dates/${releaseType.value}/${startFrom}?sortby=${sort}`);
  // }, [navigate, releaseType, sort, startFrom, listUrl, setUrl]);

  return (
    <StyledReleases>
      <Header />
      <Toolbar listData={listData} dateData={dateData} sortOptions={sortData} />
      <MovieList
        movies={
          data && data.reduce((acc, page) => [...acc, ...page.results], [])
        }
        isLoading={status === "loading"}
        isError={error}
        dateType={type}
      />
      <LoadMoreButton
        // ref={loadMoreButtonRef}
        onClick={() => fetchMore()}
        hidden={!canFetchMore}
        disabled={isFetchingMore}
      >
        {isFetching ? "Loading..." : "Show More"}
      </LoadMoreButton>
      {/*<MovieList*/}
      {/*  movies={data?.results}*/}
      {/*  isLoading={isLoading}*/}
      {/*  isError={isError}*/}
      {/*  dateType={"digital"}*/}
      {/*/>*/}
    </StyledReleases>
  );
}

const LoadMoreButton = styled.button`
  height: 40px;
  width: 90%;
  max-width: 400px;
  margin: 10px auto 100px;
  border-radius: 6px;
  background: white;
`;

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
  //background: #33425b;
`;
