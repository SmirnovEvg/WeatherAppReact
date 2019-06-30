import React from 'react';
import { useCookies } from 'react-cookie';

const Info = ({ name, icon, temp, description, wind_speed, error }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['name', 'description']);
    if (name) {
        const date = new Date(new Date().getTime() + 7200 * 1000);
        setCookie('name', name, { path: '/', expires: date });
        setCookie('icon', icon, { path: '/', expires: date });
        setCookie('temp', temp, { path: '/', expires: date });
        setCookie('description', description, { path: '/', expires: date });
        setCookie('wind_speed', wind_speed, { path: '/', expires: date });
    } else if (error) {
        name = undefined;
        icon = undefined;
        temp = undefined;
        description = undefined;
        wind_speed = undefined;
        removeCookie('name');
        removeCookie('icon');
        removeCookie('temp');
        removeCookie('description');
        removeCookie('wind_speed');
    } else {
        name = cookies.name;
        icon = cookies.icon;
        temp = cookies.temp;
        description = cookies.description;
        wind_speed = cookies.wind_speed;
    }

    return (
        <div className="info">
            {name &&
                <div className="info-block">
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
            <p>{error}</p>
        </div>
    )
}

export default Info;