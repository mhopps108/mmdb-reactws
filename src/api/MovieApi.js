import { useEffect, useReducer, useState } from "react";
// import axios from "axios";
import API from "./api";

const getReleaseDates = (params) => {
  return API.get("/releases", {
    params: params,
  });
};

const testapi = {
  baseUrl: "https://matthewhopps.com/api",
  discover: async (path, params) => {},
  releaseDates: async (releaseType, startFrom, endAt, sortBy) => {
    // const { sortBy, releaseType } = params;
    const url = this.baseUrl + "/releases/?sortby=??&";

    // `https://matthewhopps.com/api/releases/` +
    // `?sortby=${sort}` +
    // `&${releaseType.value}_after=${startFrom}` +
    // `&${releaseType.value}_before=${endOfMonth(startFrom)}`
  },
  releaseDates2: async (params) => {
    // const result = await apiInstance("", params);
  },
};

export default { getReleaseDates };
