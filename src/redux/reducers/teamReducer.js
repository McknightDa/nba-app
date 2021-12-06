import axios from "axios";
import { ActionTypes } from "../constants/action-types";

let user= null;
let favTeams= [];
let data= [];

const getTeams = () =>{
    axios.get("https://nba-app-cfa32-default-rtdb.firebaseio.com/.json")
    .then((response) => {
         ({data , user} = response.data)
        console.log(data, "Coming from initial get")
        favTeams = []
          Object.keys(user.teams).filter(team => !!user.teams[team]).forEach(team => {
            favTeams.push(user.teams[team])
          })
          console.log(data,user, favTeams)
          const initialState = {
            teams: data,
            user: user,
            favTeams: favTeams
        }
        console.log(initialState)
        return initialState
      })
    .catch((err) =>{
        console.log("Err", err)
    })  
}
getTeams();

let newState = getTeams();



export const teamReducer = (state = null,{type, payload}) => {
    switch (type) {
        case ActionTypes.ALL_TEAMS:
            return state
    
        default:
            return state 
    }

}