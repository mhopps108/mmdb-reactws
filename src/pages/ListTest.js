import React, { useState, useEffect, useReducer, useRef } from "react";
import {
  useNavigate,
  useSearchParams,
  useLocation,
  useParams,
} from "react-router-dom";
import { Header, Toolbar, MovieList, MoviePosterList } from "../components";
import styled from "styled-components/macro";
import { useDataApi } from "../useDataApi";

import { useInfiniteQuery } from "react-query";
import { listSortOptions, releasesSortOptions } from "../constants";
import API from "../api/api";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const useQP = (initParams) => {
  const [state, setState] = useState(initParams);

  const setValue = () => {};

  return { state, setValue };
};

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const paramStateToQuery = (paramKeys) => {
  const { page_size, slug, sortby } = paramKeys;
  return {
    page_size,
    sortby,
    list_slug: slug,
  };
};

export default function ListTest({ view = "list" }) {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  const page_size = 15;
  let navigate = useNavigate();
  const loc = useLocation();
  let { slug = "tmdb-popular" } = useParams();
  // console.log(`slug: ${slug}`);

  const onSortChange = (val) => {
    console.log("On Sort - Set: ", val);
    const { value, label } = listSortOptions.find((item) => item.value === val);
    navigate(loc.pathname + `?sort=${label.toLowerCase()}`);
  };

  const getSortValue = (sort) => {
    if (sort) {
      const { value, label } = listSortOptions.find(
        (item) => item.label.toLowerCase() === sort
      );
      return value;
    }
    onSortChange(listSortOptions[0].value);
  };

  const queryParams = useQueryParams();
  const sortby = getSortValue(queryParams.get("sort"));
  console.log("sortby: ", sortby);

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);
    const queryParams = paramStateToQuery(paramKeys);
    // console.log("getMovies(): queryParams=", queryParams);
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
  } = useInfiniteQuery(
    // ["movielist", { page_size, slug, searchParams }],
    ["movielist", { page_size, slug, sortby }],
    getMovies,
    {
      getFetchMore: (lastPage, allPages) => lastPage.next_page,
    }
  );

  useEffect(() => {
    console.log("effect: slug state: ", slug); // log state
    console.log("effect: sort state: ", sortby); // log state
  }, [slug, sortby]);

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    name: `${slug.split("-").slice(1).join(" ")}`,
  };

  const searchObject = (toFind, prop, arr) => {
    for (let i = 0; i < arr.length; i++) {
      console.log("arr[i][prop]: ", arr[i][prop], toFind);
      if (arr[i][prop] === toFind) {
        return arr[i];
      }
    }
  };

  const sortData = {
    options: listSortOptions,
    selected: sortby,
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
