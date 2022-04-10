import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({ user:{isAuthenticated, loading}, component:Component, ...rest}) => (
    <Route {...rest} render={(props)=>!isAuthenticated && !loading ?(<Redirect to="/welcome/login" />):(<Component {...props} />)} />
);

const mapStateToProps=state=>({
    user:state.users
});

export default connect(mapStateToProps)(PrivateRoute);