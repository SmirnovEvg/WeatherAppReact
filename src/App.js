import React from 'react';
import './App.css';
import Form from './components/Form.js';
import Info from './components/Info.js';

const API = "fb314c402f60329418f241aa69597e77";

class App extends React.Component {

  state = {
    name: undefined,
    temp: undefined,
    temp_min: undefined,
    temp_max: undefined,
    wind_speed: undefined,
    error: undefined
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
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`);
      const data = await api_url.json();

      this.setState({
        name: data.name,
        temp: Math.round(data.main.temp),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        wind_speed: data.wind.speed,
        error: undefined
      })
    }
    catch (err) {
      console.error(err.message);
    }
  }


  gettingWeatherByCityName = async (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value;
    if (city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`);
      const data = await api_url.json();

      this.setState({
        name: data.name,
        temp: Math.round(data.main.temp),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        wind_speed: data.wind.speed,
        error: undefined
      })
    } else {
      this.setState({
        name: undefined,
        temp: undefined,
        temp_min: undefined,
        temp_max: undefined,
        wind_speed: undefined,
        error: "Введите город"
      })
    }
  }

  render() {
    return (
      <div>
        <Form
          getWeatherByLocation={this.gettingWeatherByLocation}
          getWeatherByCity={this.gettingWeatherByCityName}
        />
        <Info
          name={this.state.name}
          temp={this.state.temp}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          wind_speed={this.state.wind_speed}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
