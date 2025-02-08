import { weatherInfoToday, weatherInfoHour, tomorrow, today, hourly, tmrTemp } from "./domElements";
import { hide, show, clearDOM } from "./clearDOM";

tomorrow.addEventListener("click", () => {
  today.className = "";
  hourly.className = "";
  tomorrow.className = "highlighted";
  hide(weatherInfoToday);
  show(weatherInfoHour);
});

today.addEventListener("click", () => {
  tomorrow.className = "";
  hourly.className = "";
  today.className = "highlighted";
  hide(weatherInfoHour);
  show(weatherInfoToday);
});

hourly.addEventListener("click", () => {
  today.className = "";
  tomorrow.className = "";
  hourly.className = "highlighted";
  hide(weatherInfoToday);
});