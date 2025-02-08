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
import { hide, show, clearDOM } from "./clearDOM.js";

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

function addToDOMCurrent() {
  grabDOM.city.textContent = result.resolvedAddress;
  grabDOM.temp.textContent = result.currentConditions.temp;
  grabDOM.temp.textContent += degrees;
  grabDOM.precipitation.textContent = result.currentConditions.precip
    ? result.currentConditions.precip
    : "0";
  grabDOM.uv.textContent = result.currentConditions.uv;
  grabDOM.feelsLike.textContent = result.currentConditions.feelslike;
  grabDOM.feelsLike.textContent += degrees;
  grabDOM.humidity.textContent = result.currentConditions.humidity;
  grabDOM.visibility.textContent = result.currentConditions.visibility;
  grabDOM.visibility.textContent += distance;
  grabDOM.windspeed.textContent = result.currentConditions.windspeed;
  grabDOM.windspeed.textContent += speed;
  grabDOM.sunrise.textContent = result.currentConditions.sunrise;
  grabDOM.sunset.textContent = result.currentConditions.sunset;
}

function addToDOMHour(when, i) {
  grabDOM.hourTemp.textContent = result.days[when].hours[i].temp;
  grabDOM.hourTemp.textContent += degrees;
  grabDOM.hourPrecip.textContent = result.days[when].hours[i].precip;
  grabDOM.hourFeelsLike.textContent = result.days[when].hours[i].feelslike;
  grabDOM.hourFeelsLike.textContent += degrees;
  grabDOM.hourHumidity.textContent = result.days[when].hours[i].humidity;
  grabDOM.hourVisibility.textContent = result.days[when].hours[i].visibility;
  grabDOM.hourVisibility.textContent += distance;
  grabDOM.hourWindSpeed.textContent = result.days[when].hours[i].windspeed;
  grabDOM.hourWindSpeed.textContent += speed;
}

function clear() {
  grabDOM.hourTemp.textContent = "";
  grabDOM.hourPrecip.textContent = "";
  grabDOM.hourFeelsLike.textContent = "";
  grabDOM.hourHumidity.textContent = "";
  grabDOM.hourVisibility.textContent = "";
  grabDOM.hourWindSpeed.textContent = "";
  clearDOM(grabDOM.barGraph);
  clearDOM(grabDOM.tempGraph);
  clearDOM(grabDOM.hourUV);
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

function makeUVGraph(day, where) {
  for (let i = 6; i <= 18; i++) {
    addGraph(where, result.days[day].hours[i].uvindex, `${i}:00`);
  }
  for (let i = 6; i <= 18; i++) {
    addTime(where, i);
  }
}

function makeTempGraph(day) {
  let minTemp = 300;
  let temporaryTemp;
  let maxTemp = -274;
  for (let i = 0; i <= 23; i++) {
    temporaryTemp = result.days[day].hours[i].temp;
    if (minTemp > temporaryTemp) {
      minTemp = temporaryTemp;
    }
    if (maxTemp < temporaryTemp) {
      maxTemp = temporaryTemp;
    }
  }
  let diff = maxTemp - minTemp;
  for (let i = 0; i <= 23; i++) {
    addDotGraph(i, result.days[day].hours[i].temp, maxTemp, diff, day);
  }
  linkGraph(day);
  highlightSelected(document.querySelector(`#day${day}hour0`));
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

function addDotGraph(i, temp, max, diff, day) {
  const height = ((diff - (max - temp)) * 180) / diff + 25;
  const div = document.createElement("div");
  const dot = document.createElement("div");
  const spanTemp = document.createElement("span");
  spanTemp.textContent = temp;
  spanTemp.textContent += degrees;
  dot.style.height = `${height}px`;
  div.id = `day${day}hour${i}`;
  div.classList.add("time-graph");
  dot.classList.add("graph-points");
  grabDOM.tempGraph.appendChild(div);
  div.appendChild(spanTemp);
  div.appendChild(dot);
  addTime(div, i);
}

function linkGraph(day) {
  for (let i = 0; i <= 23; i++) {
    document
      .querySelector(`#day${day}hour${i}`)
      .addEventListener("click", () => {
        addToDOMHour(day, i);
        for (let j = 0; j <= 23; j++) {
          removeHighlight(document.querySelector(`#day${day}hour${j}`));
        }
        highlightSelected(document.querySelector(`#day${day}hour${i}`));
        changeIcon(result.days[day].hours[i].icon, grabDOM.hourIcon);
      });
  }
}

function highlightSelected(highlighted) {
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

function addCurrent() {
  addToDOMCurrent();
  addToDOMHour(1, 0);
  makeUVGraph(0, grabDOM.barGraph);
  changeIcon(result.currentConditions.icon, grabDOM.icon2);
 ;
}

async function search(searchTerm) {
  await find(searchTerm);
  console.log(result);
  addCurrent();
}

grabDOM.form.addEventListener("submit", (e) => {
  e.preventDefault();
  clear();
  search(grabDOM.searchBar.value);
});

grabDOM.tomorrow.addEventListener("click", () => {
  grabDOM.today.className = "";
  grabDOM.hourly.className = "";
  grabDOM.tomorrow.className = "highlighted";
  grabDOM.uvH2.textContent = "UV Tomorrow";
  hide(grabDOM.weatherInfoToday);
  show(grabDOM.weatherInfoHour);
  clear();
  if (result != null) {
    addToDOMHour(1, 0);
    changeIcon(result.days[1].hours[0].icon, grabDOM.hourIcon);
    makeTempGraph(1);
    makeUVGraph(1, grabDOM.hourUV);
  }
});

grabDOM.today.addEventListener("click", () => {
  grabDOM.tomorrow.className = "";
  grabDOM.hourly.className = "";
  grabDOM.today.className = "highlighted";
  hide(grabDOM.weatherInfoHour);
  show(grabDOM.weatherInfoToday);
  clear();
  makeUVGraph(0, grabDOM.barGraph);
});

grabDOM.hourly.addEventListener("click", () => {
  grabDOM.today.className = "";
  grabDOM.tomorrow.className = "";
  grabDOM.hourly.className = "highlighted";
  grabDOM.uvH2.textContent = "UV Today";
  hide(grabDOM.weatherInfoToday);
  show(grabDOM.weatherInfoHour);
  clear();
  if (result != null) {
    addToDOMHour(0, 0);
    changeIcon(result.days[0].hours[0].icon, grabDOM.hourIcon);
    makeTempGraph(0);
    makeUVGraph(0, grabDOM.hourUV);
  }
});

grabDOM.today.className = "highlighted";
