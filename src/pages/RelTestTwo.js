import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
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
  const { page_size, period, sortby, startFrom, type } = paramState;
  return {
    page_size,
    sortby,
    [`${type}_after`]: startFrom,
    [`${type}_before`]: endOf(startFrom, period),
  };
};

const paramsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SORT":
      return {
        ...state,
        sortby: action.payload,
        page: 1,
      };
    case "GO_PREV_PERIOD":
      return {
        ...state,
        startFrom: action.payload,
        page: 1,
      };
    case "GO_NEXT_PERIOD":
      return {
        ...state,
        startFrom: action.payload,
        page: 1,
      };
    case "RESET_DATE":
      return {
        ...state,
        startFrom: action.payload,
        page: 1,
      };
    default:
      throw new Error();
  }
};

export default function RelTest() {
  // window.history.scrollRestoration = "auto";
  // /releases/:type/:period/:startFrom?sortby=-digital
  // /releases/digital/month/2020-07-01?sortby=-digital
  // or
  // /releases/digital/month?start=2020-07-01&sortby=-digital
  let history = useHistory();
  const loc = useLocation();
  const { type, period, startDate } = useParams();
  const initType = type || "digital";
  const initPeriod = period || "month";
  const initStartFrom = startOf(startDate, period);

  const queryParams = useQueryParams();
  const sortOptions = releasesSortOptions(initType);
  const initSortby = queryParams.get("sortby") || sortOptions[0].value;

  const [params, paramsDispatch] = useReducer(paramsReducer, {
    page_size: 30,
    sortby: initSortby,
    startFrom: initStartFrom,
    type: initType, // 'digital' | 'theatrical' | 'physical'
    period: initPeriod, // 'week' | 'month'
  });

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
  } = useInfiniteQuery(["releases", { ...params }], getMovies, {
    getFetchMore: (lastPage, allPages) => {
      console.log(`getFetchMore(): lastPage`, lastPage);
      console.log(`getFetchMore(): allPages`, allPages);

      return lastPage.next_page;
      // return lastPage && lastPage.next_page;
    },
    // cacheTime: 60 * 1000,
    // staleTime: 2 * 1000,
  });

  // const loadMoreButtonRef = useRef();
  // useIntersectionObserver({
  //   target: loadMoreButtonRef,
  //   onIntersect: () => fetchMore(),
  // });

  const onSortChange = (val) => {
    console.log("On Sort - Set");
    paramsDispatch({ type: "SET_SORT", payload: val });
  };

  const resetStartFrom = () => {
    paramsDispatch({ type: "RESET_DATE", payload: startOf(moment(), period) });
  };

  // TODO: merge into set startDate func
  // pass prev / next buttons the date needed, turn into Links ??
  const goToDate = (date) => {
    paramsDispatch({ type: "GO_TO_DATE", payload: date });
  };

  const goPrev = () => {
    console.log("Go Prev - Clicked");
    const { startFrom, period } = params;
    paramsDispatch({
      type: "GO_PREV_PERIOD",
      payload: getPrev(startFrom, period),
    });
  };

  const goNext = () => {
    console.log("Go Next - Clicked");
    const { startFrom, period } = params;
    paramsDispatch({
      type: "GO_NEXT_PERIOD",
      payload: getNext(startFrom, period),
    });
  };

  useEffect(() => {
    console.log("effect: params state: ", params); // log state
  }, [params]);

  // sets url and push new state to url on state changes
  useEffect(() => {
    const { sortby, startFrom, type, period } = params;
    const newLoc = `/releases/${type}/${period}/${startFrom}?sortby=${sortby}`;
    if (newLoc !== loc.pathname + loc.search) {
      history.push(newLoc);
    }

    console.log(`history.push(): `);
    console.log(
      `strToPush =?= locCurrent
      newLoc: ${newLoc}
      oldLoc: ${loc.pathname + loc.search}`
    );
    if (newLoc !== loc.pathname + loc.search) {
      console.log("history: pushed new str");
    } else {
      console.log("history: no push - same str");
    }
  }, [history, loc, params]);

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    name: `${params.type}`,
    type: params.type,
  };
  const dateData = {
    goPrev: goPrev,
    goNext: goNext,
    goToToday: resetStartFrom,
    displayDateStr: formatPeriod(params.startFrom, params.period),
  };
  const sortData = {
    options: sortOptions,
    selected: params.sortby,
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
        dateType={params.type}
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
