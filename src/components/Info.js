import React from 'react';

const Info = ({name, icon, temp, description, wind_speed, error}) => {
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