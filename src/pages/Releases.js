import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Header, Toolbar, MovieList } from "../components";
import styled from "styled-components/macro";
import moment from "moment";
import { releasesSortOptions } from "../constants";
import API from "../api/api";
import { dateUtil } from "../utils/dates";

const { formatPeriod, startOf, endOf, getPrev, getNext } = dateUtil;

// query params from url location
function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const paramStateToQuery = (paramState) => {
  const { page, page_size, period, sortby, startFrom, type } = paramState;
  return {
    page,
    page_size,
    sortby,
    [`${type}_after`]: startFrom,
    [`${type}_before`]: endOf(startFrom, period),
  };
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "FETCH_MOVIES":
      return {
        ...state,
        isLoading: false,
        movies: action.payload.results,
        count: action.payload.count,
      };
    case "FETCH_MORE_MOVIES":
      return {
        ...state,
        isLoading: false,
        movies: [...state.movies, ...action.payload.results],
      };
    case "CLEAR_MOVIES":
      return {
        ...state,
        movies: [],
        count: 0,
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
        page: 1,
      };
    case "RESET_DATE":
      return {
        ...state,
        startFrom: action.payload,
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
    default:
      throw new Error();
  }
};

export default function RelTest() {
  // /releases/:type/:period/:startFrom?sortby=-digital
  // /releases/digital/month/2020-07-01?sortby=-digital
  let history = useHistory();
  let { type, period, startDate } = useParams();
  const initType = type || "digital";
  const initPeriod = period || "month";
  const initStartFrom = startOf(startDate, period);

  let queryParams = useQueryParams();
  const sortOptions = releasesSortOptions(initType);
  const initSort = queryParams.get("sortby") || sortOptions[0].value;

  const [canShowMore, setCanShowMore] = useState(true);

  // TODO: will need a paramsState => params for api
  const [paramState, paramDispatch] = useReducer(paramsReducer, {
    page: 1,
    page_size: 19,
    sortby: initSort,
    startFrom: initStartFrom,
    type: initType, // 'digital' | 'theatrical' | 'physical'
    period: initPeriod, // 'week' | 'month'
  });

  const [moviesState, moviesDispatch] = useReducer(moviesReducer, {
    movies: [],
    count: 0,
    isLoading: false,
    error: null,
  });

  // TODO: pull out into useMovieApi hook
  useEffect(() => {
    const getMovies = async (params) => {
      moviesDispatch({ type: "FETCH_START" });
      try {
        // const response = await MovieApi.getReleaseDates(params);
        const response = await API.get("/releases/", {
          params: params,
        });
        console.log("response: ", response);
        if (paramState.page === 1) {
          moviesDispatch({
            type: "FETCH_MOVIES",
            payload: response.data,
          });
        } else {
          moviesDispatch({
            type: "FETCH_MORE_MOVIES",
            payload: response.data,
          });
        }
      } catch (error) {
        moviesDispatch({ type: "FETCH_ERROR", payload: error });
      }
    };
    getMovies(paramStateToQuery(paramState));
  }, [paramState]);

  useEffect(() => {
    const viewSize = paramState.page * paramState.page_size;
    console.log(
      `can show more: ${moviesState.count} >= ${viewSize} -- (${
        moviesState.count >= viewSize
      })`
    );
    const showMore = moviesState.count >= viewSize;
    setCanShowMore(showMore);
  }, [moviesState, paramState]);

  useEffect(() => {
    console.log("paramState: ", paramState); // log state
  }, [paramState]);

  useEffect(() => {
    console.log("movieState: ", moviesState); // log state
  }, [moviesState]);

  const showMore = () => paramDispatch({ type: "NEXT_PAGE" });

  const onSortChange = (val) => {
    paramDispatch({ type: "SET_SORT", payload: val });
    moviesDispatch({ type: "CLEAR_MOVIES" });
  };

  const resetStartFrom = () => {
    paramDispatch({ type: "RESET_DATE", payload: startOf(moment(), period) });
    moviesDispatch({ type: "CLEAR_MOVIES" });
  };

  const goPrev = () => {
    const { startFrom, period } = paramState;
    paramDispatch({
      type: "GO_PREV_PERIOD",
      payload: getPrev(startFrom, period),
    });
    moviesDispatch({ type: "CLEAR_MOVIES" });
  };

  const goNext = () => {
    const { startFrom, period } = paramState;
    paramDispatch({
      type: "GO_NEXT_PERIOD",
      payload: getNext(startFrom, period),
    });
    moviesDispatch({ type: "CLEAR_MOVIES" });
  };

  const dateStrFormatted = (date) => formatPeriod(date, period);

  // toolbar data
  const listData = {
    movie_count: moviesState.isLoading ? "#" : moviesState.count,
    name: `${paramState.type} Releases`,
    type: paramState.type,
  };
  const dateData = {
    goPrev: goPrev,
    goNext: goNext,
    goToToday: resetStartFrom,
    displayDateStr: dateStrFormatted(paramState.startFrom, paramState.period),
  };
  const sortData = {
    sortData: sortOptions,
    orderByValue: paramState.sortby,
    onOrderChange: onSortChange,
  };

  // sets url and push new state to url on state changes
  useEffect(() => {
    const { sortby, startFrom, type, period } = paramState;
    console.log(`Releases: history.push(): `);
    // TODO: do not want to update history when page changes (show more movies)
    history.push(`/releases/${type}/${period}/${startFrom}?sortby=${sortby}`);
  }, [history, paramState]);

  return (
    <StyledReleases>
      <Header />
      <Toolbar listData={listData} dateData={dateData} sortOptions={sortData} />
      <MovieList
        // movies={data?.results}
        movies={moviesState.movies}
        isLoading={moviesState.isLoading}
        isError={moviesState.error}
        dateType={paramState.type}
      />
      <button
        onClick={showMore}
        hidden={!canShowMore}
        style={{
          height: "40px",
          width: "400px",
          margin: "10px auto",
          borderRadius: "6px",
        }}
      >
        Show More
      </button>
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
