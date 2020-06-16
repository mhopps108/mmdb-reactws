// const baseurl = "http://localhost:8000/api";
const baseurl = "https://www.matthewhopps.com/api";

export const discoveryQueryString = (queryState) => {
  console.log("discoveryQueryString == ", queryState);
  const { orderby, genres, certs, ratings, votes, years } = queryState;
  const [minRating, maxRating] = ratings;
  const [minYear, maxYear] = years;
  const [minVotes, maxVotes] = votes;
  const queryObj = {
    // orderby: orderby,
    // genres: genres.sort().join(","),
    // certification: certs.sort().join(","),
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

// export const discoveryQueryString = (queryState) => {
//   console.log("discoveryQueryString == ", queryState);
//   const { orderby, genres, certs, ratings, votes, years } = queryState;
//   const [minRating, maxRating] = ratings;
//   const [minYear, maxYear] = years;
//   const [minVotes, maxVotes] = votes;
//   const queryObj = {
//     orderby: orderby,
//     genres: genres.sort().join(","),
//     certification: certs.sort().join(","),
//     imdb_rating_avg__gte: minRating,
//     imdb_rating_avg__lte: maxRating,
//     imdb_rating_count__gte: maxVotes,
//     year__gte: minYear,
//     year__lte: maxYear,
//   };
//   let queryString = [];
//   for (let [key, value] of Object.entries(queryObj)) {
//     queryString.push(`${key}=${value}`);
//   }
//   return queryString.join("&");
// };

// export const discoveryQuery = (queryState) => {
//   const { genres, certs, ratings, votes, years } = queryState;
//   console.log("discoveryQuery");
//   console.log("genres", genres, Array.isArray(genres));
//   console.log(typeof certs);
//   console.log(typeof ratings);
//   console.log(typeof votes);
//   console.log(typeof years);
//
//   return discoveryQueryString(queryState);
// };

export default baseurl;
