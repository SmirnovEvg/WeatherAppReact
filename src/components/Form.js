import React from 'react';

const Form = ({ getWeatherByCity, getWeatherByLocation }) => {
    return (
        <div className="search-block">
            <form>
                <div>
                    <div>
                        <label>OpenWatherMap</label>
                        <input type="radio" id="first_api" name="api" />
                    </div>
                    <div>
                        <label>WatherBit</label>
                        <input type="radio" id="second_api" name="api" />
                    </div>
                </div>
                <div className="location-block">
                    <div className="location-input">
                        <input type="text" id="city" />
                        <button onClick={getWeatherByCity}><img src="images/icons8-search-50.png" alt="Search" /></button>
                    </div>
                    <button className="location-button" onClick={getWeatherByLocation}><img src="images/icons8-region-50.png" alt="Geo" /></button>
                </div>
            </form>
        </div>
    )
}

export default Form;