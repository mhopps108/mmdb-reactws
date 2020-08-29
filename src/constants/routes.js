export const tmdbLinks = [
  {
    name: "Popular",
    path: "/list/tmdb-popular?sort=rank",
    // sort: "rank",
  },
  {
    name: "Top Rated",
    path: "/list/tmdb-top-rated?sort=rank",
    // sort: "rank",
  },
  {
    name: "Now Playing",
    path: "/list/tmdb-now-playing?sort=rank",
    // sort: "rank",
  },
  {
    name: "Upcoming",
    path: "/list/tmdb-upcoming?sort=rank",
    // sort: "rank",
  },
];

export const releaseDateLinks = [
  {
    name: "Theatrical",
    path: "/release-dates/theatrical",
  },
  {
    name: "Digital",
    path: "/release-dates/digital",
  },
  {
    name: "Physical",
    path: "/release-dates/physical",
  },
];

export const releasesLinks = [
  {
    name: "Theatrical / Month",
    path: "/releases/theatrical/month",
  },
  {
    name: "Digital / Month",
    // path: "/releases/digital",
    path: "/releases/digital/month",
  },
  {
    name: "Physical / Month",
    path: "/releases/physical/month",
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
