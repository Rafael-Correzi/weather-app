import { weatherInfoToday, weatherInfoTomorrow, tomorrow, today } from "./domElements";
import { hide, show } from "./clearDOM";

tomorrow.addEventListener("click", () => {
  today.className = "";
  tomorrow.className = "highlighted";
  hide(weatherInfoToday);
  show(weatherInfoTomorrow);
});

today.addEventListener("click", () => {
  tomorrow.className = "";
  today.className = "highlighted";
  hide(weatherInfoTomorrow);
  show(weatherInfoToday);
});
