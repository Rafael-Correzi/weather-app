async function search(location, aggregateHours = 24) {
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
  const feelslike = weather.currentConditions.feelslike;
  const humidity = weather.currentConditions.humidity;
  const precipitation = weather.currentConditions.precip;
  const precipitationProb = weather.currentConditions.precipprob;
  const preciptype = weather.currentConditions.preciptype;
  const wind = weather.currentConditions.windspeed;
  const visibility = weather.currentConditions.visibility;
  const uv = weather.currentConditions.uvindex;
  const sunrise = weather.currentConditions.sunrise;
  const sunset = weather.currentConditions.sunset;
  return {
    place,
    description,
    current,
    temp,
    feelslike,
    humidity,
    precipitation,
    precipitationProb,
    preciptype,
    wind,
    visibility,
    uv,
    sunrise,
    sunset,
  };
}

(async function place() {
  const json = await search("Springfield");
  console.log(json.place);
})();

(async function description() {
  const json = await search("Springfield");
  console.log(json.description);
})();

(async function currentConditions() {
  const json = await search("Springfield");
  console.log(json.current);
})();

(async function place() {
  const json = await search("Springfield");
  console.log(json.place);
})();
