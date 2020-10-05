import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import moment from "moment";
// import { Header, Toolbar, MovieList } from "../components";
import { releasesSortOptions } from "../constants";
import { useQueryParams } from "../hooks";
import API from "../api/api";
import { dateUtil } from "../utils/dates";
import { device } from "../devices";
import {
  Header,
  Toolbar,
  MovieList,
  DatePager,
  Dropdown,
  HeaderWithSearch,
} from "../components";
import { FaSortAmountDownAlt, FaRegCalendar } from "react-icons/fa";
import { BsArrowDownShort, BsArrowDown } from "react-icons/bs";

import {
  StyledToolbar,
  ReleaseDatesToolBar,
  ListInfo,
  ButtonWrap,
  Button,
  DatePagerWrap,
} from "../styled/ToolbarStyled";

const { formatPeriod, startOf, endOf, getPrev, getNext } = dateUtil;

// TODO: weekOf=, month= --- query params? instead of startFrom

export default function ReleaseDates() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  let { type = "digital", period = "week" } = useParams();
  console.log(`type / period: ${type} / ${period}`);

  const sortOptions = releasesSortOptions(type);

  const [queryParams, updateQueryParams] = useQueryParams({
    sort: sortOptions[0].label,
    startFrom: startOf(moment(), period),
  });
  console.log("ReleaseDates: useQueryParams: ", queryParams);

  const printGetsMovieData = (key, paramKeys, nextPage, queryParams) => {
    console.log("getMovies(): key=", key);
    console.log("getMovies(): paramKeys=", paramKeys);
    console.log("getMovies(): nextPage=", nextPage);
    console.log("getMovies(): queryParams: ", queryParams);
  };

  const getMovies = async (key, paramKeys, nextPage = 1) => {
    const { type, period, startFrom, sort } = paramKeys;

    // const sortby = sort || sortOptions[0].label;
    const { value } = sortOptions.find(({ value, label }) => {
      return [value, label].includes(sort);
    });

    const qParams = {
      sortby: value,
      [`${type}_after`]: startOf(startFrom, period),
      [`${type}_before`]: endOf(startFrom, period),
      page_size: 15,
    };
    printGetsMovieData(key, paramKeys, nextPage, qParams);

    const response = await API.get(`/releases/`, {
      params: { page: nextPage, ...qParams },
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
    ["releases", { type, period, ...queryParams }],
    getMovies,
    {
      getFetchMore: (lastPage, allPages) => lastPage.next_page,
    }
  );

  const onSortChange = ({ value, label }) => {
    console.log(`On Sort - Set: ${value} (${label})`);
    updateQueryParams({ ...queryParams, sort: label });
  };

  const goToDate = (newStartDate) => {
    console.log("goToDate - Clicked - newStartDate: ", newStartDate);
    updateQueryParams({ ...queryParams, startFrom: newStartDate });
  };

  return (
    <StyledReleases>
      {/*<Header />*/}
      <HeaderWithSearch />
      <StyledToolbar>
        <ReleaseDatesToolBar>
          <ListInfo>
            <p>{type || "Loading..."}</p>
            <span>{data ? data[0].count : "#"}</span>
          </ListInfo>

          <ButtonWrap>
            <Dropdown
              title={"Sort"}
              selected={queryParams.sort}
              onSelect={onSortChange}
              items={sortOptions}
              // icon={<FaSortAmountDownAlt />}
              icon={<BsArrowDown />}
            />
            <Button onClick={() => console.log("not implemented")}>
              <FaRegCalendar size={"1rem"} />
            </Button>
          </ButtonWrap>

          <DatePagerWrap>
            <DatePager
              goToToday={() => goToDate(startOf(moment(), period))}
              displayDateStr={formatPeriod(queryParams.startFrom, period)}
              prevPeriod={getPrev(queryParams.startFrom, period)}
              nextPeriod={getNext(queryParams.startFrom, period)}
              goToDate={goToDate}
            />
          </DatePagerWrap>
        </ReleaseDatesToolBar>
      </StyledToolbar>
      <MovieList
        movies={
          data && data.reduce((acc, page) => [...acc, ...page.results], [])
        }
        isLoading={status === "loading"}
        isError={error}
        dateType={type}
      />
      <LoadMoreButton
        // ref={loadMoreButtonRef}
        onClick={() => fetchMore()}
        hidden={!canFetchMore}
        disabled={isFetchingMore}
      >
        {isFetching ? "Loading..." : "Show More"}
      </LoadMoreButton>
    </StyledReleases>
  );
}

// ----

const LoadMoreButton = styled.button`
  height: 40px;
  width: 90%;
  max-width: 400px;
  margin: 10px auto 100px;
  border-radius: 6px;
  background: white;
`;

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
