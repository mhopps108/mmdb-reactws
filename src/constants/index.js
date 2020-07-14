export const discoverySortOptions = [
  { value: "-rating,-votes", label: "Rating" },
  { value: "-votes,-rating", label: "Votes" },
  { value: "year,title", label: "Year" },
  { value: "title,year", label: "Title" },
];

// TODO: function to return sort values with asc/desc params
//  and prepend '-' in front of values
export const discSortOps = [
  { value: "rating,votes", label: "Rating" },
  { value: "votes,rating", label: "Votes" },
  { value: "year,title", label: "Year" },
  { value: "title,year", label: "Title" },
];

export const releasesSortOptions = (type) => {
  return [
    { value: `${type},-rating,title`, label: "Release" },
    // { value: "release_date", label: "Release Date" },
    { value: `-rating,${type},title`, label: "Rating" },
    { value: `-votes,${type},title`, label: "Votes" },
    { value: `title,${type}`, label: "Title" },
    // { value: "year,digital", label: "Year" },
  ];
  // return [
  //   { value: `${type},-rating`, label: "Release" },
  //   // { value: "release_date", label: "Release Date" },
  //   { value: `-rating,${type}`, label: "Rating" },
  //   { value: `-votes,${type}`, label: "Votes" },
  //   { value: `title,${type}`, label: "Title" },
  //   // { value: "year,digital", label: "Year" },
  // ];
};

// export const releasesSortOptions = [
//   { value: "digital,-rating", label: "Release" },
//   // { value: "release_date", label: "Release Date" },
//   { value: "-rating,digital", label: "Rating" },
//   { value: "-votes,digital", label: "Votes" },
//   { value: "title,digital", label: "Title" },
//   // { value: "year,digital", label: "Year" },
// ];

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
