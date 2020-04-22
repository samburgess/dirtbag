import React from 'react'

export default class UserInfo extends React.Component{

    state = {
        loading:true,
        email:"",
        msg1:"Enter user email",
        user:null,
        toDos:null,
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({msg1: "Loading... "});
        //TODO****** figure out how keys work
        const key = "200479780-a90fe858ff8ad40200286ef496ad1160";
        const toDoUrl = 'https://www.mountainproject.com/data/get-to-dos?email=';
        const toDoCall = toDoUrl.concat(this.state.email, "&key=", key);
        const response = await fetch(toDoCall);
        const data = await response.json().catch(e => console.log("no email input"));
        if(data !== undefined){
            this.setState({toDos:data.toDos});
            this.setState({loading:false}); 
        }else{
            this.setState({toDos:["no user found",""]});
            this.setState({loading:false});
        }
    }

    renderTodos = () => {
        let toDoList = [];
        for(let i = 0; i<this.state.toDos.length; i++){
            toDoList.push(<p>{this.state.toDos[i]}</p>);
        }
        return toDoList;
    }

    render(){
        return(
            <div  className="App">
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label>
                        Email:  
                        <input 
                            name="email"
                            type="text"
                            value={this.state.email}
                            onChange={e => this.setState({[e.target.name]: e.target.value})}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {this.state.loading ?
                    <div>{this.state.msg1}</div> : 
                    <div>
                        <div> to dos: </div>
                        <div>{this.renderTodos()}</div>
                    </div>
                }     
            </div>
    );}



}