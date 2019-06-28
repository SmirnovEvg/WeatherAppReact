import React from 'react';

const Form = (props) => {
    return (
        <form>
            <input type="text" id="city" />
            <button onClick={props.getWeatherByCity}>Enter</button>
            <button onClick={props.getWeatherByLocation}>ByLocation</button>
        </form>
    )
}

export default Form;