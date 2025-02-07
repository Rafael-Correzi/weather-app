import * as grabDOM from "./domElements.js";
import clearNight from "./svgs/clear-night.svg";
import cloudy from "./svgs/cloudy.svg";
import foggy from "./svgs/foggy.svg";
import partlyCloudyDay from "./svgs/partly-cloudy-day.svg";
import partlyCloudyNight from "./svgs/partly-cloudy-night.svg";
import snow from "./svgs/rain-snow.svg";
import rain from "./svgs/rain.svg";
import clearDay from "./svgs/sun.svg";
import windy from "./svgs/windy.svg";

const degrees = `°C`;

async function find(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=TNU9NFWTT382WGD6LTP525A76&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  );
  const weather = await response.json();
  const place = weather.resolvedAddress;
  const description = weather.description;
  const current = weather.currentConditions.conditions;
  const temp = weather.currentConditions.temp;
  const feelsLike = weather.currentConditions.feelslike;
  const humidity = weather.currentConditions.humidity;
  const precipitation = weather.currentConditions.precip;
  const precipitationProb = weather.currentConditions.precipprob;
  const precipType = weather.currentConditions.preciptype;
  const wind = weather.currentConditions.windspeed;
  const visibility = weather.currentConditions.visibility;
  const uv = weather.currentConditions.uvindex;
  const sunrise = weather.currentConditions.sunrise;
  const sunset = weather.currentConditions.sunset;
  const icon = weather.currentConditions.icon;
  const today = {
    place,
    description,
    current,
    temp,
    feelsLike,
    humidity,
    precipitation,
    precipitationProb,
    precipType,
    wind,
    visibility,
    uv,
    sunrise,
    sunset,
    icon,
  };
  return {
    weather,
    today,
  };
}

function addToDOM(
  tempPassed,
  precipitationPassed,
  probPassed,
  uvPassed,
  //uvNext1Passed,
  //uvNext2Passed,
  //seeAllUVPassed,
  feelsLikePassed,
  humidityPassed,
  visibilityPassed,
  windspeedPassed,
  sunrisePassed,
  sunsetPassed
) {
  grabDOM.temp.textContent += tempPassed;
  grabDOM.temp.textContent += degrees;
  grabDOM.precipitation.textContent += precipitationPassed;
  grabDOM.uv.textContent += uvPassed;
  //grabDOM.uvNext1.textContent += uvNext1Passed;
  //grabDOM.uvNext2.textContent += uvNext2Passed;
  //grabDOM.seeAllUV.textContent += seeAllUVPassed;
  grabDOM.feelsLike.textContent += feelsLikePassed;
  grabDOM.feelsLike.textContent += degrees;
  grabDOM.humidity.textContent += humidityPassed;
  grabDOM.visibility.textContent += visibilityPassed;
  grabDOM.windspeed.textContent += windspeedPassed;
  grabDOM.sunrise.textContent += sunrisePassed;
  grabDOM.sunset.textContent += sunsetPassed;
}

function clear() {
  grabDOM.temp.textContent = "";
  grabDOM.temp.textContent = "";
  grabDOM.precipitation.textContent = "";
  grabDOM.uv.textContent = "";
  //grabDOM.uvNext1.textContent = '';
  //grabDOM.uvNext2.textContent = '';
  //grabDOM.seeAllUV.textContent = '';
  grabDOM.feelsLike.textContent = "";
  grabDOM.feelsLike.textContent = "";
  grabDOM.humidity.textContent = "";
  grabDOM.visibility.textContent = "";
  grabDOM.windspeed.textContent = "";
  grabDOM.sunrise.textContent = "";
  grabDOM.sunset.textContent = "";
  while (grabDOM.barGraph.firstChild) {
    grabDOM.barGraph.removeChild(grabDOM.barGraph.lastChild);
  }
}

function changeIcon(weather) {
  const icons = {
    snow: snow,
    rain: rain,
    fog: foggy,
    wind: windy,
    cloudy: cloudy,
    "partly-cloudy-day": partlyCloudyDay,
    "partly-cloudy-night": partlyCloudyNight,
    "clear-day": clearDay,
    "clear-night": clearNight,
  };
  grabDOM.icon2.src = icons[weather];
}

function addGraph(uv) {
  const div = document.createElement("div");
  const bar = document.createElement("div");
  const spanIndex = document.createElement("span");
  spanIndex.textContent = uv;
  bar.style.height = `${uv * 25}px`;
  bar.style.width = "30px";
  switch (true) {
    case uv < 3:
      bar.style.backgroundColor = "green";
      break;
    case uv < 6:
      bar.style.backgroundColor = "yellow";
      break;
    case uv < 8:
      bar.style.backgroundColor = "orange";
      break;
    case uv < 11:
      bar.style.backgroundColor = "red";
      break;
    case uv >= 11:
      bar.style.backgroundColor = "purple";
  }
  div.classList.add("uv-graph");
  grabDOM.barGraph.appendChild(div);
  div.appendChild(spanIndex);
  div.appendChild(bar);
}

async function search(searchTerm) {
  const json = await find(searchTerm);
  console.log(json.today);
  console.log(json.weather);
  addToDOM(
    json.today.temp,
    json.today.precipitation,
    json.today.precipitationProb,
    json.today.uv,
    json.today.feelsLike,
    json.today.humidity,
    json.today.visibility,
    json.today.wind,
    json.today.sunrise,
    json.today.sunset
  );
  for (let i = 6; i <= 18; i++) {
    addGraph(json.weather.days[0].hours[i].uvindex);
  }
  changeIcon(json.today.icon);
}
grabDOM.form.addEventListener("submit", (e) => {
  e.preventDefault();
  clear();
  search(grabDOM.searchBar.value);
});
