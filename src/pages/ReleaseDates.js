import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import moment from "moment";
import { Header, Toolbar, MovieList } from "../components";
import { releasesSortOptions } from "../constants";
import API from "../api/api";
import { dateUtil } from "../utils/dates";
import qs from "query-string";

const qsOptions = {
  arrayFormat: "comma",
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: true,
  sort: false,
};

const { formatPeriod, startOf, endOf, getPrev, getNext } = dateUtil;

export default function ReleaseDates() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  let navigate = useNavigate();
  const location = useLocation();
  let {
    type = "digital",
    period = "week",
    startDate = startOf(moment(), period),
  } = useParams();
  // TODO: pull startDate out into
  //  const [startDate, setStartDate] = useState(startFrom || startOf(moment(), period))

  console.log("loc: ", location);
  console.log("type: ", type);
  console.log("period: ", period);
  console.log("startDate: ", startDate);

  const sortOptions = releasesSortOptions(type);

  const [params, setParams] = useState(qs.parse(location.search, qsOptions));
  console.log("params: ", params);

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    const { type, period, startDate, sort } = paramKeys;
    if (!sort) {
      onSortChange(sortOptions[0]);
    }
    const sortby = sort || sortOptions[0].label;
    const { value } = sortOptions.find(({ value, label }) => {
      return [value, label].includes(sortby);
    });

    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);

    const queryParams = {
      sortby: value,
      [`${type}_after`]: startDate, // TODO: use startOf() here to be sure?
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
    ["releases", { type, period, startDate, ...params }],
    getMovies,
    {
      getFetchMore: (lastPage, allPages) => lastPage.next_page,
    }
  );

  const onSortChange = ({ value, label }) => {
    console.log(`On Sort - Set: ${value} (${label})`);
    setParams({ ...params, sort: label });
  };

  useEffect(() => {
    navigate(location.pathname + "?" + qs.stringify({ ...params }, qsOptions));
  }, [navigate, params, location.pathname]);

  const goToDate = (newStartDate) => {
    console.log("goToDate - Clicked - newStartDate: ", newStartDate);
    navigate(
      `/release-dates/${type}/${period}/${newStartDate}?sort=${params.sort}`
    );
  };

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    name: type,
    type: type,
  };
  const dateData = {
    goToToday: () => goToDate(startOf(moment(), period)),
    displayDateStr: formatPeriod(startDate, period),
    prevPeriod: getPrev(startDate, period),
    nextPeriod: getNext(startDate, period),
    goToDate,
  };
  const sortData = {
    options: sortOptions,
    selected: params.sort,
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
`;
