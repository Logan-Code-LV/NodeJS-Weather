console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const locationResult = document.querySelector("#locationResult");
const forecastResult = document.querySelector("#forecastResult");
const temperatureResult = document.querySelector("#temperatureResult");
const feelslikeResult = document.querySelector("#feelslikeResult");
const uvIndexResult = document.querySelector("#uvIndexResult");
const humidityResult = document.querySelector("#humidityResult");
const windSpeedResult = document.querySelector("#windSpeedResult");
const windDirResult = document.querySelector("#windDirResult");
const weatherCard = document.querySelector("#weatherCard");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  fetch(`http://localhost:3005/weather?address=${location}`).then(
    (response) => {
      console.log("🚀 ~ response", response);
      response.json().then((data) => {
        weatherCard.style.display = "block"; // Show the card
        if (data.error) {
          locationResult.textContent = "Error: " + data.error;
        } else {
          locationResult.textContent = data.location;
          forecastResult.textContent = "Forecast: " + data.forecast;
          temperatureResult.textContent = "Temperature: " + data.temperature;
          feelslikeResult.textContent = "Feels Like: " + data.feelslike;
          uvIndexResult.textContent = "UV Index: " + data.uv_index;
          humidityResult.textContent = "Humidity: " + data.humidity;
          windSpeedResult.textContent = "Wind Speed: " + data.wind_speed;
          windDirResult.textContent = "Wind Direction: " + data.wind_dir;
        }
      });
    }
  );
});
