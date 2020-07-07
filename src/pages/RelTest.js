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
// import twix from "twix";
import { releasesSortOptions } from "../constants";
import { useMovieApi, getMovies } from "../api/useMovieApi";
import MovieApi from "../api/MovieApi";
import { dateUtil } from "../utils/dates";
import { MdLocalMovies } from "react-icons/all";

const { formatDate, formatPeriod, startOf, endOf, getPrev, getNext } = dateUtil;

const releaseTypes = {
  theatrical: "theatrical",
  digital: "digital",
  physical: "physical",
};

// query params from url location
function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

// movies reducer
const moviesReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload.results,
        count: action.payload.count,
      };
    case "CONCAT_MOVIES":
      return {
        ...state,
        movies: [...state.movies, ...action.payload.results],
        count: action.payload.count, // TODO: needed?
      };
    default:
      throw new Error();
  }
};

// param reducer
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
    case "RESET_DATE":
      return {
        ...state,
        startFrom: action.payload,
      };
    case "GO_PREV_PERIOD":
      return {
        ...state,
        startFrom: action.payload,
      };
    case "GO_NEXT_PERIOD":
      return {
        ...state,
        startFrom: action.payload,
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

  // console.log("RelTest: initType: ", initType);
  // console.log("RelTest: initPeriod: ", initPeriod);
  // console.log("RelTest: initStartFrom: ", initStartFrom);

  // sort
  let queryParams = useQueryParams();
  const sortOptions = releasesSortOptions(initType);
  const initSort = queryParams.get("sortby") || sortOptions[0].value;

  const [moviesState, moviesDispatch] = useReducer(moviesReducer, {
    movies: [],
    count: 0,
    isLoading: false,
    error: null,
  });

  // TODO: will need a paramsState => params for api
  const [paramState, paramDispatch] = useReducer(paramsReducer, {
    page: 1,
    page_size: 19,
    sortby: initSort,
    startFrom: initStartFrom,
    type: initType, // 'digital' || 'theatrical' || 'physical'
    period: initPeriod, // 'week', 'month'
  });

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

  const [canShowMore, setCanShowMore] = useState(true);

  useEffect(() => {
    const params = paramStateToQuery(paramState);

    const getMovies = async (params) => {
      console.log("fetch - params: ", params);
      try {
        const response = await MovieApi.getReleaseDates(params);
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
      } catch (error) {
        throw new Error(error);
      } finally {
        //dispatch isLoading false
      }

      // MovieApi.getReleaseDates(params)
      //   .then((response) => {
      //     console.log("response: ", response);
      //     if (paramState.page === 1) {
      //       moviesDispatch({
      //         type: "SET_MOVIES",
      //         payload: response.data,
      //       });
      //     } else {
      //       moviesDispatch({
      //         type: "CONCAT_MOVIES",
      //         payload: response.data,
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     console.log("ERROR: ", err);
      //     // moviesDispatch({type:})
      //   });
    };
    getMovies(params);
  }, [paramState]);

  // useEffect(() => {
  //   const params = paramStateToQuery(paramState);
  //   const getMovies = (params) => {
  //     console.log("fetch - params: ", params);
  //     MovieApi.getReleaseDates(params)
  //       .then((response) => {
  //         console.log("response: ", response);
  //         if (paramState.page === 1) {
  //           moviesDispatch({
  //             type: "SET_MOVIES",
  //             payload: response.data,
  //           });
  //         } else {
  //           moviesDispatch({
  //             type: "CONCAT_MOVIES",
  //             payload: response.data,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("ERROR: ", err);
  //         // moviesDispatch({type:})
  //       });
  //   };
  //   getMovies(params);
  // }, [paramState]);

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
  };

  const resetStartFrom = () => {
    paramDispatch({ type: "RESET_DATE", payload: startOf(moment(), period) });
  };

  const goPrev = () => {
    const { startFrom, period } = paramState;
    paramDispatch({
      type: "GO_PREV_PERIOD",
      payload: getPrev(startFrom, period),
    });
  };

  const goNext = () => {
    const { startFrom, period } = paramState;
    paramDispatch({
      type: "GO_NEXT_PERIOD",
      payload: getNext(startFrom, period),
    });
  };

  const dateStrFormatted = (date) => formatPeriod(date, period);

  // toolbar data
  const listData = {
    movie_count: moviesState.count,
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

  // useEffect(() => {
  //   setStartFrom(startMonth);
  // }, [startMonth]);

  // sets url and push new state to url on state changes
  useEffect(() => {
    const { page, sortby, startFrom, type, period } = paramState;
    console.log(`Releases: history.push(): `);
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
