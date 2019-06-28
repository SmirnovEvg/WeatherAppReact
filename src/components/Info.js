import React from 'react';

export default class Info extends React.Component{
    render(){
        return(
            <div>
                {this.props.name && 
                <div>
                    <p>{this.props.name}</p>
                    <p>{this.props.temp}</p>
                </div>
                }
                <p>{this.props.error}</p>
            </div>
        )
    }
}