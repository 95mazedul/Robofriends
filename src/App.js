import React, { Component } from 'react';
import Cardlist from './Cardlist';
import Searchbox from './Searchbox';
//import {robots} from './robots';
import './App.css';
import Scroll from './Scroll.js';
import ErrorBoundary from './ErrorBoundary';


class App extends Component{
    constructor(){
        super()
        this.state={
            robots:[],
            searchField:''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(users=>this.setState({robots:users})) ;
    }
    onSearchChange=(event)=>{
        this.setState({searchField:event.target.value})
        console.log(event.target.value)
        
    }
    render(){
        const filteredRobots=this.state.robots.filter(robot=>{
            return(
                robot.name.toLocaleLowerCase().includes(this.state.searchField.toLocaleLowerCase())
            )
        })
        return(
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <Searchbox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <Cardlist robots={filteredRobots}/>
                    </ErrorBoundary>
                    
                </Scroll>
                
            </div>
        )
    }
    
}
export default App;