import React from 'react';

const Form = ({ getWeatherByCity, getWeatherByLocation, checked, handleOptionChange }) => {
    return (
        <div className="search-block">
            <form>
                <div>
                    <div className="inputGroup">
                        <input type="radio"
                            id="first_api"
                            name="api"
                            value="first"
                            checked={checked === 'first'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="first_api">OpenWeatherMap</label>
                    </div>
                    <div className="inputGroup">
                        <input type="radio"
                            id="second_api"
                            name="api"
                            value="second"
                            checked={checked === 'second'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="second_api">WeatherBit</label>
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