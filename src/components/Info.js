import React from 'react';
import { useCookies } from 'react-cookie';

const Info = ({name, icon, temp, description, wind_speed, error}) => {
    const [cookies, setCookie] = useCookies(['name','description']);
    if(name){
        let date = new Date();
        date.setDate(date.getMinutes() + 5);
        setCookie('name', name, { path: '/', maxAge: 60,  expires: date });
        setCookie('icon', icon, { path: '/', maxAge: 60,  expires: date });
        setCookie('temp', temp, { path: '/', maxAge: 60,  expires: date });
        setCookie('description', description, { path: '/', maxAge: 60,  expires: date });
        setCookie('wind_speed', wind_speed, { path: '/', maxAge: 60,  expires: date });
    }else{
        name = cookies.name;
        icon = cookies.icon;
        temp = cookies.temp;
        description = cookies.description;
        wind_speed = cookies.wind_speed;
    }    

    return (
        <div>
            {name &&
                <div>
                    <p>{name}</p>
                    <img src={icon} alt="Icon"/>
                    <p>{description}</p>
                    <p>{temp}</p>
                    <p>{wind_speed}</p>
                </div>
            }
            <p>{error}</p>
        </div>
    )
}

export default Info;