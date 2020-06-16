export const discoverySortOptions = [
  { value: "-rating,-votes", label: "Rating" },
  { value: "-votes,-rating", label: "Votes" },
  { value: "year,title", label: "Year" },
  { value: "title,year", label: "Title" },
];

export const releasesSortOptions = [
  { value: "digital,-rating", label: "Release" },
  // { value: "release_date", label: "Release Date" },
  { value: "-rating,digital", label: "Rating" },
  { value: "-votes,digital", label: "Votes" },
  { value: "title,digital", label: "Title" },
  // { value: "year,digital", label: "Year" },
];

export const genreOptions = [
  { name: "action", label: "Action" },
  { name: "adventure", label: "Adventure" },
  { name: "animation", label: "Animation" },
  { name: "biography", label: "Biography" },
  { name: "comedy", label: "Comedy" },
  { name: "crime", label: "Crime" },
  { name: "documentary", label: "Documentary" },
  { name: "drama", label: "Drama" },
  { name: "family", label: "Family" },
  { name: "film-noir", label: "Film-Noir" },
  { name: "fantasy", label: "Fantasy" },
  { name: "history", label: "History" },
  { name: "horror", label: "Horror" },
  { name: "music", label: "Music" },
  { name: "musical", label: "Musical" },
  { name: "mystery", label: "Mystery" },

  { name: "romance", label: "Romance" },
  { name: "sci-fi", label: "Sci-Fi" },
  { name: "sport", label: "Sport" },
  { name: "thriller", label: "Thriller" },
  { name: "war", label: "War" },
  { name: "western", label: "Western" },

  // TODO: remove from db
  // { name: "reality-tv", label: "Reality-TV" },

  // { name: "game-show", label: "Game-Show" },
  // { name: "talk-Show", label: "Talk-Show" },
  // { name: "news", label: "News" },
  // { name: "short", label: "Short" },
];

export const certOptions = [
  { name: "G", label: "G" },
  { name: "PG", label: "PG" },
  { name: "PG-13", label: "PG-13" },
  { name: "R", label: "R" },
  { name: "Unrated", label: "Unrated" },
];

export const genreSelectOptions = [
  { value: "action", label: "Action" },
  { value: "adult", label: "Adult" },
  { value: "adventure", label: "Adventure" },
  { value: "animation", label: "Animation" },
  { value: "comedy", label: "Comedy" },
  { value: "crime", label: "Crime" },
  { value: "documentary", label: "Documentary" },
  { value: "drama", label: "Drama" },
  { value: "family", label: "Family" },
  { value: "film-noir", label: "Film-Noir" },
  { value: "fantasy", label: "Fantasy" },
  { value: "music", label: "Music" },

  { value: "sport", label: "Sport" },
  { value: "romance", label: "Romance" },

  { value: "thriller", label: "Thriller" },
  { value: "game-show", label: "Game-Show" },
  { value: "mystery", label: "Mystery" },
  { value: "short", label: "Short" },
  { value: "musical", label: "Musical" },
  { value: "biography", label: "Biography" },
  { value: "history", label: "History" },
  { value: "news", label: "News" },
  { value: "horror", label: "Horror" },
  { value: "war", label: "War" },
  { value: "western", label: "Western" },
  { value: "reality-tv", label: "Reality-TV" },
  { value: "talk-Show", label: "Talk-Show" },

  { value: "sci-fi", label: "Sci-Fi" },
];

export const certSelectOptions = [
  { value: "G", label: "G" },
  { value: "PG", label: "PG" },
  { value: "PG-13", label: "PG-13" },
  { value: "R", label: "R" },
  { value: "Unrated", label: "Unrated" },
];

// export const certOptions = [
//   { name: "g", label: "G" },
//   { name: "pg", label: "PG" },
//   { name: "pg-13", label: "PG-13" },
//   { name: "r", label: "R" },
//   { name: "unrated", label: "Unrated" },
// ];
