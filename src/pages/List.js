import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import { Header, Toolbar, MovieList, MoviePosterList } from "../components";
import { listSortOptions } from "../constants";
import API from "../api/api";
// import { useQueryParams, useIntersectionObserver } from "../hooks";
import qs from "query-string";

const qsOptions = {
  arrayFormat: "comma",
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: true,
  sort: false,
};

export default function List({ view = "list" }) {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  let navigate = useNavigate();
  const location = useLocation();
  let { slug = "tmdb-popular" } = useParams();
  const sortOptions = listSortOptions;

  const [params, setParams] = useState(qs.parse(location.search, qsOptions));
  console.log("params: ", params);

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    if (!paramKeys.sort) {
      onSortChange(sortOptions[0]);
    }
    const sortby = paramKeys.sort || sortOptions[0].label;
    const { value } = sortOptions.find(({ value, label }) => {
      return [value, label].includes(sortby);
    });
    const queryParams = {
      list_slug: paramKeys.slug,
      sortby: value,
      page_size: 15,
    };

    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);
    console.log("getMovies(): queryParams=", queryParams);

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
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(["movielist", { slug, ...params }], getMovies, {
    getFetchMore: (lastPage, allPages) => lastPage.next_page,
  });

  const onSortChange = ({ value, label }) => {
    console.log(`On Sort - Set: ${value} (${label})`);
    setParams({ ...params, sort: label });
  };

  useEffect(() => {
    navigate(location.pathname + "?" + qs.stringify({ ...params }, qsOptions));
  }, [navigate, slug, params]);

  // toolbar data
  const listData = {
    movie_count: data ? data[0].count : "#",
    name: `${slug.split("-").slice(1).join(" ")}`,
  };
  const sortData = {
    options: listSortOptions,
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
