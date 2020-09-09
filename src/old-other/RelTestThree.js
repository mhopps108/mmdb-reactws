import React, { useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import moment from "moment";
import { Header, Toolbar, MovieList } from "../components";
import { releasesSortOptions } from "../constants";
import API from "../api/api";
import { useQueryParams, useIntersectionObserver } from "../hooks";
import { dateUtil } from "../utils/dates";

const { formatPeriod, startOf, endOf, getPrev, getNext, formatDate } = dateUtil;

export default function RelTestThree() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);
  // /releases/:type/:period/:startFrom?sortby=-digital
  // /releases/digital/month/2020-07-01?sortby=-digital

  let navigate = useNavigate();
  const loc = useLocation();
  console.log("loc: ", loc);
  let {
    type = "digital",
    period = "month",
    startDate = startOf(moment(), period),
  } = useParams();

  console.log("useParams: type: ", type);
  console.log("useParams: period: ", period);
  console.log("useParams: startDate: ", startDate);

  const sortOptions = releasesSortOptions(type);

  const getSortValue = (sort) => {
    if (sort) {
      const { value, label } = sortOptions.find(
        (item) => item.label.toLowerCase() === sort
      );
      return value;
    }
    onSortChange(sortOptions[0].value);
  };

  const onSortChange = ({ value, label }) => {
    console.log("On Sort - Set");
    navigate(loc.pathname + `?sort=${label.toLowerCase()}`);
  };

  const queryParams = useQueryParams();
  const sortby = getSortValue(queryParams.get("sort"));
  console.log("sortby: ", sortby);

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);

    const { type, period, startDate, sortby } = paramKeys;
    const queryParams = {
      sortby,
      [`${type}_after`]: startDate,
      [`${type}_before`]: endOf(startDate, period),
      page_size: 15,
    };

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
    ["releases", { type, period, startDate, sortby }],
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

  const goToDate = (newStartDate) => {
    console.log("goToDate - Clicked - newStartDate: ", newStartDate);
    const { value, label } = sortOptions.find((item) => item.value === sortby);
    const newLoc = `/releases/${type}/${period}/${newStartDate}?sort=${label.toLowerCase()}`;
    navigate(newLoc);
  };

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    name: type,
    type: type,
  };
  const dateData = {
    goToToday: resetStartFrom,
    displayDateStr: formatPeriod(startDate, period),
    prevPeriod: getPrev(startDate, period),
    nextPeriod: getNext(startDate, period),
    goToDate,
  };
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
