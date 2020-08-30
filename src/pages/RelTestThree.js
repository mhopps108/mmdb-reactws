import React, { useState, useEffect, useReducer, useRef } from "react";
import {
  useNavigate,
  useMatch,
  useRoutes,
  useLocation,
  useParams,
} from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import moment from "moment";
import { Header, Toolbar, MovieList } from "../components";
import { releasesSortOptions } from "../constants";
import API from "../api/api";
import { dateUtil } from "../utils/dates";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const { formatPeriod, startOf, endOf, getPrev, getNext } = dateUtil;

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

export default function RelTestThree() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);
  // /releases/:type/:period/:startFrom?sortby=-digital
  // /releases/digital/month/2020-07-01?sortby=-digital
  // or
  // /releases/digital/month?start=2020-07-01&sortby=-digital

  let navigate = useNavigate();
  const loc = useLocation();
  console.log("loc: ", loc);
  let {
    type = "digital",
    period = "month",
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

  // const loadMoreButtonRef = useRef();
  // useIntersectionObserver({
  //   target: loadMoreButtonRef,
  //   onIntersect: () => fetchMore(),
  // });

  const resetStartFrom = () => {
    // paramsDispatch({ type: "RESET_DATE", payload: startOf(moment(), period) });
  };

  const goPrev = () => {
    console.log("Go Prev - Clicked");
    const prevPeriod = getPrev(startDate, period);
    console.log("prevPeriod: ", prevPeriod);
    const { value, label } = sortOptions.find((item) => item.value === sortby);
    const newLoc = `/releases/${type}/${period}/${prevPeriod}?sort=${label.toLowerCase()}`;
    // const newLoc = `/releases/${type}/${period}/${prevPeriod}${queryParams.toString()}`;
    navigate(newLoc);
  };

  const goNext = () => {
    console.log("Go Next - Clicked");
    const nextPeriod = getNext(startDate, period);
    console.log("nextPeriod: ", nextPeriod);
    const { value, label } = sortOptions.find((item) => item.value === sortby);
    const newLoc = `/releases/${type}/${period}/${nextPeriod}?sort=${label.toLowerCase()}`;
    // const newLoc = `/releases/${type}/${period}/${nextPeriod}${queryParams.toString()}`;
    navigate(newLoc);
  };

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    name: type,
    type: type,
  };
  const dateData = {
    goPrev: goPrev,
    goNext: goNext,
    goToToday: resetStartFrom,
    displayDateStr: formatPeriod(startDate, period),
    // prevPeriod: formatPeriod(getPrev(startDate, period), period),
    prevPeriod: moment(getPrev(startDate, period)).format("MMM"),
    nextPeriod: moment(getNext(startDate, period)).format("MMM"),
    // nextPeriod: formatPeriod(getNext(startDate, period)),
    // nextPeriod: getNext(startDate, period),
  };
  console.log("");
  const sortData = {
    options: sortOptions,
    selected: sortby,
    onChange: onSortChange,
  };

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
  background: #33425b;
`;
