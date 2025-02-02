import * as grabDOM from "./domElements.js";

async function search(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=TNU9NFWTT382WGD6LTP525A76&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  );
  const weather = await response.json();
  const place = weather.resolvedAddress;
  const description = weather.description;
  const current = weather.currentConditions.conditions;
  const temp = weather.currentConditions.temp;
  const feelsLike = weather.currentConditions.feelslike;
  const humidity = weather.currentConditions.humidity;
  const precipitation = weather.currentConditions.precip;
  const precipitationProb = weather.currentConditions.precipprob;
  const precipType = weather.currentConditions.preciptype;
  const wind = weather.currentConditions.windspeed;
  const visibility = weather.currentConditions.visibility;
  const uv = weather.currentConditions.uvindex;
  const sunrise = weather.currentConditions.sunrise;
  const sunset = weather.currentConditions.sunset;
  const today = {
    place,
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
  };
  return {
    weather,
    today,
  };
}

(async function saoPaulo() {
  const json = await search("São Paulo");
  console.log(json.today);
  addToDOM(
    json.today.temp,
    json.today.precipitation,
    json.today.precipitationProb,
    json.today.uv,
    json.today.feelsLike,
    json.today.humidity,
    json.today.visibility,
    json.today.wind,
    json.today.sunrise,
    json.today.sunset,
  );
})();

function addToDOM(
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
  sunsetPassed,
) {
  grabDOM.temp.textContent += tempPassed;
  grabDOM.precipitation.textContent += precipitationPassed;
  grabDOM.prob.textContent += probPassed;
  grabDOM.uv.textContent += uvPassed;
  //grabDOM.uvNext1.textContent += uvNext1Passed;
  //grabDOM.uvNext2.textContent += uvNext2Passed;
  //grabDOM.seeAllUV.textContent += seeAllUVPassed;
  grabDOM.feelsLike.textContent += feelsLikePassed;
  grabDOM.humidity.textContent += humidityPassed;
  grabDOM.visibility.textContent += visibilityPassed;
  grabDOM.windspeed.textContent += windspeedPassed;
  grabDOM.sunrise.textContent += sunrisePassed;
  grabDOM.sunset.textContent += sunsetPassed;
}
