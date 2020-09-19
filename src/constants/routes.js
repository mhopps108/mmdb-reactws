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
    name: "Theatrical | Week",
    path: "/release-dates/theatrical/week?sort=release",
  },
  {
    name: "Digital | Week",
    path: "/release-dates/digital/week?sort=release",
  },
  {
    name: "Physical | Week",
    path: "/release-dates/physical/week?sort=release",
  },
  {
    name: "Theatrical / Month",
    path: "/release-dates/theatrical/month?sort=release",
  },
  {
    name: "Digital / Month",
    path: "/release-dates/digital/month?sort=release",
  },
  {
    name: "Physical / Month",
    path: "/release-dates/physical/month?sort=release",
  },
];

// export const releaseDateLinks = [
//   {
//     name: "Theatrical",
//     path: "/release-dates/theatrical/week?sort=release",
//   },
//   {
//     name: "Digital",
//     path: "/release-dates/digital/week?sort=release",
//   },
//   {
//     name: "Physical",
//     path: "/release-dates/physical/week?sort=release",
//   },
//   {
//     name: "Theatrical / Month",
//     path: "/release-dates/theatrical/month?sort=release",
//   },
//   {
//     name: "Digital / Month",
//     path: "/release-dates/digital/month?sort=release",
//   },
//   {
//     name: "Physical / Month",
//     path: "/release-dates/physical/month?sort=release",
//   },
// ];

export const discoveryLinks = [
  {
    name: "Top Comedies",
    // path: `/discover/?sortby=rating&genres=comedy&rating_min=5&rating_max=10&votes_min=5000&year_min=1990&year_max=2030`,
    path:
      "/discover?sortby=rating&genres=comedy&rating_min=5&rating_max=10&votes_min=5000&year_min=1990&year_max=2025",
  },
  {
    name: "Top Rated Kids Movies",
    path: `/discover?
    sortby=-rating,-votes
    &genres=animation
    &certification=G,PG
    &rating_min=5&rating_max=10
    &votes_min=2500
    &year_min=1990&year_max=2025`,
  },
  {
    name: "Best Action Movies from the 2000's",
    path:
      "/discover?sortby=rating&genres=action&rating_min=5&rating_max=10&votes_min=5000&year_min=2000&year_max=2010",
  },
];
