import { ActionTypes } from "../constants/action-types"

export const addOptions = (data,i) => {
    return{
        type:ActionTypes.ADD_OPTION,
        payload: data
    };
};
export const deleteOptions = (id, oldState, index) => {
    return{
        type:ActionTypes.DELETE_OPTION,
        payload: id, oldState, index
    };
};
// export const updateState = () => {
//     return{
//         type:ActionTypes.UPDATE_STATE,
//         payload: data
//     };
// };