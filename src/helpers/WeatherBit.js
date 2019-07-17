export const getWeatherBitForecastByLocation = async (lat, lon, apiKey) => {
    return await fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=${apiKey}`);
}

export const getWeatherBitForecastByCityname = async (cityName, apiKey) => {
    return await fetch(`https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${apiKey}`);
}