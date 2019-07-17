import React from 'react';

import './App.css';
import './styles/index.sass';
import './styles/media-quaries.sass';

import Form from './components/Form.js';
import Info from './components/Info.js';

import { getOpenWeatherMapForecastByLocation } from "./helpers/OpenWeatherMap"
import { getOpenWeatherMapForecastByCityname } from "./helpers/OpenWeatherMap"
import { getWeatherBitForecastByLocation } from "./helpers/WeatherBit"
import { getWeatherBitForecastByCityname } from "./helpers/WeatherBit"

class App extends React.Component {

  state = {
    name: undefined,
    icon: undefined,
    description: undefined,
    temp: undefined,
    wind_speed: undefined,
    error: undefined,
    checked: 'openWeatherMap'
  }

  gettingWeatherByLocation = async (e) => {
    e.preventDefault();

    const openWeatherMapApiKey = process.env.REACT_APP_API_OPEN_WEATHER_MAP_API_KEY;
    const weatherBitApiKey = process.env.REACT_APP_API_WEAHTER_BIT_API_KEY;

    const getPosition = function (options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }

    try {
      const position = await getPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      if (document.getElementById('open-weather-api').checked) {
        const apiRequest = await getOpenWeatherMapForecastByLocation(lat, lon, openWeatherMapApiKey);
        const apiOptions = await apiRequest.json();

        this.setState({
          name: apiOptions.name,
          icon: `http://openweathermap.org/img/w/${apiOptions.weather[0].icon}.png`,
          description: apiOptions.weather[0].description,
          temp: Math.round(apiOptions.main.temp),
          wind_speed: Math.round(apiOptions.wind.speed),
          error: undefined,
          checked: 'openWeatherMap'
        })
      } else if (document.getElementById('weather-bit-api').checked) {
        const apiRequest = await getWeatherBitForecastByLocation(lat, lon, weatherBitApiKey);
        const apiOptions = await apiRequest.json();

        this.setState({
          name: apiOptions.data[0].city_name,
          icon: `https://www.weatherbit.io/static/img/icons/${apiOptions.data[0].weather.icon}.png`,
          description: apiOptions.data[0].weather.description,
          temp: Math.round(apiOptions.data[0].temp),
          wind_speed: Math.round(apiOptions.data[0].wind_spd),
          error: undefined,
          checked: 'weatherBit'
        })
      }
    }
    catch (err) {
      this.setState({
        name: undefined,
        icon: undefined,
        description: undefined,
        temp: undefined,
        wind_speed: undefined,
        error: "Failed to get location",
        checked: 'openWeatherMap'
      })
    }
  }


  gettingWeatherByCityName = async (e) => {
    e.preventDefault();

    const openWeatherMapApiKey = process.env.REACT_APP_API_OPEN_WEATHER_MAP_API_KEY;
    const weatherBitApiKey = process.env.REACT_APP_API_WEAHTER_BIT_API_KEY;
    const city = document.getElementById('city').value;

    if (document.getElementById('open-weather-api').checked) {
      if (city) {
        await getOpenWeatherMapForecastByCityname(city, openWeatherMapApiKey).then(response => {
          if (response.status === 500 || response.status === 204) {
            this.setState({ error: 'ERROR' });
            return;
          }
          response.json().then(apiOptions => {
            if (apiOptions.cod === "404") {
              this.setState({ error: apiOptions.message.toUpperCase() });
              return;
            }

            this.setState({
              name: apiOptions.name,
              icon: `http://openweathermap.org/img/w/${apiOptions.weather[0].icon}.png`,
              description: apiOptions.weather[0].description,
              temp: Math.round(apiOptions.main.temp),
              wind_speed: Math.round(apiOptions.wind.speed),
              error: undefined,
              checked: 'openWeatherMap'
            })
          })
        });

      } else {
        this.setState({
          name: undefined,
          icon: undefined,
          description: undefined,
          temp: undefined,
          wind_speed: undefined,
          error: "Enter city",
          checked: 'openWeatherMap'
        })
      }
    } else if (document.getElementById('weather-bit-api').checked) {
      if (city) {
        await getWeatherBitForecastByCityname(city, weatherBitApiKey).then(response => {
          if (response.status === 500 || response.status === 204) {
            this.setState({ error: 'ERROR' });
            return;
          }

          response.json().then(apiOptions => {
            if (apiOptions.cod === "404") {
              this.setState({ error: apiOptions.message.toUpperCase() });
              return;
            }
            this.setState({
              name: apiOptions.data[0].city_name,
              icon: `https://www.weatherbit.io/static/img/icons/${apiOptions.data[0].weather.icon}.png`,
              description: apiOptions.data[0].weather.description,
              temp: Math.round(apiOptions.data[0].temp),
              wind_speed: Math.round(apiOptions.data[0].wind_spd),
              error: undefined,
              checked: 'weatherBit'
            });
          })
        });

      } else {
        this.setState({
          name: undefined,
          icon: undefined,
          description: undefined,
          temp: undefined,
          wind_speed: undefined,
          error: "Enter city",
          checked: 'weatherBit'
        })
      }
    }
  }

  handleOptionChange = (e) => {
    this.setState({
      checked: e.target.value
    })
  }

  render() {
    const { name, icon, description, temp, wind_speed, error, checked } = this.state;
    return (
      <div className="main-block">
        <Info
          name={name}
          icon={icon}
          description={description}
          temp={temp}
          wind_speed={wind_speed}
          error={error}
        />
        <Form
          getWeatherByLocation={this.gettingWeatherByLocation}
          getWeatherByCity={this.gettingWeatherByCityName}
          checked={checked}
          handleOptionChange={this.handleOptionChange}
        />
      </div>
    );
  }
}

export default App;