import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
import { Link, useRouteMatch, useParams } from "react-router-dom";

import { useDataApi } from "./useDataApi";
import MovieListItem from "./MovieListItem";

function List() {
  let { slug } = useParams();

  const listUrl = `https://www.matthewhopps.com/api/list/${slug}/`;
  const [state, setUrl] = useDataApi(listUrl, []);
  const { data, isLoading, isError } = state;
  const { name, source, movie_count, movielistitems } = data;

  useEffect(() => {
    setUrl(listUrl);
  }, [slug, listUrl, setUrl]);

  useEffect(() => {
    console.log(`List state data ${slug}`);
    console.log(state);
  }, [state, slug]);

  return (
    <div
      className="container-fluid"
      style={{
        // background: "linear-gradient(0deg,#333 0%, #111 90%)",
        background: "linear-gradient(to bottom, #232526, #414345)",
        // background: ;
        color: "white"
      }}
    >
      <div className="row sticky-top">
        <div
          className="col-12 d-flex justify-content-between align-items-center py-1 px-2 mb-2"
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            backgroundColor: "#efefef",
            color: "#14181c",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"
          }}
        >
          <div>
            {source} • {name}
          </div>
          <div>#{movie_count}</div>
        </div>
      </div>

      {isError && <p>Error</p>}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && data && (
        <div className="row mx-auto">
          {(movielistitems || []).map(movie => (
            <div className="col-xs-12 col-md-6 p-1 mb-2">
              <MovieListItem key={movie.movie.imdb_id} movie={movie.movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { List };
