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

const DEGREE = "°";
let degreeType = "°C";
let time = "us";
let speed = " KM/H";
let distance = " Kilometers";
let dateSpec = "mdy";

let result = null;
let newSearch = false;

async function find(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=TNU9NFWTT382WGD6LTP525A76&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  );
  result = await response.json();
}

async function search(searchTerm) {
  await find(searchTerm);
  console.log(result);
  addCurrent();
  displayCurrent();
  newSearch = true;
}

function addToDOMCurrent() {
  grabDOM.city.textContent = result.resolvedAddress;

  grabDOM.temp.textContent = result.currentConditions.temp;
  grabDOM.temp.textContent += degreeType;
  grabDOM.precipitation.textContent = result.currentConditions.precip
    ? result.currentConditions.precip
    : "0";
  grabDOM.uv.textContent = result.currentConditions.uv;
  grabDOM.feelsLike.textContent = result.currentConditions.feelslike;
  grabDOM.feelsLike.textContent += degreeType;
  grabDOM.humidity.textContent = result.currentConditions.humidity;
  grabDOM.visibility.textContent = result.currentConditions.visibility;
  grabDOM.visibility.textContent += distance;
  grabDOM.windspeed.textContent = result.currentConditions.windspeed;
  grabDOM.windspeed.textContent += speed;
  grabDOM.windDirection.textContent = result.currentConditions.winddir + DEGREE;
  grabDOM.sunrise.textContent = addHour(result.currentConditions.sunrise);
  grabDOM.sunset.textContent = addHour(result.currentConditions.sunset);
}

function addToDOMHour(when, i) {
  grabDOM.hourTemp.textContent = result.days[when].hours[i].temp;
  grabDOM.hourTemp.textContent += degreeType;
  grabDOM.hourPrecip.textContent = result.days[when].hours[i].precip;
  grabDOM.hourFeelsLike.textContent = result.days[when].hours[i].feelslike;
  grabDOM.hourFeelsLike.textContent += degreeType;
  grabDOM.hourHumidity.textContent = result.days[when].hours[i].humidity;
  grabDOM.hourVisibility.textContent = result.days[when].hours[i].visibility;
  grabDOM.hourVisibility.textContent += distance;
  grabDOM.hourWindSpeed.textContent = result.days[when].hours[i].windspeed;
  grabDOM.hourWindSpeed.textContent += speed;
  grabDOM.hourWindDirection.textContent =
    result.days[when].hours[i].winddir + DEGREE;
  grabDOM.daySunrise.textContent = addHour(result.days[when].sunrise);
  grabDOM.daySunset.textContent = addHour(result.days[when].sunset);
}

function clear() {
  grabDOM.hourTemp.textContent = "";
  grabDOM.hourPrecip.textContent = "";
  grabDOM.hourFeelsLike.textContent = "";
  grabDOM.hourHumidity.textContent = "";
  grabDOM.hourVisibility.textContent = "";
  grabDOM.hourWindSpeed.textContent = "";
  grabDOM.hourWindDirection.textContent = "";
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
  bar.classList.add("bar");
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
  const height = ((diff - (max - temp)) * 150) / diff + 25;
  const div = document.createElement("div");
  const dot = document.createElement("div");
  const spanTemp = document.createElement("span");
  spanTemp.textContent = temp;
  spanTemp.textContent += degreeType;
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
}

function highlightSection(shown) {
  grabDOM.today.className = "";
  grabDOM.hourly.className = "";
  grabDOM.daily.className = "";
  grabDOM.tomorrow.className = "";
  shown.className = "highlighted";
}

function displayCurrent() {
  highlightSection(grabDOM.today);
  hide(grabDOM.weatherInfoHour);
  show(grabDOM.weatherInfoToday);
  grabDOM.arrowLeft.classList.add("hide");
  grabDOM.arrowRight.classList.add("hide");
  clear();
  if (result != null) {
    grabDOM.dateTime.textContent =
      "Last updated: " + addHour(result.currentConditions.datetime);
    makeUVGraph(0, grabDOM.barGraph);
  }
}

