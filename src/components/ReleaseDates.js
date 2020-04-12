import React, { useState, useEffect } from "react";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import { useDataApi } from "../useDataApi";
import MovieListItem from "./MovieListItem";
import styled, { css } from "styled-components/macro";
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

const StyledReleases = styled.div`
  grid-area: main;
  display: flex;
`;

export default function ReleaseDates() {
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
  const { count, results, next, previous } = data;
  // if over page limit (currently 30), next will give movies 31-60, infinite scroll
  // reach bottom, check for next and append results
  const pushWeek = (week) => {
    history.push(`/release-dates/${week.format("YYYY-MM-DD")}`);
  };
  const prevWeek = () => pushWeek(moment(startDate).subtract(7, "d"));
  const nextWeek = () => pushWeek(moment(startDate).add(7, "d"));

  useEffect(() => {
    setUrl(listUrl);
  }, [setUrl, startDate, listUrl]);

  useEffect(() => {
    setStartDate(startWeek(match));
  }, [match]);

  // useEffect(() => {
  //   console.log(`Release Date state data`);
  //   console.log(state);
  //   console.log(startDate);
  // }, [state, startDate]);

  return (
    <StyledReleases>
      <div className="row sticky-top">
        <div
          className="col-12 d-flex justify-content-between align-items-center py-1 px-2 mb-2"
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            backgroundColor: "#efefef",
            color: "#14181c",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <div>Release Dates</div>
          <div>
            <div className="btn" style={{ border: "none" }} onClick={prevWeek}>
              {"<"}
            </div>
            <div
              className="btn"
              style={{ border: "none", fontSize: "1.1rem", fontWeight: 500 }}
              onClick={() => pushWeek(startOfWeek())}
            >
              {twixDateString(startOfWeek(startDate), endOfWeek(startDate))}
            </div>
            <div className="btn" style={{ border: "none" }} onClick={nextWeek}>
              {">"}
            </div>
          </div>
          <div>#{count}</div>
        </div>
      </div>

      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <div className="row">
          {(results || []).map((movie) => (
            <div className="col-xs-12 col-md-6 p-1 mb-2">
              <MovieListItem key={movie.imdb_id} movie={movie} />
            </div>
          ))}
        </div>
      )}
    </StyledReleases>
  );
}
