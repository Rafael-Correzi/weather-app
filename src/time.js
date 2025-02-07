import { weatherInfoToday, weatherInfoTomorrow, tomorrow, today } from "./domElements";
import { hide, show } from "./clearDOM";

tomorrow.addEventListener("click", () => {
  hide(weatherInfoToday);
  show(weatherInfoTomorrow);
});

today.addEventListener("click", () => {
  hide(weatherInfoTomorrow);
  show(weatherInfoToday);
})