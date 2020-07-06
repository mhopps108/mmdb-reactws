const baseurl = "https://www.matthewhopps.com/api";
// const baseurl = "http://localhost:8000/api";

export const discoveryQueryString = (queryState) => {
  console.log("discoveryQueryString == ", queryState);
  const { orderby, genres, certs, ratings, votes, years } = queryState;
  const [minRating, maxRating] = ratings;
  const [minYear, maxYear] = years;
  const [minVotes, maxVotes] = votes;
  const queryObj = {
    // orderby: orderby,
    genres: (genres && genres.sort().join(",")) || "",
    certification: (certs && certs.sort().join(",")) || "",
    rating_min: minRating,
    rating_max: maxRating,
    votes_min: maxVotes,
    year_min: minYear,
    year_max: maxYear,
  };
  let queryString = [];
  for (let [key, value] of Object.entries(queryObj)) {
    queryString.push(`${key}=${value}`);
  }
  return queryString.join("&");
};

export default baseurl;
