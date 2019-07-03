import React from 'react';

import './App.css';
import './styles/index.sass';
import './styles/media-quaries.sass';
import Form from './components/Form.js';
import Info from './components/Info.js';

const API = "fb314c402f60329418f241aa69597e77";
const API_SECOND = "ca805b796b10412f9cfc86448d61c2a5";

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
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`);
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
        const api_url = await fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=${API_SECOND}`);
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
    const city = document.getElementById('city').value;
    if (document.getElementById('first_api').checked) {
      if (city) {
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`);
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
        const api_url = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_SECOND}`);
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
    return (
      <div className="main-block">
        <Info
          name={this.state.name}
          icon={this.state.icon}
          description={this.state.description}
          temp={this.state.temp}
          wind_speed={this.state.wind_speed}
          error={this.state.error}
        />
        <Form
          getWeatherByLocation={this.gettingWeatherByLocation}
          getWeatherByCity={this.gettingWeatherByCityName}
          checked={this.state.checked}
          handleOptionChange={this.handleOptionChange}
        />
      </div>
    );
  }
}

export default App;