import React from 'react';

import './App.css';
import './styles/index.sass';
import './styles/media-quaries.sass';

import Form from './components/Form.js';
import Info from './components/Info.js';

class App extends React.Component {

  state = {
    name: undefined,
    icon: undefined,
    description: undefined,
    temp: undefined,
    wind_speed: undefined,
    error: undefined,
    checked: 'first'
  }

  gettingWeatherByLocation = async (e) => {
    const openWeatherKey = process.env.REACT_APP_API_OPEN_WEATHER_MAP_API_KEY;
    const weatherBitKey = process.env.REACT_APP_API_WEAHTER_BIT_API_KEY;
    e.preventDefault();
    const getPosition = function (options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }

    try {
      const position = await getPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      if (document.getElementById('first_api').checked) {
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=metric`);
        const data = await api_url.json();

        this.setState({
          name: data.name,
          icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          description: data.weather[0].description,
          temp: Math.round(data.main.temp),
          wind_speed: Math.round(data.wind.speed),
          error: undefined,
          checked: 'first'
        })
      } else if (document.getElementById('second_api').checked) {
        const api_url = await fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=${weatherBitKey}`);
        const data = await api_url.json();

        this.setState({
          name: data.data[0].city_name,
          icon: `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`,
          description: data.data[0].weather.description,
          temp: Math.round(data.data[0].temp),
          wind_speed: Math.round(data.data[0].wind_spd),
          error: undefined,
          checked: 'second'
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
        checked: 'first'
      })
    }
  }


  gettingWeatherByCityName = async (e) => {
    e.preventDefault();

    const openWeatherKey = process.env.REACT_APP_API_OPEN_WEATHER_MAP_API_KEY;
    const weatherBitKey = process.env.REACT_APP_API_WEAHTER_BIT_API_KEY;
    const city = document.getElementById('city').value;
    
    if (document.getElementById('first_api').checked) {
      if (city) {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherKey}&units=metric`).then(response => {
          if (response.status === 500 || response.status === 204) {
            this.setState({ error: 'ERROR' });
            return;
          }
          response.json().then(data => {
            if (data.cod === "404") {
              this.setState({ error: data.message.toUpperCase() });
              return;
            }

            this.setState({
              name: data.name,
              icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
              description: data.weather[0].description,
              temp: Math.round(data.main.temp),
              wind_speed: Math.round(data.wind.speed),
              error: undefined,
              checked: 'first'
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
          checked: 'first'
        })
      }
    } else if (document.getElementById('second_api').checked) {
      if (city) {
        await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${weatherBitKey}`).then(response => {
          if (response.status === 500 || response.status === 204) {
            this.setState({ error: 'ERROR' });
            return;
          }

          response.json().then(weatherData => {
            if (weatherData.cod === "404") {
              this.setState({ error: weatherData.message.toUpperCase() });
              return;
            }
            this.setState({
              name: weatherData.data[0].city_name,
              icon: `https://www.weatherbit.io/static/img/icons/${weatherData.data[0].weather.icon}.png`,
              description: weatherData.data[0].weather.description,
              temp: Math.round(weatherData.data[0].temp),
              wind_speed: Math.round(weatherData.data[0].wind_spd),
              error: undefined,
              checked: 'second'
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
          checked: 'second'
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