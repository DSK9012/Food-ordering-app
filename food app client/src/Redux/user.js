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

        case ActionTypes.loadingUser:
            return {...state, isAuthenticated:true, loading:false, userDetails:payload};

        case ActionTypes.registerUser:
        case ActionTypes.loginUser:
            localStorage.setItem('token', payload.token);
            return {...state, isAuthenticated:true, loading:false, token:payload.token};
        
        case ActionTypes.registerFail:
        case ActionTypes.authError:
        case ActionTypes.loginFail:
        case ActionTypes.logoutUser:
            localStorage.removeItem('token');
            return {...state, isAuthenticated:false, loading:false, token:null, userDetails:null};
        
        default:
            return state;
    }
}