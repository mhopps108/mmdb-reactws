import API from "./api";
import { useEffect, useReducer, useState } from "react";

// const getReleaseDates = async (params) => {
//     const result = await API.get("/releases", {
//         params: params,
//     });
// };

const getMovies = async (path, params) => {
  try {
    console.log("getMovies: url: ", path, params);
    const result = await API.get(path, { params: params });
    console.log("getMovies: result: ", result);
    return result.data;
  } catch (error) {
    console.log("getMovies: error: ", error);
    throw new Error(error);
  }
};

// const moviesReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_MOVIES":
//       return action.payload;
//     case "LOAD_MORE_MOVIES":
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        movies: [],
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        movies: action.payload.results,
      };
    case "FETCH_SUCCESS_CONCAT":
      return {
        ...state,
        isLoading: false,
        isError: false,
        // data: state.data.concat(action.payload),
        data: action.payload,
        movies: [...state.movies, ...action.payload.results],
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useMovieApi = (initPath, initParams, initialData) => {
  const [path, setPath] = useState(initPath);
  const [params, setParams] = useState(initParams);
  const [s, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
    movies: initialData,
  });

  useEffect(() => {
    dispatch({ type: "FETCH_RESET" });
  }, [path]);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        console.log("useMOVIEapi: path: ", path);
        console.log("useMOVIEapi: params: ", params);
        const result = await API.get(path, { params: params });

        if (!didCancel) {
          console.log("useMOVIEapi: result: ", result);
          if (params && params.page && params.page !== 1) {
            dispatch({ type: "FETCH_SUCCESS_CONCAT", payload: result.data });
          } else {
            dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          }
        }
      } catch (error) {
        if (!didCancel) {
          console.log("useMOVIEapi: error: ", error);
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();

    return () => {
      didCancel = true;
    };
  }, [path, params]);

  return [s, setPath, setParams];
};

export { useMovieApi, getMovies };
