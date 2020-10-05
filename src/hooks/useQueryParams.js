import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";

const qsOptions = {
  arrayFormat: "comma",
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: true,
  sort: false,
};

const paramsToObj = (searchParams) => {
  return qs.parse(searchParams, qsOptions);
};

const paramsToString = (params) => {
  return qs.stringify(params, qsOptions);
};

// Used to sync the url and local component state (source of truth is the url)
function useQueryParams(requiredParams = null) {
  // console.log("useQueryParams: requiredParams: ", requiredParams);
  const navigate = useNavigate();
  const location = useLocation();

  const updateQueryParams = (params) => {
    // console.log("useQueryParams: *navigated*");
    navigate(location.pathname + "?" + paramsToString(params));
  };

  const queryParams = useMemo(() => {
    if (requiredParams) {
      return { ...requiredParams, ...paramsToObj(location.search) };
      // const newParams = { ...requiredParams, ...paramsToObj(location.search) };
      // updateQueryParams(newParams);
    }
    return { ...paramsToObj(location.search) };
  }, [requiredParams, location.search]);

  useEffect(() => {
    if (requiredParams) {
      updateQueryParams({ ...requiredParams, ...paramsToObj(location.search) });
    }
  }, []);

  console.log("useQueryParams: params: ", queryParams);
  return [queryParams, updateQueryParams];
}

export { useQueryParams };
