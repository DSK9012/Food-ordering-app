import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Item } from './Items';
import { User } from './user';
import { createForms } from 'react-redux-form';
import { regUserForm } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
//import {composeWithDevTools} from 'redux-devtools-extension';

export const ConfigureStore=()=>{
    
    const store=createStore(
        combineReducers({
            items:Item,
            users:User,
            ...createForms({
                User:regUserForm
            })
        }),
         applyMiddleware(thunk, logger)
    );
        
    return store;
}
