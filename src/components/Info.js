import React from 'react';

const Info = (props) => {
    return (
        <div>
            {props.name &&
                <div>
                    <p>{props.name}</p>
                    <p>{props.temp}</p>
                    <p>{props.temp_min}</p>
                    <p>{props.temp_max}</p>
                    <p>{props.wind_speed}</p>
                </div>
            }
            <p>{props.error}</p>
        </div>
    )
}

export default Info;