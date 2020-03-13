import { NowResponse } from "@now/node";

import {
  getTotalConfirmed,
  getTotalRecovered,
  getTotalDeaths,
  getLastUpdate
} from "../util/api";

export default async (_, response: NowResponse) => {
  const [confirmed, recovered, deaths, lastUpdate] = await Promise.all([
    getTotalConfirmed(),
    getTotalRecovered(),
    getTotalDeaths(),
    getLastUpdate()
  ]);

  response.json({
    confirmed: {
      value: confirmed,
      detail: "https://covid-2019.now.sh/api/confirmed"
    },
    recovered: {
      value: recovered,
      detail: "https://covid-2019.now.sh/api/recovered"
    },
    deaths: {
      value: deaths,
      detail: "https://covid-2019.now.sh/api/deaths"
    },
    dailySummary: "https://covid-2019.now.sh/api/daily",
    dailyTimeSeries: {
      pattern: "https://covid-2019.now.sh/api/daily/[dateString]",
      example: "https://covid-2019.now.sh/api/daily/2-14-2020"
    },
    image: "https://covid-2019.now.sh/api/og",
    source: "https://github.com/kaansey/covid-19-api",
    countries: "https://covid-2019.now.sh/api/countries",
    countryDetail: {
      pattern: "https://covid-2019.now.sh/api/countries/[country]",
      example: "https://covid-2019.now.sh/api/countries/USA"
    },
    lastUpdate
  });
};
