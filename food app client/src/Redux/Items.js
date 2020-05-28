import * as ActionTypes from './ActionTypes';


export const Item= (state = { isLoading:true, errMsg:null, items:[], specificItems:[], cartItems:[], comments:[] }, action) => {
    switch(action.type)
    {
        case ActionTypes.itemsLoading:
            return {...state, isLoading:true};

        case ActionTypes.itemsLoadingFailed:
            return {...state, isLoading:false, errMsg:action.payload};

        case ActionTypes.getAllItems:
        case ActionTypes.addComment:
            return {...state, isLoading:false, errMsg:null, items:action.payload};   
        
        case ActionTypes.getSpecificItems:
        case ActionTypes.getSortedItems:
            return {...state, isLoading:false, errMsg:null, specificItems:action.payload}; 
        
        case ActionTypes.getCartItems:
            return {...state, isLoading:false, errMsg:null, cartItems:action.payload};

        case ActionTypes.getComments:
            return {...state, isLoading:false, errMsg:null, comments:action.payload};

        case ActionTypes.addItem:
            return {...state, isLoading:false, errMsg:null};

        case ActionTypes.getItem:
            return {...state, isLoading:false, errMsg:null, items:state.specificItems.filter((item)=>item._id===action.payload) };
        
        default:
            return state;
    }
};
