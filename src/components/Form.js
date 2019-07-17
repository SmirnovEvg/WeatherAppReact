import React from 'react';

const Form = ({ getWeatherByCity, getWeatherByLocation, checked, handleOptionChange }) => {
    return (
        <div className="search-block">
            <form>
                <div>
                    <div className="inputGroup">
                        <input type="radio"
                            id="open-weather-api"
                            name="api"
                            value="openWeatherMap"
                            checked={checked === 'openWeatherMap'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="open-weather-api">OpenWeatherMap</label>
                    </div>
                    <div className="inputGroup">
                        <input type="radio"
                            id="weather-bit-api"
                            name="api"
                            value="weatherBit"
                            checked={checked === 'weatherBit'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="weather-bit-api">WeatherBit</label>
                    </div>
                </div>
                <div className="location-block">
                    <div className="location-input">
                        <input type="text" id="city" placeholder="Search" />
                        <button onClick={getWeatherByCity}><img src="images/icons8-search-50.png" alt="Search" /></button>
                    </div>
                    <button className="location-button" onClick={getWeatherByLocation}><img src="images/icons8-region-50.png" alt="Geo" /></button>
                </div>
            </form>
        </div>
    )
}

export default Form;