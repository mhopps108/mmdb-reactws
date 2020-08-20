import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Header, Toolbar, MovieList, MoviePosterList } from "../components";
import styled from "styled-components/macro";
import { useDataApi } from "../useDataApi";

import { useInfiniteQuery } from "react-query";
import { listSortOptions } from "../constants";
import API from "../api/api";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

// function useQP({ initial }) {
//   // const [params, setParams] = useState(initial);
//   const params = new URLSearchParams(initial);
//   const [queryString, setQuery] = useState(params.toString());
//
//   useEffect(() => {}, []);
//
//   return { queryString, params };
// }

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const paramStateToQuery = (paramKeys) => {
  const { page_size, slug, sort } = paramKeys;
  return {
    page_size,
    sortby: sort,
    list_slug: slug,
  };
};

const paramsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SORT":
      return {
        ...state,
        sort: action.payload,
      };
    default:
      throw new Error();
  }
};

export default function ListTest({ view = "list" }) {
  let history = useHistory();
  const loc = useLocation();
  let { slug } = useParams();
  console.log(`slug: ${slug}`);
  slug = slug || "tmdb-popular";

  const page_size = 15;
  const queryParams = useQueryParams();
  // let urlSort = queryParams.get("sort") || listSortOptions[0].value;
  // const [sort, setSort] = useState(urlSort);
  const [sort, setSort] = useState(
    queryParams.get("sort") || listSortOptions[0].value
  );

  // const [params, dispatch] = useReducer(paramsReducer, {
  //   sort: queryParams.get("sort") || listSortOptions[0].value,
  // });

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);

    const queryParams = paramStateToQuery(paramKeys);
    const response = await API.get(`/movielist/`, {
      params: { page: nextPage, ...queryParams },
    });
    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    isFetching,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(["movielist", { page_size, slug, sort }], getMovies, {
    getFetchMore: (lastPage, allPages) => lastPage.next_page,
  });

  const onSortChange = (value) => {
    console.log("On Sort - Set");
    // dispatch({ type: "SET_SORT", payload: value });
    setSort(value);
    // queryParams.set("sort", value);
    // sort = value;
  };

  // useEffect(() => {
  //   if (params.sort !== urlSort) {
  // setSort(urlSort);
  // dispatch({ type: "SET_SORT", payload: urlSort });
  // }
  // }, [params.sort, urlSort]);

  useEffect(() => {
    console.log("effect: slug: ", slug); // log state
    console.log("effect: params.sort: ", sort); // log state
    for (const [key, value] of queryParams.entries()) {
      console.log(`key:value - ${key}: ${value}`);
    }
  }, [slug, sort, queryParams]);

  // sets url and push new state to url on state changes
  useEffect(() => {
    console.log(`history.push(): `);
    console.log("his", history);
    console.log(`loc: `, loc);

    const newLoc = `/list/${slug}?sort=${sort}`;
    const oldLoc = loc.pathname + loc.search;
    if (newLoc !== oldLoc) {
      history.push(newLoc);
    }

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
  }, [history, loc, slug, sort]);

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    name: `${slug.split("-").slice(1).join(" ")}`,
  };
  const sortData = {
    options: listSortOptions,
    selected: sort,
    onChange: onSortChange,
  };

  return (
    <StyledList>
      <Header />
      <Toolbar listData={listData} sortOptions={sortData} />
      <MovieList
        movies={
          data && data.reduce((acc, page) => [...acc, ...page.results], [])
        }
        isLoading={isLoading}
        isError={error}
      />
      <LoadMoreButton
        // ref={loadMoreButtonRef}
        onClick={() => fetchMore()}
        hidden={!canFetchMore}
        disabled={isFetching}
      >
        {isFetching ? "Loading..." : "Show More"}
      </LoadMoreButton>
      {/*{view === "poster" && (*/}
      {/*  <MoviePosterList*/}
      {/*    movies={(data?.movielistitems || []).map((item) => item.movie)}*/}
      {/*    isLoading={isLoading}*/}
      {/*    isError={isError}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{view === "list" && (*/}
      {/*  <MovieList*/}
      {/*    movies={(data?.movielistitems || []).map((item) => item.movie)}*/}
      {/*    isLoading={isLoading}*/}
      {/*    isError={isError}*/}
      {/*  />*/}
      {/*)}*/}
    </StyledList>
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

const StyledList = styled.div`
  max-width: 1000px;
  height: 100%;
  display: grid;
  grid-template-areas:
    "header"
    "toolbar"
    "main";
  grid-template-columns: 1fr;
  grid-template-rows: 55px auto 1fr;
  margin: 0 auto;
`;
