async function search(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=TNU9NFWTT382WGD6LTP525A76&contentType=json`,
    {
      method: "GET",
      headers: {},
    },
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

(async function today() {
  const json = await search("São Paulo");
  console.log(json.today);
})();
