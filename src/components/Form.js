import React from 'react';

export default class Form extends React.Component {
    render(){
        return(
            <form>
                <input type="text" id="city" />
                <button onClick = {this.props.getWeatherByCity}>Enter</button>
                <button onClick = {this.props.getWeatherByLocation}>ByLocation</button>
            </form>
        )
    }
}