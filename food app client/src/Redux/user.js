import * as ActionTypes from './ActionTypes';

const initialState={
    token:localStorage.getItem("token"),
    isAuthenticated:false,
    loading:true,
    userDetails:null
}

export const User=(state=initialState, action)=>{

    const {type, payload}=action;

    switch(type){

        case ActionTypes.registerUser:
            localStorage.setItem('token', payload);
            return {...state, isAuthenticated:true, loading:false, ...payload};
        
        case ActionTypes.registerFail:
            localStorage.removeItem('token');
            return {...state, isAuthenticated:false, loading:false, token:null};
        
        default:
            return state;
    }
};