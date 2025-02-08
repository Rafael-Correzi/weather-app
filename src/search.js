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
import { clearDOM } from "./clearDOM.js";

let result = null;

const degrees = "°C";
const time = "us";
const speed = " KM/H";
const distance = " Kilometers";

async function find(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=TNU9NFWTT382WGD6LTP525A76&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  );
  result = await response.json();
  const place = result.resolvedAddress;
  const description = result.description;
  const current = result.currentConditions.conditions;
  const temp = result.currentConditions.temp;
  const feelsLike = result.currentConditions.feelslike;
  const humidity = result.currentConditions.humidity;
  const precipitation = result.currentConditions.precip;
  const precipitationProb = result.currentConditions.precipprob;
  const precipType = result.currentConditions.preciptype;
  const wind = result.currentConditions.windspeed;
  const visibility = result.currentConditions.visibility;
  const uv = result.currentConditions.uvindex;
  const sunrise = result.currentConditions.sunrise;
  const sunset = result.currentConditions.sunset;
  const icon = result.currentConditions.icon;
  const today = {
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
    place,
    today,
  };
}

function addToDOM(
  addressPassed,
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
  grabDOM.city.textContent = addressPassed;
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
  grabDOM.visibility.textContent += distance;
  grabDOM.windspeed.textContent += windspeedPassed;
  grabDOM.windspeed.textContent += speed;
  grabDOM.sunrise.textContent += sunrisePassed;
  grabDOM.sunset.textContent += sunsetPassed;
}

function addToDOMTomorrow(
  tempPassed,
  precipitationPassed,
  feelsLikePassed,
  humidityPassed,
  visibilityPassed,
  windspeedPassed
) {
  grabDOM.tmrTemp.textContent = tempPassed;
  grabDOM.tmrTemp.textContent += degrees;
  grabDOM.tmrPrecip.textContent = precipitationPassed;
  grabDOM.tmrFeelsLike.textContent = feelsLikePassed;
  grabDOM.tmrFeelsLike.textContent += degrees;
  grabDOM.tmrHumidity.textContent = humidityPassed;
  grabDOM.tmrVisibility.textContent = visibilityPassed;
  grabDOM.tmrVisibility.textContent += distance;
  grabDOM.tmrWindSpeed.textContent = windspeedPassed;
  grabDOM.tmrWindSpeed.textContent += speed;
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
  clearDOM(grabDOM.barGraph);
  clearDOM(grabDOM.tempGraph);
  clearDOM(grabDOM.tmrUV);
}

function changeIcon(weather, element) {
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
  element.src = icons[weather];
}

function addGraph(where, uv) {
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
  where.appendChild(div);
  div.appendChild(spanIndex);
  div.appendChild(bar);
}

function addDotGraph(i, temp, max, diff) {
  const height = ((diff - (max - temp)) * 180) / diff + 25;
  const div = document.createElement("div");
  const dot = document.createElement("div");
  const spanTemp = document.createElement("span");
  spanTemp.textContent = temp;
  spanTemp.textContent += degrees;
  dot.style.height = `${height}px`;
  div.id = `tmr${i}`;
  div.classList.add("time-graph");
  dot.classList.add("graph-points");
  grabDOM.tempGraph.appendChild(div);
  div.appendChild(spanTemp);
  div.appendChild(dot);
  addTime(div, i);
}

function linkGraph() {
  for (let i = 0; i <= 23; i++) {
    document.querySelector(`#tmr${i}`).addEventListener("click", () => {
      addToDOMTomorrow(
        result.days[1].hours[i].temp,
        result.days[1].hours[i].precip,
        result.days[1].hours[i].feelslike,
        result.days[1].hours[i].humidity,
        result.days[1].hours[i].visibility,
        result.days[1].hours[i].windspeed,
      );
      for (let j = 0; j <= 23; j++) {
        removeHighlight(document.querySelector(`#tmr${j}`));
      }
      highlightSelected(document.querySelector(`#tmr${i}`));
      changeIcon(result.days[1].hours[i].icon, grabDOM.tmrIcon);
    });
  }

}

function highlightSelected(highlighted){
  highlighted.classList.add("highlighted");
}

function removeHighlight(unhighlight) {
  unhighlight.classList.remove("highlighted");
}

function addTime(where, hour) {
  const span = document.createElement("span");
  if (time === "us") {
    span.textContent = usTime(hour);
  } else span.textContent = `${hour}`;
  where.appendChild(span);
}

function usTime(hour) {
  if (hour === 0) {
    return `12 AM`;
  }
  if (hour < 12) {
    return `${hour} AM`;
  }
  if (hour === 12) {
    return `12 PM`;
  }
  if (hour > 12 && hour < 24) {
    return `${hour - 12} PM`;
  }
}

async function search(searchTerm) {
  const json = await find(searchTerm);
  let minTemp = 300;
  let temporaryTemp;
  let maxTemp = -274;
  console.log(json.today);
  console.log(result);
  addToDOM(
    json.place,
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
    addGraph(grabDOM.barGraph, result.days[0].hours[i].uvindex, `${i}:00`);
    addGraph(grabDOM.tmrUV, result.days[1].hours[i].uvindex, `${i}:00`);
  }
  for (let i = 6; i <= 18; i++) {
    addTime(grabDOM.barGraph, i);
    addTime(grabDOM.tmrUV, i)
  }
  for (let i = 0; i <= 23; i++) {
    temporaryTemp = result.days[1].hours[i].temp;
    if (minTemp > temporaryTemp) {
      minTemp = temporaryTemp;
    }
    if (maxTemp < temporaryTemp) {
      maxTemp = temporaryTemp;
    }
  }
  let diff = maxTemp - minTemp;
  for (let i = 0; i <= 23; i++) {
    addDotGraph(i, result.days[1].hours[i].temp, maxTemp, diff);
  }
  linkGraph();

  addToDOMTomorrow(
    result.days[1].hours[0].temp,
    result.days[1].hours[0].precip,
    result.days[1].hours[0].feelslike,
    result.days[1].hours[0].humidity,
    result.days[1].hours[0].visibility,
    result.days[1].hours[0].windspeed,
  );

  changeIcon(json.today.icon, grabDOM.icon2);
  changeIcon(result.days[1].hours[0].icon, grabDOM.tmrIcon);
  highlightSelected(document.querySelector("#tmr0"));
}

grabDOM.form.addEventListener("submit", (e) => {
  e.preventDefault();
  clear();
  search(grabDOM.searchBar.value);
});

grabDOM.today.className = "highlighted";
