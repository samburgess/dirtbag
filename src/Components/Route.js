import React from 'react';
export default class Route extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <div className="App">
                <h2>{this.props.name}</h2>
                <div>Route type: {this.props.type} , Grade: {this.props.grade}, Stars: {this.props.stars}</div>
            </div>
    );}
}