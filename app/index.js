const express = require("express");
const axios = require("axios");
const cors = require("cors");

let app = express();
const port = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.get("/location/search/:query", (req, res) => {
  console.log(req.params.query);

  const options = {
    method: "GET",
    url: `https://foreca-weather.p.rapidapi.com/location/search/${req.params.query}`,
    params: { lang: "en" },
    headers: {
      "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
      "x-rapidapi-key": "489000409fmshedfc99ee4b1f2c0p16696ejsn0edd126fc028",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // fill data
  axios
    .request(options)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/location/geography/:locationId", (req, res) => {
  const options = {
    method: "GET",
    url: `https://foreca-weather.p.rapidapi.com/location/${req.params.locationId}`,
    headers: {
      "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
      "x-rapidapi-key": "489000409fmshedfc99ee4b1f2c0p16696ejsn0edd126fc028",
    },
  };
  axios
    .request(options)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/weather/current/:locationId", (req, res) => {
  const options = {
    method: "GET",
    url: `https://foreca-weather.p.rapidapi.com/current/${req.params.locationId}`,
    params: {
      alt: "0",
      tempunit: "C",
      windunit: "MS",
      tz: "Europe/London",
      lang: "en",
    },
    headers: {
      "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
      "x-rapidapi-key": "489000409fmshedfc99ee4b1f2c0p16696ejsn0edd126fc028",
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/weather/daily/:locationId", (req, res) => {
  const options = {
    method: "GET",
    url: `https://foreca-weather.p.rapidapi.com/forecast/daily/${req.params.locationId}`,
    params: {
      alt: "0",
      tempunit: "C",
      windunit: "MS",
      periods: "7",
      dataset: "standard",
    },
    headers: {
      "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
      "x-rapidapi-key": "489000409fmshedfc99ee4b1f2c0p16696ejsn0edd126fc028",
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(port, () => console.info(`Server has started on ${port}`));
