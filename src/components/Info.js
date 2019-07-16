import React from 'react';

function compareTime(burnTime, nowTime) {
    const compare = nowTime - burnTime;
    return compare <= 7200000
}

const Info = ({ name, icon, temp, description, wind_speed, error }) => {

    if (!localStorage.getItem("options")) {
        localStorage.setItem("options", JSON.stringify({ value: undefined, timestamp: undefined }));
    }

    if (name) {
        const weather = {
            name: name,
            icon: icon,
            temp: temp,
            description: description,
            wind_speed: wind_speed,
            timestamp: new Date().getTime()
        }
        localStorage.setItem("options", JSON.stringify(weather));
    } else if (error) {
        const weather = {
            name: undefined,
            icon: undefined,
            temp: undefined,
            description: undefined,
            wind_speed: undefined,
            timestamp: undefined
        }
        localStorage.setItem("options", JSON.stringify(weather));
    } else {
        const weather = JSON.parse(localStorage.getItem("options")),
            dateString = weather.timestamp,
            now = new Date().getTime().toString();
        if (weather) {
            if (!compareTime(dateString, now)) {
                const weather = {
                    name: undefined,
                    icon: undefined,
                    temp: undefined,
                    description: undefined,
                    wind_speed: undefined,
                    timestamp: undefined
                }
                localStorage.setItem("options", JSON.stringify(weather));
            }
            name = weather.name;
            icon = weather.icon;
            temp = weather.temp;
            description = weather.description;
            wind_speed = weather.wind_speed;
        }
    }

    let result;
    if (error) {
        result = <div className="error-block">
            <img src="images/icons8-error-cloud-filled-100.png" alt="" />
            <p>{error}</p>
        </div>
    }
    else if (name) {
        result = <div className="info-block">
            <p>{name}</p>
            <div className="info-second">
                <p>{temp}º</p>
            </div>
            <div className="info-first">
                <img src={icon} alt="Icon" />
                <p>{description}</p>
            </div>
        </div>
    }
    else {
        result = <div className="welcome-block">
            <p>Welcome <br /> to <br /> Weather App</p>
            <img src="images/icons8-stormy-weather-48.png" alt="Icon" />
        </div>
    }

    return (
        <div className="info">
            {result}
        </div>
    )
}

export default Info;