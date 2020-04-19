import React, { useState, useEffect } from "react";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import { Header, Sidebar, Toolbar, MovieList, NavMenu } from "../components";
import styled, { css } from "styled-components/macro";
import { useDataApi } from "../useDataApi";
import { device } from "../devices";
import moment from "moment";
import twix from "twix";

const twixDateString = (start, end) => {
  return moment(start).twix(end, { allDay: true }).format();
};

const startOfWeek = (date) => {
  return (moment(date) || moment()).startOf("week");
};

const endOfWeek = (date) => {
  return (moment(date) || moment()).endOf("week");
};

export default function Releases({
  sidebarVisible,
  toggleSidebar,
  navMenuVisible,
  toggleNavMenu,
}) {
  let history = useHistory();
  let match = useRouteMatch("/release-dates/:week");
  const startWeek = (match) => {
    const week = match ? match.params.week : startOfWeek();
    return moment(week).format("YYYY-MM-DD");
  };
  const [startDate, setStartDate] = useState(startWeek);
  const listUrl =
    `https://matthewhopps.com/api/movie/` +
    `?orderby=digital_release` +
    `&digital_release__gte=${startOfWeek(startDate).format("YYYY-MM-DD")}` +
    `&digital_release__lt=${endOfWeek(startDate).format("YYYY-MM-DD")}`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  // const { count, results, next, previous } = data;

  const dateFormated = twixDateString(startDate, endOfWeek(startDate));

  const pushWeek = (week) => {
    history.push(`/release-dates/${week.format("YYYY-MM-DD")}`);
  };
  const prevWeek = () => pushWeek(moment(startDate).subtract(7, "d"));
  const nextWeek = () => pushWeek(moment(startDate).add(7, "d"));

  const listData = { movie_count: data?.count, name: "Digital Releases" };
  const dateData = {
    prevWeek: prevWeek,
    nextWeek: nextWeek,
    thisWeek: startOfWeek,
    dateString: dateFormated,
  };

  useEffect(() => {
    setUrl(listUrl);
  }, [setUrl, startDate, listUrl]);

  useEffect(() => {
    setStartDate(startWeek(match));
  }, [match]);

  return (
    <StyledReleases>
      <Header toggleSidebar={toggleSidebar} toggleNavMenu={toggleNavMenu} />
      <NavMenu isOpen={navMenuVisible} toggleOpen={toggleNavMenu} />
      <Toolbar listData={listData} dateData={dateData} />
      {/*<Sidebar isOpen={sidebarVisible} toggleOpen={toggleSidebar} />*/}
      <MovieList
        movies={data?.results}
        isLoading={isLoading}
        isError={isError}
      />
    </StyledReleases>
  );
}

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

  @media ${device.min.desktop} {
    grid-template-areas:
      "header header"
      "sidebar toolbar"
      "sidebar main";
    grid-template-columns: 200px 1fr;
    grid-template-rows: 55px auto 1fr;
  }
`;
