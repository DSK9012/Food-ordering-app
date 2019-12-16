import * as ActionTypes from './ActionTypes';


export const Item= (state = { isLoading:true, errMsg:null, items:[] }, action) => {
    switch(action.type)
    {
        case ActionTypes.itemsLoading:
            return {...state, isLoading:true};

        case ActionTypes.itemsLoadingFailed:
            return {...state, isLoading:false, errMsg:action.payload};

        case ActionTypes.getAllItems:
            return {...state, isLoading:false, errMsg:null, items:action.payload};   
        
        case ActionTypes.getSpecificItems:
            return {...state, isLoading:false, errMsg:null, items:action.payload}; 

        case ActionTypes.getSortedItems:
            return {...state, isLoading:false, errMsg:null, items:action.payload};
        default:
            return state;
    }
};
