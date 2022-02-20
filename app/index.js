const express = require("express");
const axios = require("axios");

let app = express();
const port = 3500;
let config = {
  headers: { "Access-Control-Allow-Origin": "*" },
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/location/search/:query", (req, res, config) => {
  console.log(req.params.query);

  const options = {
    method: "GET",
    url: `https://foreca-weather.p.rapidapi.com/location/search/${req.params.query}`,
    params: { lang: "en" },
    headers: {
      "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
      "x-rapidapi-key": "489000409fmshedfc99ee4b1f2c0p16696ejsn0edd126fc028",
    },
  };

  // fill data
  axios
    .request(options)
    .then((response) => {
      res.send({ name: "petras", test: `${JSON.stringify(response.data)}` });
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/location/geography/:locationId", (req, res) => {
  console.log(req);
  res.send({ name: "petras", test: `${req.params.query}` });
});

app.get("/weather/current/:locationId", (req, res) => {
  console.log(req);
  res.send({ name: "petras", test: `${req.params.locationId}` });
});

app.get("/weather/daily/:locationId", (req, res) => {
  console.log(req);
  res.send({ name: "petras", test: `${req.params.locationId}` });
});

app.listen(port, () => console.info(`Server has started on ${port}`));
