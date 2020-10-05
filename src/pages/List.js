import React from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import { Header, HeaderWithSearch, MovieList, Dropdown } from "../components";
import { useQueryParams, useRenderCount } from "../hooks";
import { listSortOptions } from "../constants";
import API from "../api/api";
import { FaSortAmountDownAlt } from "react-icons/fa";
import {
  StyledToolbar,
  ListToolBar,
  ListInfo,
  ButtonWrap,
} from "../styled/ToolbarStyled";

export default function List({ view = "list" }) {
  useRenderCount();
  let { slug = "tmdb-popular" } = useParams();
  document.title = `${slug} Movies - MMDb`;
  const sortOptions = listSortOptions;
  const [queryParams, updateQueryParams] = useQueryParams({
    sort: sortOptions[0].label,
  });
  console.log("List: useQueryParams: ", queryParams);

  const printGetsMovieData = (key, paramKeys, nextPage, queryParams) => {
    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);
    console.log("getMovies(): queryParams: ", queryParams);
  };

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    const { value } = sortOptions.find(({ value, label }) => {
      return [value, label].includes(paramKeys.sort);
    });
    const qParams = {
      list_slug: paramKeys.slug,
      sortby: value,
      page_size: 15,
    };
    printGetsMovieData(key, paramKeys, nextPage, qParams);

    const response = await API.get(`/movielist/`, {
      params: { page: nextPage, ...qParams },
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
  } = useInfiniteQuery(["movielist", { slug, ...queryParams }], getMovies, {
    getFetchMore: (lastPage, allPages) => lastPage.next_page,
  });

  const onSortChange = ({ value, label }) => {
    console.log(`On Sort - Set: ${value} (${label})`);
    updateQueryParams({ ...queryParams, sort: label });
  };

  return (
    <StyledList>
      {/*<Header />*/}
      <HeaderWithSearch />
      <StyledToolbar>
        <ListToolBar>
          <ListInfo>
            <p>{slug.split("-").slice(1).join(" ") || "Loading..."}</p>
            <span>{data && data[0].count}</span>
          </ListInfo>

          <ButtonWrap>
            <Dropdown
              title={"Sort"}
              selected={queryParams.sort}
              onSelect={onSortChange}
              items={listSortOptions}
              icon={<FaSortAmountDownAlt />}
            />
          </ButtonWrap>
        </ListToolBar>
      </StyledToolbar>

      {/* TODO: useMemo on movies using dependency [data] */}
      <MovieList
        movies={
          data && data.reduce((acc, page) => [...acc, ...page.results], [])
        }
        isLoading={status === "loading"}
        isError={error}
      />

      {/* TODO: make own component or useIntersectionObserver */}
      <LoadMoreButton
        // ref={loadMoreButtonRef}
        onClick={() => fetchMore()}
        hidden={!canFetchMore}
        disabled={isFetching}
      >
        {isFetching ? "Loading..." : "Show More"}
      </LoadMoreButton>

      {/* TODO: move poster or list option to MovieList component */}
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
