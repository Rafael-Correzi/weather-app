const weatherInfoToday = document.querySelector(".weather-info");
const weatherInfoHour = document.querySelector(".weather-info-hour");
const form = document.querySelector("#search");
const searchBar = document.querySelector("#search-bar");
const searchButton = document.querySelector("#search-button");
const today = document.querySelector("#today");
const tomorrow = document.querySelector("#tomorrow");
const hourly = document.querySelector("#hourly");
const daily = document.querySelector("#daily");
const city = document.querySelector("#city");
const dateTime = document.querySelector("#date-time");
const icon = document.querySelector("#weather-icon");
const temp = document.querySelector("#temp");
const icon2 = document.querySelector("#weather-icon2");
const precipitation = document.querySelector("#precipitation");
const prob = document.querySelector("#precipitation-prob");
const uv = document.querySelector("#uv");
const uvNext1 = document.querySelector("#uv-next1");
const uvNext2 = document.querySelector("#uv-next2");
const seeAllUV = document.querySelector("#see-all-uv");
const feelsLike = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const visibility = document.querySelector("#visibility");
const windspeed = document.querySelector("#wind-speed");
const windDirection = document.querySelector("#wind-direction");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const barGraph = document.querySelector(".bar-graph");
const tempGraph = document.querySelector(".temp-graph");

const divTemp = document.querySelector(".temp-hour");
const hourIcon = document.querySelector("#icon-hour");
const hourTemp = document.querySelector("#temp-hour");
const hourPrecip = document.querySelector("#precip-hour");
const hourFeelsLike = document.querySelector("#feels-like-hour");
const hourHumidity = document.querySelector("#humidity-hour");
const hourVisibility = document.querySelector("#visibility-hour");
const hourWindSpeed = document.querySelector("#wind-speed-hour");
const hourWindDirection = document.querySelector("#wind-direction-hour");
const hourUV = document.querySelector("#uv-hour-graph");
const uvH2 = document.querySelector("#uv-h2");
const daySunrise = document.querySelector("#sunrise-day");
const daySunset = document.querySelector("#sunset-day");

const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");

export {
  weatherInfoToday,
  weatherInfoHour,
  form,
  searchBar,
  searchButton,
  today,
  tomorrow,
  hourly,
  daily,
  city,
  dateTime,
  icon,
  temp,
  icon2,
  precipitation,
  prob,
  uv,
  uvNext1,
  uvNext2,
  seeAllUV,
  feelsLike,
  humidity,
  visibility,
  windspeed,
  windDirection,
  sunrise,
  sunset,
  barGraph,
  tempGraph,
  hourIcon,
  hourTemp,
  hourPrecip,
  hourFeelsLike,
  hourHumidity,
  hourVisibility,
  hourWindSpeed,
  hourWindDirection,
  hourUV,
  daySunrise,
  daySunset,
  uvH2,
  arrowLeft,
  arrowRight,
  divTemp,
};
