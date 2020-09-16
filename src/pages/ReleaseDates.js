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

// TODO: weekOf=, month= --- query params? instead of startFrom

export default function ReleaseDates() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  let navigate = useNavigate();
  const location = useLocation();
  let { type = "digital", period = "week" } = useParams();

  console.log("loc: ", location);
  console.log(`type / period: ${type} / ${period}`);

  const sortOptions = releasesSortOptions(type);
  // merging with params causes a rerender and sets the browsers url
  const defaultParams = {
    sort: sortOptions[0].label,
    startFrom: startOf(moment(), period),
  };
  const [params, setParams] = useState({
    ...defaultParams,
    ...qs.parse(location.search, qsOptions),
  });
  console.log("params: ", params);

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    const { type, period, startFrom, sort } = paramKeys;
    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);

    // const sortby = sort || sortOptions[0].label;
    const { value } = sortOptions.find(({ value, label }) => {
      return [value, label].includes(sort);
    });

    const queryParams = {
      sortby: value,
      [`${type}_after`]: startOf(startFrom, period),
      [`${type}_before`]: endOf(startFrom, period),
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
  } = useInfiniteQuery(["releases", { type, period, ...params }], getMovies, {
    getFetchMore: (lastPage, allPages) => lastPage.next_page,
  });

  const onSortChange = ({ value, label }) => {
    console.log(`On Sort - Set: ${value} (${label})`);
    setParams({ ...params, sort: label });
  };

  const goToDate = (newStartDate) => {
    console.log("goToDate - Clicked - newStartDate: ", newStartDate);
    setParams({ ...params, startFrom: newStartDate });
  };

  useEffect(() => {
    setParams({
      ...params,
      startFrom: startOf(moment(), period),
    });
  }, [period, type]);

  useEffect(() => {
    navigate(location.pathname + "?" + qs.stringify(params, qsOptions));
  }, [navigate, location.pathname, params]);

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    name: type,
    type: type,
  };
  const dateData = {
    goToToday: () => goToDate(startOf(moment(), period)),
    displayDateStr: formatPeriod(params.startFrom, period),
    prevPeriod: getPrev(params.startFrom, period),
    nextPeriod: getNext(params.startFrom, period),
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
