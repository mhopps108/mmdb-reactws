import axios from "axios";
import qs from "query-string";

// TODO: put in .env file
const baseUrl = "https://www.matthewhopps.com/api";
// const baseurl = "http://localhost:8000/api";

export default axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: { "Content-type": "application/json" },
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: "comma",
      skipNull: true,
      skipEmptyString: true,
      parseNumbers: true,
      sort: false,
    });
  },
});
