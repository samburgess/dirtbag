import React from 'react';
export default class Area extends React.Component{

    //takes list of Routes 'routes', area name 'name'
    //TODO** should have optional area param that allows for nesting
    //TODO** make this collapsable
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    togglePanel(e){
        this.setState({open: !this.state.open})
    }

    renderContent = () =>{
        //routes are passed as jsx, areas are passed as array of data: ["areaname", [<<areas>>], [<<routes>>]]
        let routeList = this.props.routes; //routes as list of jsx elements

        let subAreas = this.props.areas.map( (el) => <Area 
            name = {el[0]}    
            areas = {el[1]}
            routes = {el[2]}
        />)

        return <div><li>{routeList}</li> <li>{subAreas}</li></div>;
    }

    render(){
        return(
            <div>
                <h1 onClick={(e)=>this.togglePanel(e)} >{this.props.name}</h1>
                {this.state.open ? <div style={{}}>{this.renderContent()}</div> : null}
            </div>
    );}


    
}