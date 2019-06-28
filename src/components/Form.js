import React from 'react';

const Form = ({getWeatherByCity, getWeatherByLocation}) => {
    return (
        <form>
            <input type="radio" id="first_api" name="api"/>
            <input type="radio" id="second_api" name="api"/>
            <input type="text" id="city" />
            <button onClick={getWeatherByCity}>Enter</button>
            <button onClick={getWeatherByLocation}>ByLocation</button>
        </form>
    )
}

export default Form;