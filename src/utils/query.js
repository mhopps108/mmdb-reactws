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

export { paramsToObj, paramsToString };
