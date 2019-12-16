import * as ActionTypes from '../Redux/ActionTypes';
import axios from 'axios';

//fetching all items
export const fetchAllItems=()=>(dispatch)=>{
    dispatch(itemsLoading());

    return axios.get('http://localhost:5000/fooditems')
    .then(res=> {
        if (res.status) {
          return res.data;
        } else {
          var error = new Error('Error ' + res.status + ': ' + res.statusText);
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      }) 
    .then(items => dispatch(getAllItems(items)))
    .catch(error => dispatch(itemsLoadingFailed(error.message)));
}

export const getAllItems=(items)=>({
  type:ActionTypes.getAllItems,
  payload:items
});

//fetching specific items
export const fetchSpecificItems=(specificType)=>(dispatch)=>{
  dispatch(itemsLoading());

  return axios.get(`http://localhost:5000/fooditems/${specificType}`)
  .then(res=> {
      if (res.status) {
        return res.data;
      } else {
        var error = new Error('Error ' + res.status + ': ' + res.statusText);
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    }) 
  .then(items => dispatch(getSpecificItems(items)))
  .catch(error => dispatch(itemsLoadingFailed(error.message)));
}

export const getSpecificItems=(items)=>({
  type:ActionTypes.getSpecificItems,
  payload:items
})

//fetching sorted items
export const fetchSortedItems=(specificType, sortType)=>(dispatch)=>{
  dispatch(itemsLoading());

  return axios.get(`http://localhost:5000/fooditems/${specificType}/${sortType}`)
  .then(res=> {
      if (res.status) {
        return res.data;
      } else {
        var error = new Error('Error ' + res.status + ': ' + res.statusText);
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    }) 
  .then(items => dispatch(getSortedItems(items)))
  .catch(error => dispatch(itemsLoadingFailed(error.message)));
}

export const getSortedItems=(items)=>({
  type:ActionTypes.getSortedItems,
  payload:items
})




export const itemsLoading=()=>({
    type:ActionTypes.itemsLoading
});

export const itemsLoadingFailed=(errMsg)=>({
    type:ActionTypes.itemsLoadingFailed,
    payload:errMsg
}); 