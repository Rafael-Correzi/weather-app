import { weatherInfoToday, weatherInfoTomorrow, tomorrow } from "./domElements";
import { clearDOM } from "./clearDOM";

tomorrow.addEventListener("click", () => {
  weatherInfoTomorrow.classList.add = "hide";
  weatherInfoTomorrow.className = "show";
});
