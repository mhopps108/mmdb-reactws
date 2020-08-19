import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Header, Toolbar, MovieList, MoviePosterList } from "../components";
import styled from "styled-components/macro";
import { useDataApi } from "../useDataApi";

import { useInfiniteQuery } from "react-query";
import { listSortOptions } from "../constants";
import API from "../api/api";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const paramStateToQuery = (paramState) => {
  const { listSlug, sort, page_size } = paramState;
  return {
    page_size,
    sortby: sort,
    list_slug: listSlug,
  };
};

const paramsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SORT":
      return {
        ...state,
        sort: action.payload,
        page: 1,
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
  // slug = slug || "tmdb-popular";

  // const listUrl = `https://www.matthewhopps.com/api/list/${slug}/`;
  // const listUrl = `https://www.matthewhopps.com/api/movielist/`;
  // listSlug, sort
  // const [state, setUrl] = useDataApi(listUrl, []);
  // const { data, isLoading, isError } = state;
  // const { name, source, movie_count, movielistitems } = data;

  const queryParams = useQueryParams();
  const sortOptions = listSortOptions;
  const initSortby = queryParams.get("sort") || sortOptions[0].value;

  const [params, paramsDispatch] = useReducer(paramsReducer, {
    page_size: 30,
    sort: initSortby,
    // listSlug: slug,
  });
  console.log(`listSlug: ${params.listSlug}`);

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
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    ["movielist", { ...params, listSlug: slug }],
    getMovies,
    {
      getFetchMore: (lastPage, allPages) => {
        console.log(`getFetchMore(): lastPage`, lastPage);
        console.log(`getFetchMore(): allPages`, allPages);
        return lastPage.next_page;
        // return lastPage && lastPage.next_page;
      },
      // cacheTime: 60 * 1000,
      // staleTime: 2 * 1000,
    }
  );

  const onSortChange = (val) => {
    console.log("On Sort - Set");
    paramsDispatch({ type: "SET_SORT", payload: val });
  };

  useEffect(() => {
    console.log("effect: params state: ", params); // log state
  }, [params]);

  // sets url and push new state to url on state changes
  useEffect(() => {
    // const { sort, listSlug } = params;
    const { sort } = params;
    // const newLoc = `/list/${listSlug}?sort=${sort}`;
    const newLoc = `/list/${slug}?sort=${sort}`;
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
  }, [history, loc, params, slug]);

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    // name: `${params.listSlug.split("-")[1]}`,
    name: slug,
    // type: params.type,
  };
  const sortData = {
    options: sortOptions,
    selected: params.sort,
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
      {/*<Toolbar listData={data} />*/}
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
