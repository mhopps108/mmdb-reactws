import axios from "axios";

// TODO: put in .env file
const baseUrl = "https://www.matthewhopps.com/api";
// const baseurl = "http://localhost:8000/api";

export default axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: { "Content-type": "application/json" },
});
