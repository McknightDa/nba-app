

export const basicReducer = (state={hello:'world'},  action) => {
    switch(action.type){

        case 'basic':
        return {hello:'dan'}
        default: 
            return state
    }
}