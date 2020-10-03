import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";

const qsOptions = {
  arrayFormat: "comma",
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: true,
  sort: false,
};

const paramsToObj = (location) => {
  return qs.parse(location.search, qsOptions);
};

const paramsToString = (params) => {
  return qs.stringify(params, qsOptions);
};

function useQueryParams(requiredParams = null) {
  // function useQueryParams() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("useQueryParams: requiredParams: ", requiredParams);

  const params = useMemo(() => {
    return requiredParams
      ? { ...requiredParams, ...qs.parse(location.search, qsOptions) }
      : { ...qs.parse(location.search, qsOptions) };
  }, [requiredParams, location.search]);
  console.log("useQueryParams: params: ", params);

  // const [queryParams, setQueryParams] = useState(params);
  // const [queryParams, setQueryParams] = useState(
  //   qs.parse(location.search, qsOptions)
  // );

  const updateQueryParams = (params) => {
    console.log("useQueryParams: *navigated*");
    navigate(location.pathname + "?" + paramsToString(params));
  };

  // useEffect(() => {
  //   if (requiredParams) {
  // updateQueryParams({ ...requiredParams, ...queryParams });
  // }
  // }, []);

  // useEffect(() => {
  //   console.log("useQueryParams: *setQueryParams*");
  //   setQueryParams(qs.parse(location.search, qsOptions));
  // }, [location.search]);

  // return [queryParams, updateQueryParams];
  return [params, updateQueryParams];
}

export { useQueryParams };
