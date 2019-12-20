import * as ActionTypes from '../Redux/ActionTypes';
import axios from 'axios';

//fetching all items
export const fetchAllItems=()=>async (dispatch)=>{
    dispatch(itemsLoading());

    try {
      const res=await axios.get('http://localhost:5000/Home');
      
      dispatch({
        type:ActionTypes.getAllItems,
        payload:res.data
      })
    } catch (error) {
      dispatch({
        type:ActionTypes.itemsLoadingFailed,
        payload:error.response.data
      })
    }
}



//fetching specific items
export const fetchSpecificItems=(specificType)=>(dispatch)=>{
  dispatch(itemsLoading());

  return axios.get(`http://localhost:5000/Home/${specificType}`)
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

  return axios.get(`http://localhost:5000/Home/${specificType}/${sortType}`)
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


//register user
export const registerUser=(username, email, password, cpassword)=> async dispatch=>{

  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }

  const body=JSON.stringify({username, email, password, cpassword});

  try {
    const res= await axios.post('http://localhost:5000/user/register', body, config);
    console.log(res);
    dispatch({
      type:ActionTypes.registerUser,
      payload:res.data
    });

  } catch (error) {
    console.log(error.response.data.errors);
    dispatch({
      type:ActionTypes.registerFail,
    });
  }
};