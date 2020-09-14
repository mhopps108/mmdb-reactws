export const listSortOptions = [
  { value: "rank", label: "rank" },
  { value: "-movie_rating,-movie_votes,movie_title", label: "rating" },
  { value: "-movie_votes,-movie_rating,movie_title", label: "votes" },
  { value: "-movie_year,-movie_rating,movie_title", label: "year" },
  { value: "movie_title,-movie_year,-movie_rating", label: "title" },
];

export const discoverySortOptions = [
  { value: "-rating,-votes,title", label: "rating" },
  { value: "-votes,-rating,title", label: "votes" },
  { value: "year,-rating,title", label: "year" },
  { value: "title,-rating,year", label: "title" },
];

export const disSortOptions = {
  rating: "-rating,-votes",
  // { value: "-rating,-votes", label: "Rating" },
  // { value: "-votes,-rating", label: "Votes" },
  // { value: "year,title", label: "Year" },
  // { value: "title,year", label: "Title" },
};

export const releasesSortOptions = (type) => {
  // type is a release date from 'theatrical', 'digital', 'physical', 'tv'?
  return [
    { value: `${type},-rating,title`, label: "release" },
    // { value: "release_date", label: "Release Date" },
    { value: `-rating,${type},title`, label: "rating" },
    { value: `-votes,${type},title`, label: "votes" },
    { value: `title,${type}`, label: "title" },
  ];
};

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
  { name: "science fiction", label: "Sci-Fi" },
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
