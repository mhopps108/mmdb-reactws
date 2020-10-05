import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import { useQueryParams, useRenderCount } from "../hooks";
import {
  Header,
  Toolbar,
  MovieList,
  Dropdown,
  HeaderWithSearch,
} from "../components";
import API from "../api/api";
import qs from "query-string";

import {
  StyledToolbar,
  ReleaseDatesToolBar,
  ListInfo,
  ButtonWrap,
  Button,
  DatePagerWrap,
  ListToolBar,
} from "../styled/ToolbarStyled";
import { searchSortOptions } from "../constants";
import { FaSortAmountDownAlt } from "react-icons/fa";

// TODO: save recent searches to local storage?
//  clear from settings? bottom of list?

const qsOptions = {
  arrayFormat: "comma",
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: true,
  sort: false,
};

export default function Search() {
  useRenderCount();
  let navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = React.useState("");
  const [params, setParams] = useState(qs.parse(location.search, qsOptions));
  console.log("params: ", params);

  const printGetsMovieData = (key, paramKeys, nextPage, queryParams) => {
    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);
    console.log("getMovies(): queryParams: ", queryParams);
  };

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    const queryParams = {
      search: paramKeys.search,
      sortby: searchSortOptions[0].value,
      page_size: 15,
    };
    printGetsMovieData(key, paramKeys, nextPage, queryParams);

    const response = await API.get(`/search/`, {
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
  } = useInfiniteQuery(["search", { ...params }], getMovies, {
    getFetchMore: (lastPage, allPages) => lastPage.next_page,
  });

  useEffect(() => {
    navigate(location.pathname + "?" + qs.stringify({ ...params }, qsOptions));
  }, [navigate, location.pathname, params]);

  return (
    <StyledList>
      {/*<Header />*/}
      <HeaderWithSearch />
      <StyledToolbar>
        <ListToolBar>
          <ListInfo>
            <p>{"Search" || "Loading..."}</p>
            <span>{data ? data[0].count : "#"}</span>
          </ListInfo>
        </ListToolBar>
      </StyledToolbar>

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
