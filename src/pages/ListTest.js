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
import { listSortOptions } from "../constants";
import API from "../api/api";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

// function useQueryParams() {
//   return new URLSearchParams(useLocation().search);
// }

// const paramStateToQuery = (paramKeys) => {
//   const { page_size, slug, sortby } = paramKeys;
//   return {
//     page_size,
//     sortby,
//     list_slug: slug,
//   };
// };

const paramStateToQuery = (paramKeys) => {
  const { page_size, slug, searchParams } = paramKeys;
  const sort = searchParams.get("sort");
  const { value, label } = listSortOptions.find((item) => item.label === sort);
  console.log("paramsStateToQuery: sort: ", sort);

  return {
    page_size,
    sortby: value,
    list_slug: slug,
  };
};

export default function ListTest({ view = "list" }) {
  // let navigate = useNavigate();
  // const loc = useLocation();
  let { slug } = useParams();
  console.log(`slug: ${slug}`);
  slug = slug || "tmdb-popular";

  const page_size = 15;

  let [searchParams, setSearchParams] = useSearchParams({
    // sort: listSortOptions[0].value,
    sort: listSortOptions[0].label,
  });
  // const [sortby, setSortby] = useState(listSortOptions[0].value);

  /*
  const [sortby, setSortby] = useState(() => {
    listSortOptions.find((item) => {
      console.log("inside sortby - item: ", item);
      if (item.label.toLowerCase() === searchParams.get("sort")) {
        return item.value || listSortOptions[0].value;
      }
      return "blah";
    });
  });
  */

  // const sort = searchParams.get("sortby");

  // useEffect(() => {
  // const name = listSortOptions.find((item) => item.value === sort);
  // searchParams.set("sort", name.label.toLowerCase());
  // setSearchParams(searchParams);
  //   if (searchParams.has("sort")) {
  // const sortby = searchParams.get("sort");
  // const sort = listSortOptions.find((item) => item.value === sortby);
  // setSort(sort);
  // setSort(searchParams.get("sort"));
  // }, [sort, searchParams, setSearchParams]);

  useEffect(() => {
    //   searchParams.set("sort", sortby);
    //   setSearchParams(searchParams);
    // console.log("sortby: ", sortby);
    // console.log("listSortOptions: ", listSortOptions);
    // const { value, label } = listSortOptions.find(
    //   (item) => item.value.toLowerCase() === sortby
    // );
    // console.log("found: val: ", val, "label: ", label);
    // searchParams.set("sort", label.toLowerCase());
    // setSearchParams(searchParams);
    // setSortby(value);
    // }, [sortby, searchParams, setSearchParams]);
  }, []);

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);
    // console.log("getMovies(): searchparams=", searchParams.get("sort"));
    // const sort = searchParams.get("sortby");
    // console.log("getMovies(): sort=", sort);
    // const queryParams = paramStateToQuery(sort, ...paramKeys);
    // const queryParams = paramStateToQuery(paramKeys);
    // console.log("getMovies(): queryParams=", queryParams);
    const response = await API.get(`/movielist/`, {
      params: { page: nextPage, ...queryParams },
    });
    return response.data;
  };

  const paramKeys = { page_size, slug, searchParams };
  const queryParams = paramStateToQuery(paramKeys);

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
    // ["movielist", { page_size, slug, sortby }],
    ["movielist", queryParams],
    getMovies,
    {
      getFetchMore: (lastPage, allPages) => lastPage.next_page,
    }
  );

  const onSortChange = (val) => {
    console.log("On Sort - Set");
    const { value, label } = listSortOptions.find((item) => item.value === val);
    // console.log("found: val: ", val, "label: ", label);
    // searchParams.set("sort", label.toLowerCase());
    // setSearchParams(searchParams);
    // setSortby(value);
    // setSortby(val);
    searchParams.set("sort", label);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    console.log("effect: slug state: ", slug); // log state
    // console.log("effect: sort state: ", sort); // log state
    for (const [key, value] of searchParams.entries()) {
      console.log(`sp: key:value - ${key}: ${value}`);
    }
  }, [slug, searchParams]);

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    name: `${slug.split("-").slice(1).join(" ")}`,
  };

  const getObjectData = () => {
    const found = listSortOptions.find(
      (item) => item.label === searchParams.get("sort")
    );
    return found.value;
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
    // selected: sort,
    // const getSelected = () => {
    //   const item = items && items.find((item) => item.value === selected);
    //   return item ? item.label : title;
    // };
    // selected: listSortOptions.find(
    //   (item) => item.label === searchParams.get("sort")
    // ),
    // selected: searchParams.get("sort"),
    selected: searchObject(searchParams.get("sort"), "label", listSortOptions)
      .value,
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
