import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Logo from './components/Logo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AllTeams from './components/AllTeams';
import Favorites from './components/Favorites';

export default class App extends Component {
  state = null;

  styles = {
    navDisplay:{ display: "flex", justifyContent: "space-around", fontSize: "20px" }
  }
  componentDidMount() {
    axios.get("https://nba-app-cfa32-default-rtdb.firebaseio.com/.json")
      .then((response) => {
        console.log(response)
        const { data, user } = response.data;
        this.setState({
          user, data
        })
      })
  }

  addOption = (i,data) => {
    console.log(i,data)
    const addOption = data[i]
    const addTeamArr = JSON.parse(JSON.stringify(this.state.user.teams))
    addTeamArr.push(addOption)
    axios.post("https://nba-app-cfa32-default-rtdb.firebaseio.com/user/teams.json",{addOption})
    .then(response => {
      console.log(response)
      this.setState((previousState)=>
      ( {
            user:{
              ...previousState.user,
              teams: addTeamArr
            }
          }
      ))
    })


  }
  deleteOption = (i,oldState) => {
   axios.delete("https://nba-app-cfa32-default-rtdb.firebaseio.com/user/teams/"+i+"/.json")
   .then(response => {
     console.log(response)
     const newTeamArr = JSON.parse(JSON.stringify(oldState));
     newTeamArr.splice(i,1)
     console.log(newTeamArr)
     this.setState((previousState)=>
     ( {
           user:{
             ...previousState.user,
             teams: newTeamArr
           }
         }
     ))
    });
  }


  render() {
    return (
      (this.state === null)? <div/> :
      <Router>
        <div className="App">
          <Logo />
          <nav>
            <ul style={this.styles.navDisplay}>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites List</Link>
              </li>
              <li>
                <Link to="/profile">Account Manage</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path='/home'>
            <AllTeams  teamInfo={this.state.data} addOption={this.addOption} />
            </Route>
            <Route path='/favorites'>
            <Favorites  {...this.state.user} deleteOption={this.deleteOption} />
            </Route>
          </Switch>
        </div>
      </Router>

    );
  }
}
