import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Item} from './Items';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore=()=>{
    const store=createStore(
        combineReducers({
            items:Item
        }),
        applyMiddleware(thunk, logger)
    );
        
return store;
}
