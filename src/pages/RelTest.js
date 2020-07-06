import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useRef,
  useMemo,
} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Header, Toolbar, MovieList } from "../components";
import styled from "styled-components/macro";
import moment from "moment";
import twix from "twix";
import { releasesSortOptions } from "../constants";
import { useMovieApi, getMovies } from "../api/useMovieApi";
import MovieApi from "../api/MovieApi";

const releaseTypes = {
  theatrical: { value: "theatrical", title: "Theaters" },
  digital: { value: "digital", title: "Digital" },
  physical: { value: "physical", title: "Physical" },
};

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

// const initParams = {
//   page: 1,
//   page_size: 2,
//   sortby: sortby,
//   [`${releaseType.value}_after`]: startFrom,
//   [`${releaseType.value}_before`]: endOfMonth(startFrom),
// };

const moviesReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload.results,
        count: action.payload.count,
        // use movieState.movies.count < movieState.count for hasMore
      };
    case "CONCAT_MOVIES":
      return {
        ...state,
        movies: [...state.movies, ...action.payload.results],
        count: action.payload.count,
      };
    default:
      throw new Error();
  }
};

const paramsReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    case "SET_SORT":
      return {
        ...state,
        sortby: action.payload,
      };
    case "RESET":
      return {
        ...state,
        page: 1,
      };
    default:
      throw new Error();
  }
};

export default function RelTest() {
  let history = useHistory();
  let { type, month } = useParams();
  // release type
  const releaseType = type ? releaseTypes[type] : releaseTypes.digital;
  // start date
  const startMonth = month ? startOfMonth(month) : startOfMonth();
  const [startFrom, setStartFrom] = useState(startMonth);

  // sort
  let queryParams = useQueryParams();
  const sortOptions = releasesSortOptions(releaseType.value);
  const initSort = queryParams.get("sortby") || sortOptions[0].value;

  const [moviesState, moviesDispatch] = useReducer(moviesReducer, {
    movies: [],
    count: 0,
    isLoading: false,
    error: null,
  });

  const [paramState, paramsDispatch] = useReducer(paramsReducer, {
    page: 1,
    page_size: 5,
    sortby: initSort,
    [`${releaseType.value}_after`]: startFrom,
    [`${releaseType.value}_before`]: endOfMonth(startFrom),
  });

  useEffect(() => {
    const getMovies = (paramState) => {
      MovieApi.getReleaseDates(paramState)
        .then((response) => {
          console.log("response: ", response);
          if (paramState.page === 1) {
            moviesDispatch({
              type: "SET_MOVIES",
              payload: response.data,
            });
          } else {
            moviesDispatch({
              type: "CONCAT_MOVIES",
              payload: response.data,
            });
          }
        })
        .catch((err) => {
          console.log("ERROR: ", err);
          // moviesDispatch({type:})
        });
    };
    getMovies(paramState);
  }, [paramState]);

  useEffect(() => {
    console.log("paramState: ", paramState);
  }, [paramState]);

  useEffect(() => {
    console.log("movieState: ", moviesState);
  }, [moviesState]);

  const showMore = () => {
    paramsDispatch({ type: "NEXT_PAGE" });
  };

  const onSortChange = (val) => {
    paramsDispatch({ type: "SET_SORT", payload: val });
  };

  const startOfThisMonth = () => setStartFrom(startOfMonth());
  const goPrevMonth = () => setStartFrom(getPrevMonth(startFrom));
  const goNextMonth = () => setStartFrom(getNextMonth(startFrom));
  const dateStrFormatted = (date) => moment(date).format("MMMM y");

  // toolbar data
  const listData = {
    movie_count: moviesState.count,
    name: `${releaseType.title} Releases`,
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
    orderByValue: paramState.sortby,
    onOrderChange: onSortChange,
  };

  useEffect(() => {
    setStartFrom(startMonth);
  }, [startMonth]);

  // sets url and push new state to url on state changes
  useEffect(() => {
    // const { sortby, startFrom } = paramState;
    const { sortby } = paramState;
    console.log(`Releases: history.push(): `);
    history.push(
      `/releases/${releaseType.value}/${startFrom}?sortby=${sortby}`
    );
  }, [history, releaseType, paramState, startFrom]);

  return (
    <StyledReleases>
      <Header />
      <Toolbar listData={listData} dateData={dateData} sortOptions={sortData} />
      <MovieList
        // movies={data?.results}
        movies={moviesState.movies}
        isLoading={moviesState.isLoading}
        isError={moviesState.error}
        dateType={releaseType.value}
      />
      {/*<button onClick={() => setPage((page) => page + 1)}>*/}
      {/*  Show More (nextPage)*/}
      {/*</button>*/}
      <button onClick={showMore}>Show More (nextPage)</button>
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
