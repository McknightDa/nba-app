import { combineReducers } from "redux";
import { teamReducer } from "./teamReducer";

const reducers = combineReducers({
    allTeams: teamReducer,
})

export default reducers