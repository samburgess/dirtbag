import React from 'react';
import Route from './Components/Route.js';
import Area from './Components/Area.js';
import './App.css';

export default class RouteFinder extends React.Component{

    state={
        loading: true,
        distance:"",
        lat:"Getting your location . . . ",
        lon:"",
        routesRaw:null, //json object
        routeList:[]   //list of all <Route> jsx objects
    }

    getLocation = () =>{
        navigator.geolocation.getCurrentPosition( position => {
            this.setState({lat:(JSON.stringify(position.coords.latitude))});
            this.setState({lon:(JSON.stringify(position.coords.longitude))});
        },
        error => {
            this.setState({coords:"Please allow location services"});
        }
        );
    }

    //gets routes as json
    getRoutes = async (e) =>{
        e.preventDefault();
        //TODO****** figure out how keys work
        const key = "200479780-a90fe858ff8ad40200286ef496ad1160";
        const routesUrl = 'https://www.mountainproject.com/data/get-routes-for-lat-lon?';
        const routesCall = routesUrl.concat("&lat="+this.state.lat+"&lon="+this.state.lon+"&key="+key+"&maxDistance="+this.state.distance);
        const response = await fetch(routesCall);
        const data = await response.json().catch(e => console.log("bad input"));
        if(data !== undefined){
            this.setState({routesRaw:data.routes});
            this.parseRoutes();
            this.setState({loading:false});
        }else{
            this.setState({routesRaw:["no routes found within specified distance",""]});
            this.setState({loading:false});
        }
    }

    //returns route objects in one list
    parseRoutes = () =>{
        console.log("parse routes")
        let routes = [];
        for(let i = 0; i<this.state.routesRaw.length; i++){
                routes.push(<Route 
                    name = {this.state.routesRaw[i].name}
                    location = {this.state.routesRaw[i].location}
                    type = {this.state.routesRaw[i].type}
                    grade = {this.state.routesRaw[i].rating}
                    stars = {this.state.routesRaw[i].stars}
                />)
        }
        this.setState({routeList:routes});
        // for(let i = 0; i<this.state.routeList.length; i++){
        //     console.log(this.state.routeList[i].props.name)
        // }
    }

    //splits list of routes into area objects
    //TODO** check indexing
    parseAreas = () =>{

        console.log("parse areas")

        /*
        example area = ["area_name", ["sub-area1", "sub-area2", ...], ["route1", "route2"]]
        routes are only in added to bottom level area for that route
        */

        //for route in routes
            //for location in route.locations
                //if ! areas[] contains locations[0] - make callback where area[0] === location[0]
                    //create new area
                //area = areas[area_index]
                //for route.locations[1 .. end]
                    //if ! area[1] contains location
                        //insert location into area
                    //area = area[1][location]




        //array of root areas (eg state / country)
        let areas = []

        for(let i = 0; i<this.state.routeList.length; i++){
            let route = this.state.routeList[i]
            let rootIndex = areas.findIndex((el) => el[0] === route.props.location[0])
            if(rootIndex === -1){
                areas.push([route.props.location[0], [], []])
                rootIndex = areas.length-1
            }
            let area = areas[rootIndex]
            let location = "";
            let loc_index = -1;
            for(let j = 1; j<route.props.location.length; j++){
                location = route.props.location[j]
                if(area != null){
                    loc_index = area[1].findIndex((el) => el[0] === location)
                }
                if(loc_index === -1){
                    area[1].push([location, [], []])
                    loc_index = area[1].length-1
                }
                area = area[1][loc_index]
            }
            area[2].push(route)
        }

        return areas.map((area) => 
            <Area className="Nested-areas"
                name={area[0]}
                areas={area[1]}
                routes={ area[2] }       
            />
        )
    }

    render(){
        this.getLocation();
        return(
            <div className="App">
                <form onSubmit={e => this.getRoutes(e)}>
                    <label>
                        Find routes
                        <input
                            placeholder="miles"
                            name="distance"
                            type="number"
                            value={this.state.distance}
                            onChange={e => this.setState({[e.target.name]: e.target.value})}
                        />
                    </label>
                    from you <input type="submit" value="Submit" />
                </form>
                        <div>Your location: {this.state.lat} , {this.state.lon}</div>
                        {this.state.loading ?
                            <div>Enter a distance to find routes</div> :
                            <div>
                                <div>Routes near you</div>
                                <div>{this.parseAreas()}</div>
                            </div>  
                        }
            </div>
    );}

}