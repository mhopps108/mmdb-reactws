import React, { useState, useEffect } from "react";

// year, genres, runtime,
// imdb_rating_avg, imdb_rating_count,
// certification, digital_release

export default function useFilters() {
  const [year, setYear] = useState(null);
  const [genres, setGenres] = useState(null);
  const [runtime, setRuntime] = useState(null);
  const [imdbRatingAvg, setImdbRatingAvg] = useState(null);

  return { year, setYear, genres, setGenres, imdbRatingAvg, setImdbRatingAvg };
}
