import React from "react";
import { FaRegCalendar, FaRegCheckSquare, FaRegStar } from "react-icons/fa";
// import styled from "styled-components/dist/styled-components-macro.esm";
import styled from "styled-components/macro";

const defaultFilters = {
  sortby: "rating",
  genres: [],
  certification: [],
  rating_min: 0.0,
  rating_max: 10.0,
  votes_min: 100000,
  year_min: 1890,
  year_max: 2025,
};

export default function ActiveFilters({ filters }) {
  console.log("ActiveFilters: filters", filters);

  const formatRange = (key) => {
    if (!filters) return "";
    const min = `${key}_min`;
    const max = `${key}_max`;
    console.log(`min/max: ${min} / ${max}`);
  };

  const f = {
    genres: () => {
      if (filters.genres && Array.isArray(filters.genres)) {
        return filters.genres.join(", ");
      } else {
        return filters.genres;
      }
    },
    certifications: () => {
      if (filters.certification && Array.isArray(filters.certification)) {
        return filters.certification.join(", ");
      } else {
        return filters.certification;
      }
    },
    ratings: () => {
      const formatRating = (number) => {
        // const n = Number.parseFloat(number).toFixed(1);
        const n = Number.parseFloat(number).toPrecision(2);

        console.log(`formatNumbers: ${number} as ${n}`);
        return n;
      };
      if (filters.rating_max === defaultFilters.rating_max) {
        const minRating = Number.parseFloat(filters.rating_min).toPrecision(2);
        return `${minRating}+`;
        // } else if (filters.rating_min === defaultFilters.rating_min) {
        //   return `${filters.rating_min} - ${filters.rating_max}`;
      } else {
        const minRating = Number.parseFloat(filters.rating_min).toPrecision(2);
        const maxRating = Number.parseFloat(filters.rating_max).toPrecision(2);
        return `${minRating} - ${maxRating}`;
      }
    },
    years: () => {
      if (filters.year_max === defaultFilters.year_max) {
        return `${filters.year_min}+`;
        // } else if (filters.rating_min === defaultFilters.rating_min) {
        //   return `${filters.rating_min} - ${filters.rating_max}`;
      } else {
        return `${filters.year_min} - ${filters.year_max}`;
      }
    },
    votes: () => {
      if (filters.votes_min === 0) {
        return ``;
      } else {
        return `${filters.votes_min.toLocaleString()}+`;
      }
    },
  };

  return (
    <ActiveFiltersBar>
      <div style={{ marginRight: "auto" }}>{"Filters"}</div>
      {filters.genres && <ActiveFilterTag>{f.genres()}</ActiveFilterTag>}
      {filters.certification && (
        <ActiveFilterTag>{f.certifications()}</ActiveFilterTag>
      )}
      <ActiveFilterTag>
        <FaRegStar />
        {f.ratings()}
      </ActiveFilterTag>
      <ActiveFilterTag>
        <FaRegCheckSquare />
        {f.votes()}
      </ActiveFilterTag>
      <ActiveFilterTag>
        <FaRegCalendar />
        {f.years()}
      </ActiveFilterTag>
    </ActiveFiltersBar>
  );
}

const ActiveFiltersBar = styled.div`
  grid-area: activefiltersbar;
  color: gray;
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  //row-gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
`;

const ActiveFilterTag = styled.div`
  background: whitesmoke;
  color: #333;
  //border: 1px solid lightgray;
  margin: 4px 8px;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  text-transform: capitalize;

  svg {
    color: #666;
    margin-right: 0.25rem;
  }
`;