function displayHourly() {
  highlightSection(grabDOM.hourly);
  hide(grabDOM.weatherInfoToday);
  show(grabDOM.weatherInfoHour);
  grabDOM.arrowLeft.classList.add("hide");
  grabDOM.arrowRight.classList.add("hide");
  clear();
  if (result != null) {
    addDate(0);
    addToDOMHour(0, 0);
    changeIcon(result.days[0].hours[0].icon, grabDOM.hourIcon);
    makeTempGraph(0);
    makeUVGraph(0, grabDOM.hourUV);
  }
}

function displayTomorrow() {
  highlightSection(grabDOM.tomorrow);
  grabDOM.uvH2.textContent = "UV Tomorrow";
  hide(grabDOM.weatherInfoToday);
  show(grabDOM.weatherInfoHour);
  clear();
  grabDOM.arrowLeft.classList.add("hide");
  grabDOM.arrowRight.classList.add("hide");
  if (result != null) {
    addDate(1);
    addToDOMHour(1, 0);
    changeIcon(result.days[1].hours[0].icon, grabDOM.hourIcon);
    makeTempGraph(1);
    makeUVGraph(1, grabDOM.hourUV);
  }
}

function displayDaily() {
  highlightSection(grabDOM.daily);
  hide(grabDOM.weatherInfoToday);
  show(grabDOM.weatherInfoHour);
  clear();
  grabDOM.arrowLeft.classList.remove("hide");
  grabDOM.arrowRight.classList.remove("hide");
  if (result != null) {
    if (!newSearch) {
      day.changeDay();
    } else {
      addDate(1);
      addToDOMHour(1, 0);
      changeIcon(result.days[1].hours[0].icon, grabDOM.hourIcon);
      makeTempGraph(1);
      makeUVGraph(1, grabDOM.hourUV);
    }
  }
}

function addDate(when) {
  let date = result.days[when].datetime.split("-");
  let day = date[2];
  let month = date[1];
  let year = date[0];
  if (dateSpec === "mdy") {
    let displayedDate = `${month}/${day}/${year}`;
    grabDOM.dateTime.textContent = displayedDate;
    grabDOM.uvH2.textContent = `UV ${displayedDate}`;
  }
  if (dateSpec === "dmy") {
    let displayedDate = `${day}/${month}/${year}`;
    grabDOM.dateTime.textContent = displayedDate;
    grabDOM.uvH2.textContent = `UV ${displayedDate}`;
  }
  if (dateSpec === "ymd") {
    let displayedDate = `${year}/${month}/${day}`;
    grabDOM.dateTime.textContent = displayedDate;
    grabDOM.uvH2.textContent = `UV ${displayedDate}`;
  }
}

function addHour(input) {
  if (time === "us") {
    let dateTime = input.split(":");
    let hour = +dateTime[0];
    let minutes = dateTime[1];
    let seconds = dateTime[2];
    let us = usTime(hour).split(" ");
    return `${us[0]}:${minutes}:${seconds} ${us[1]}`;
  } else {
    return result.currentConditions.datetime;
  }
}

const day = (function (currentDay = 1) {
  function previousDay() {
    if (currentDay <= 14 && currentDay > 0) {
      currentDay--;
      changeDay();
    }
  }

  function nextDay() {
    if (currentDay < 14 && currentDay >= 0) {
      currentDay++;
      changeDay();
    }
  }

  function changeDay() {
    grabDOM.divTemp.scrollTo(0, 0);
    clear();
    addToDOMHour(currentDay, 0);
    changeIcon(result.days[currentDay].hours[0].icon, grabDOM.hourIcon);
    makeTempGraph(currentDay);
    makeUVGraph(currentDay, grabDOM.hourUV);
    addDate(currentDay);
  }

  return { previousDay, nextDay, changeDay };
})();

grabDOM.form.addEventListener("submit", (e) => {
  e.preventDefault();
  clear();
  search(grabDOM.searchBar.value);
});

grabDOM.tomorrow.addEventListener("click", () => {
  displayTomorrow();
});

grabDOM.today.addEventListener("click", () => {
  displayCurrent();
});

grabDOM.hourly.addEventListener("click", () => {
  displayHourly();
});

grabDOM.daily.addEventListener("click", () => {
  displayDaily();
  newSearch = false;
});

grabDOM.arrowLeft.addEventListener("click", () => {
  day.previousDay();
});

grabDOM.arrowRight.addEventListener("click", () => {
  day.nextDay();
});

grabDOM.today.className = "highlighted";

search("São Paulo");
