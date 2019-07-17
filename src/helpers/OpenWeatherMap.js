export const getOpenWeatherMapForecastByLocation = async (lat, lon, apiKey) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
}

export const getOpenWeatherMapForecastByCityname = async (cityName, apiKey) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
}