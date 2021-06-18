
// const Store = React.createContext()
// //action = { type: string, newval:5}
// const baseReducer = (state = {value:0}, action) => {
//   switch(action.type){
//     case 'add':
//       return {value: state.value + action.newval }
//   }
// }

// const FakeRedux = ({children}) => {
//   const [state, setState] = React.useReducer(baseReducer)

//   const traditionalSetState= (newState) => {
//     if(typeof newState === 'function'){
//         return setState(newState(state))
//     }else{
//         return setState({...state, ...newState})
//     }
//   }
//   return <Store.Provider value = {state, traditionalSetState}>{children}</Store.Provider>
// }

import './App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
// import AllTeams from './components/AllTeams';
import Logo from './components/Logo';
import AllTeams from './components/AllTeams';
import Favorites from './components/Favorites';
import Form from './components/Form';

export default class App extends Component{
  // state = null;
  state = {
    user: null,
    favTeams: [],
    data: []
  };

   styles = {
    navDisplay:{ display: "flex", justifyContent: "space-around", fontSize: "20px" }
  }


  componentDidMount ()  {
      axios.get("https://nba-app-cfa32-default-rtdb.firebaseio.com/.json")
          .then((response) => {
            const {data , user} = response.data
            console.log(data, "Coming from initial get")
              console.log(data,user)
              let favTeams = [];
              if(!user.teams) {
                this.setState({
                  user,
                  data
                })
              } else {
              console.log(user.teams)
              Object.keys(user.teams).filter(team => !!user.teams[team]).forEach(team => {
                console.log(team)
                console.log("current favorite teams in list", user.teams[team])
                favTeams.push(user.teams[team])
              })
              this.setState({
                  user,
                  favTeams,
                  data

              })
            }
          })
  }

  updatingState =() =>{
    axios.get("https://nba-app-cfa32-default-rtdb.firebaseio.com/.json")
    .then((response) => {
      //console.log(data, "Coming from initial get")
        const {data , user} = response.data
        console.log(data,user)
        
        this.setState({
            user, data
        })
    })
  }
  addOption = (i,data) =>{
    console.log(i,data)
    const addOption = {[data[i].id] : data[i]}
    const addTeamArr = JSON.parse(JSON.stringify(this.state.favTeams))
    addTeamArr.push(addOption[data[i].id])
    // console.log(addOption)
    axios.patch("https://nba-app-cfa32-default-rtdb.firebaseio.com/user/teams.json", addOption)
    .then(response => {
      console.log(response)
      this.setState((previousState)=>
      ( {
            user:{
              ...previousState.user,
            },
            favTeams: addTeamArr
          }
      ))
    })
  }

   deleteOption = (id, oldState, index) => {
   axios.delete("https://nba-app-cfa32-default-rtdb.firebaseio.com/user/teams/"+id+"/.json")
   .then(response => {
     console.log(response)
     //JSON.Stringify turns it into a string representation
     //JSON.PARSE creates a copy of the stringified object
     const newTeamArr = JSON.parse(JSON.stringify(oldState));
     newTeamArr.splice(index,1);
     console.log(newTeamArr)
     this.setState((previousState)=>
    ( {
          user:{
            ...previousState.user,
            
          },
          favTeams: newTeamArr
        }
    ))
   });

}
  render(){
    return (

  
      (this.state === null) ? <div/> : 
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
            <Route path="/home">
              <AllTeams teamInfo={this.state.data} addOption={this.addOption}/>
            </Route>
            <Route path="/favorites">
              <Favorites favTeams={this.state.favTeams} deleteOption={this.deleteOption}/>
            </Route>
            <Route path="/profile">
              <Form {...this.state.user} updatingState={this.updatingState}/>
            </Route>
          </Switch>  
      </div>
      </Router>  
    );
  }}
  
