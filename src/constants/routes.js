export const tmdbLinks = [
  {
    name: "Popular",
    path: "/lists/tmdb-popular",
  },
  {
    name: "Top Rated",
    path: "/lists/tmdb-top-rated",
  },
  {
    name: "Now Playing",
    path: "/lists/tmdb-now-playing",
  },
  {
    name: "Upcoming",
    path: "/lists/tmdb-upcoming",
  },
];

export const releaseDateLinks = [
  {
    name: "Theatrical Releases",
    path: "/release-dates/theatrical",
  },
  {
    name: "Digital Releases",
    path: "/release-dates/digital",
  },
  {
    name: "BluRay Releases",
    path: "/release-dates/bluray",
  },
];

export const releasesLinks = [
  {
    name: "Digital Releases",
    path: "/releases",
  },
];

export const discoveryLinks = [
  {
    name: "Top Comedies",
    path: `/discover/?sortby=-rating,-votes&genres=comedy&certification=&rating_min=5&rating_max=10&votes_min=5000&year_min=1990&year_max=2030`,
  },
  {
    name: "Top Rated Kids Movies",
    path: `/discover/?
    sortby=-rating,-votes
    &genres=animation
    &certification=G,PG
    &rating_min=5&rating_max=10
    &votes_min=2500
    &year_min=1990&year_max=2030`,
  },
];
