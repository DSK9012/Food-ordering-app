import * as ActionTypes from '../Redux/ActionTypes';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';


//fetching all items
export const fetchAllItems=()=>async (dispatch)=>{
    dispatch({
      type:ActionTypes.itemsLoading  
    });

    try {
      const response=await axios.get('http://localhost:5000/Home');
      
      dispatch({
        type:ActionTypes.getAllItems,
        payload:response.data
      })
    } catch (error) {
      dispatch({
        type:ActionTypes.itemsLoadingFailed,
        payload:error.message
      })
    }
}



//fetching specific items
export const fetchSpecificItems=(specificType)=>async (dispatch)=>{
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  dispatch({
    type:ActionTypes.itemsLoading
  });

  try {
    const response=await axios.get(`http://localhost:5000/Home/${specificType}`);

    dispatch({
      type:ActionTypes.getSpecificItems,
      payload:response.data
    })
  } catch (error) {
    dispatch({
      type:ActionTypes.itemsLoadingFailed,
      payload:error.message
    })
  } 
}


//fetching sorted items
export const fetchSortedItems=(specificType, sortType)=>async (dispatch)=>{
  dispatch({
    type:ActionTypes.itemsLoading
  });

  try {
    const response=await axios.get(`http://localhost:5000/Home/${specificType}/${sortType}`);

    dispatch({
      type:ActionTypes.getSortedItems,
      payload:response.data
    })
  } catch (error) {
    dispatch({
      type:ActionTypes.itemsLoadingFailed,
      payload:error.message
    })
  }
}


//register user
export const registerUser=(username, email, password, cpassword)=> async dispatch=>{

  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }

  const body=JSON.stringify({username, email, password, cpassword});

  try {
    const response= await axios.post('http://localhost:5000/user/register', body, config);

    dispatch({
      type:ActionTypes.registerUser,
      payload:response.data
    });

    dispatch(loadingUser());
  } catch (error) {
    console.log(error.response.data.errors);
    dispatch({
      type:ActionTypes.registerFail,
    });
  }
};

//Login user
export const loginUser=(email, password)=> async dispatch=>{

  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }

  const body=JSON.stringify({email, password});

  try {
    const response= await axios.post('http://localhost:5000/user/login', body, config);

    dispatch({
      type:ActionTypes.loginUser,
      payload:response.data
    });

    dispatch(loadingUser());
  } catch (error) {
    
    //console.log(error.response.data.errors);
    dispatch({
      type:ActionTypes.loginFail,
    });
  }
};

//Logout user
export const logoutUser=()=>({
  type:ActionTypes.logoutUser
})

//Loading user
export const loadingUser=()=>async (dispatch)=>{
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  try {
    const response=await axios.get('http://localhost:5000/user');

    dispatch({
      type:ActionTypes.loadingUser,
      payload:response.data
    })
  } catch (error) {
    dispatch({
      type:ActionTypes.authError 
    })   
  }
}


//Putting items in cart
export const addItem=(itemId, itemname, type, price, quantity)=>async dispatch=>{
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }

  const body=JSON.stringify({itemId, itemname, type, price, quantity});

  try {
    const response=await axios.post("http://localhost:5000/cart", body, config);

    dispatch({
      type:ActionTypes.addItem,
      payload:response
    })
    dispatch(fetchCartItems());
    dispatch(loadingUser());
  } catch (error) {
    console.log(error);
    dispatch({
      type:ActionTypes.authError
    })
  }  
}

//fetching all cart items
export const fetchCartItems=()=>async (dispatch)=>{
  dispatch({
    type:ActionTypes.itemsLoading  
  });

  try {
    const response=await axios.get('http://localhost:5000/cartItems');
    
    dispatch({
      type:ActionTypes.getCartItems,
      payload:response.data
    })
    dispatch(loadingUser());
  } catch (error) {
    dispatch({
      type:ActionTypes.itemsLoadingFailed,
      payload:error.message
    })
  }
}