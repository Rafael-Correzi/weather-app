import { weatherInfoToday, weatherInfoTomorrow, tomorrow } from "./domElements";
import { clearDOM } from "./clearDOM";

tomorrow.addEventListener("click", () => {
  weatherInfoTomorrow.className = "hide";
  weatherInfoTomorrow.className = "show";
});
