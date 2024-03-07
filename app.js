const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./src/utils/geocode");
const forcast = require("./src/utils/forcast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "The Weather App",
    name: "Logan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Logan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: `If you spot a bug reach out at logangayler@gmail.com - thank you!`,
    title: "Help",
    name: "Logan",
  });
});

app.get("/weather", (req, res) => {
  console.log("hit weather route");
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, mapboxResponse = {}) => {
    if (error) return res.send({ error });
    console.log("*******mapboxResponse", mapboxResponse);

    const { longitude, latitude, location } = mapboxResponse;

    forcast(latitude, longitude, (error, forecastData) => {
      console.log("🚀 ~ forcast ~ forecastData:", forecastData);
      res.send({
        location: mapboxResponse.location,
        forecast: forecastData.weather_descriptions[0],
        temperature: (forecastData.temperature * 9) / 5 + 32,
        feelslike: forecastData.feelslike,
        uv_index: forecastData.uv_index,
        humidity: forecastData.humidity,
        wind_speed: forecastData.wind_speed,
        wind_dir: forecastData.wind_dir,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log("🚀 ~ app.get ~ req:", req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    message: "Sorry mate, that help page was not found.",
    name: "Logan",
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    message: "Sorry mate, page not found.",
    name: "Logan",
  });
});

app.listen(3005, () => {
  console.log("Server runnin 🏃🏻‍♂️");
});
