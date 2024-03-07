const axios = require("axios");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibG9nYW5ub2RlIiwiYSI6ImNsdGhsdzh0YzA2NDkyanA5bWFtMXBrdTkifQ.nMRY5RB2DmfPkVZZEcwwmQ";

  axios
    .get(url)
    .then((response) => {
      const coordinates = response.data.features[0].center;
      const longitude = coordinates[0];
      const latitude = coordinates[1];

      if (response.data.features.length === 0) {
        callback("Unable to find location. Try another search.", undefined);
      } else {
        callback(undefined, {
          latitude: latitude,
          longitude: longitude,
          location: response.data.features[0].place_name,
        });
      }
    })
    .catch((error) => {
      console.log("🚀 ~ geocode ~ error", error);
      callback("Unable to connect to location services!", undefined);
    });
};

module.exports = geocode;
