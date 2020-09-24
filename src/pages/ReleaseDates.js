import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";
import moment from "moment";
// import { Header, Toolbar, MovieList } from "../components";
import { releasesSortOptions } from "../constants";
import API from "../api/api";
import { dateUtil } from "../utils/dates";
import qs from "query-string";

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

const qsOptions = {
  arrayFormat: "comma",
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: true,
  sort: false,
};

const { formatPeriod, startOf, endOf, getPrev, getNext } = dateUtil;

// TODO: weekOf=, month= --- query params? instead of startFrom

export default function RDWithToolbar() {
  let renderRef = useRef(0);
  renderRef.current = renderRef.current + 1;
  console.log("render: ", renderRef.current);

  let navigate = useNavigate();
  const location = useLocation();
  let { type = "digital", period = "week" } = useParams();

  console.log("loc: ", location);
  console.log(`type / period: ${type} / ${period}`);

  const sortOptions = releasesSortOptions(type);
  // merging with params causes a rerender and sets the browsers url
  const defaultParams = {
    sort: sortOptions[0].label,
    startFrom: startOf(moment(), period),
  };
  const [params, setParams] = useState({
    ...defaultParams,
    ...qs.parse(location.search, qsOptions),
  });
  console.log("params: ", params);

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

    const queryParams = {
      sortby: value,
      [`${type}_after`]: startOf(startFrom, period),
      [`${type}_before`]: endOf(startFrom, period),
      page_size: 15,
    };
    printGetsMovieData(key, paramKeys, nextPage, queryParams);

    const response = await API.get(`/releases/`, {
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
  } = useInfiniteQuery(["releases", { type, period, ...params }], getMovies, {
    getFetchMore: (lastPage, allPages) => lastPage.next_page,
  });

  const onSortChange = ({ value, label }) => {
    console.log(`On Sort - Set: ${value} (${label})`);
    setParams({ ...params, sort: label });
  };

  const goToDate = (newStartDate) => {
    console.log("goToDate - Clicked - newStartDate: ", newStartDate);
    setParams({ ...params, startFrom: newStartDate });
  };

  useEffect(() => {
    setParams({
      ...params,
      startFrom: startOf(moment(), period),
    });
  }, [period, type]); // TODO: use location.pathname ??

  useEffect(() => {
    navigate(location.pathname + "?" + qs.stringify(params, qsOptions));
  }, [navigate, location.pathname, params]);

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
              selected={params.sort}
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
              displayDateStr={formatPeriod(params.startFrom, period)}
              prevPeriod={getPrev(params.startFrom, period)}
              nextPeriod={getNext(params.startFrom, period)}
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
