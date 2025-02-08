import { weatherInfoToday, weatherInfoTomorrow, tomorrow, today, hourly } from "./domElements";
import { hide, show, clear } from "./clearDOM";

tomorrow.addEventListener("click", () => {
  today.className = "";
  hourly.className = "";
  tomorrow.className = "highlighted";
  hide(weatherInfoToday);
  show(weatherInfoTomorrow);
});

today.addEventListener("click", () => {
  tomorrow.className = "";
  hourly.className = "";
  today.className = "highlighted";
  hide(weatherInfoTomorrow);
  show(weatherInfoToday);
});

hourly.addEventListener("click", () => {
  today.className = "";
  tomorrow.className = "";
  hourly.className = "highlighted";
  hide(weatherInfoToday);
  hide(weatherInfoTomorrow);
})