import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useRef,
} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Header, Toolbar, MovieList } from "../components";
import styled from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import moment from "moment";
import twix from "twix";
import { releasesSortOptions } from "../constants";
import { useMovieApi } from "../api/useMovieApi";

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

const movieReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MOVIES":
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
      };
    case "RESET":
      return {
        ...state,
        movies: [],
      };
    default:
      throw new Error();
  }
};

export default function Releases() {
  let history = useHistory();
  let { type, month } = useParams();
  // console.log("Releases: useParams: ", type, month);

  // release type
  const releaseType = type ? releaseTypes[type] : releaseTypes.digital;
  // start date
  const startMonth = month ? startOfMonth(month) : startOfMonth();
  const [startFrom, setStartFrom] = useState(startMonth);

  // sort
  let queryParams = useQueryParams();
  const sortOptions = releasesSortOptions(releaseType.value);
  const initSort = queryParams.get("sortby") || sortOptions[0].value;
  const [sort, setSort] = useState(initSort);

  // const [page, setPage] = useState(1);
  const pageRef = useRef(1);
  const pageSize = 5;

  const listUrl = useCallback(() => {
    return (
      `https://matthewhopps.com/api/releases/` +
      `?page=${pageRef.current}` +
      `&page_size=${pageSize}` +
      `&sortby=${sort}` +
      `&${releaseType.value}_after=${startFrom}` +
      `&${releaseType.value}_before=${endOfMonth(startFrom)}`
    );
  }, [pageSize, sort, startFrom, releaseType]);
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  // const { count, results, next, previous } = data;

  // const [movies, setMovies] = useState([]);
  const [movieData, dispatch] = useReducer(movieReducer, {
    movies: [],
  });

  const [m, setM] = useState([]);
  const [p, setP] = useState({
    page: 1,
    page_size: 5,
    sortby: sort,
    [`${releaseType.value}_after`]: startFrom,
    [`${releaseType.value}_before`]: endOfMonth(startFrom),
  });
  const [s, setPath, setParams] = useMovieApi("releases/", p, m);

  useEffect(() => {
    console.log("SSSSSS: ", s);
    if (s.movies) {
      // setM((m) => m.concat(s.data.results));
      setM(s.movies);
    }
  }, [s]);

  useEffect(() => {
    // console.log("SSSSSS: ", s);
    setParams(p);
  }, [p, setParams]);

  useEffect(() => {
    console.log("MMMMMM: ", m);
  }, [m]);

  const np = (nextPage) => {
    console.log("np clicked - nextpage: ", nextPage);
    setP({
      page: nextPage,
      page_size: 5,
      sortby: sort,
      [`${releaseType.value}_after`]: startFrom,
      [`${releaseType.value}_before`]: endOfMonth(startFrom),
    });
  };

  useEffect(() => {
    // addMovies(data?.results || []);
    // if (data && data.results) {
    //   setMovies([...movies, ...data.results]);
    // }
    if (data && data.results) {
      dispatch({ type: "ADD_MOVIES", payload: data?.results });
    }
  }, [data]);

  // const nextPage = (page) => setPage(page + 1);
  const nextPage = (nextPage) => {
    console.log(`pageRef: `, pageRef);
    console.log(`nextPage: `, nextPage);
    pageRef.current = nextPage;
    setUrl(listUrl);
  };

  const onSortChange = (val) => setSort(val);
  const startOfThisMonth = () => setStartFrom(startOfMonth());
  const goPrevMonth = () => setStartFrom(getPrevMonth(startFrom));
  const goNextMonth = () => setStartFrom(getNextMonth(startFrom));
  const dateStrFormatted = (date) => moment(date).format("MMMM y");

  // toolbar data
  const listData = {
    // movie_count: data?.count,
    movie_count: movieData?.movies.count,
    name: `${releaseType.title} Releases`,
    // name: `${releaseType.title}`,
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

  useEffect(() => {
    console.log(`Releases: setUrl: `, listUrl);
    setUrl(listUrl);
    // history.push(`/releases/${releaseType.value}/${startFrom}?sortby=${sort}`);
  }, [setUrl, listUrl]);

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [startFrom, releaseType]);

  // sets url and push new state to url on state changes
  useEffect(() => {
    console.log(`Releases: history.push(): `);
    // setUrl(listUrl);
    history.push(`/releases/${releaseType.value}/${startFrom}?sortby=${sort}`);
  }, [history, releaseType, sort, startFrom]);

  return (
    <StyledReleases>
      <Header />
      <Toolbar listData={listData} dateData={dateData} sortOptions={sortData} />
      <MovieList
        // movies={data?.results}
        movies={movieData.movies}
        isLoading={isLoading}
        isError={isError}
        dateType={releaseType.value}
      />
      {/*<button onClick={() => nextPage(page)}>Show More (nextPage)</button>*/}
      {/*<button onClick={() => nextPage(pageRef.current + 1)}>*/}
      {/*  Show More (nextPage)*/}
      {/*</button>*/}
      <button onClick={() => np(p.page + 1)}>Show More (nextPage)</button>
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
