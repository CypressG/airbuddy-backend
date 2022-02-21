const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const http = require("http");
require("dotenv").config();

let app = express();
const port = 3500;

// Database
const mongoose = require("mongoose");
const userActions = require("./models/userActions");
const locationActions = require("./models/locationActions");

// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/kipras.me/privkey.pem",
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/kipras.me/cert.pem",
//   "utf8"
// );
// const ca = fs.readFileSync("/etc/letsencrypt/live/kipras.me/chain.pem", "utf8");

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}

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
      "x-rapidapi-key": process.env.API_KEY,
      "Access-Control-Allow-Origin": "*",
    },
  };

  // fill data
  axios
    .request(options)
    .then((response) => {
      const input = new userActions({
        page: "/location/search/",
        query: `${req.params.query}`,
      });
      //
      input.save();
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
      "x-rapidapi-key": process.env.API_KEY,
    },
  };
  axios
    .request(options)
    .then((response) => {
      const input = new userActions({
        page: "/location/geography/",
        query: `${req.params.locationId}`,
      });
      //
      input.save();

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
      "x-rapidapi-key": process.env.API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.send(JSON.stringify(response.data));
      const input = new locationActions({
        location: `${req.params.locationId}`,
        date: new Date(),
        weather: response.data.current.symbolPhrase,
      });
      //
      input.save();
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
      "x-rapidapi-key": process.env.API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.send(JSON.stringify(response.data));
      const input = new userActions({
        page: "/weather/daily/",
        query: `${req.params.locationId}`,
      });
      //
      input.save();
    })
    .catch((error) => {
      console.error(error);
    });
});

const httpServer = http.createServer(app);

httpServer.listen(8080, () => {
  console.log("HTTP Server running on port 80");
});
