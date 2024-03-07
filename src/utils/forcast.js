const axios = require("axios");

const forecast = (latitude, longitude, callback) => {
  const apiKey = "cfd1abedcdbb9bc2eecb0f72f0a6148f"; // Replace this with your actual API key
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`;

  axios
    .get(url)
    .then((response) => {
      callback(undefined, response.data.current);
    })
    .catch((error) => {
      callback("Unable to connect to weather service!", undefined);
    });
};

module.exports = forecast;
