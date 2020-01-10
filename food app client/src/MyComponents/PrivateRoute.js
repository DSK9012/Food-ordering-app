import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({ user:{isAuthenticated, loading}, component:Component}) => (
    <Route render={()=>!isAuthenticated ?(<Redirect to="/welcome/login" />):(<Component />)} />
);

const mapStateToProps=state=>({
    user:state.users
});

export default connect(mapStateToProps)(PrivateRoute);