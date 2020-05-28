import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Cart from './CartComponent';
import Home from './HomeComponent';
import ItemInfo from './ItemInfoComponent';
import { loadingUser } from '../Redux/ActionCreators';
import { connect } from 'react-redux';
import Landing from './LandingPageComponent';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import PrivateRoute from './PrivateRoute';
import setAuthToken from '../utils/setAuthToken';


if(localStorage.token){
    setAuthToken(localStorage.token);
}

class Main extends React.Component{

    componentDidMount(){
        this.props.loadingUser();
    }

    render(){

        return(
            <React.Fragment>
                <Switch>
                    <Route exact path='/Welcome' component={Landing} />
                    <Route exact path='/Welcome/register' component={Register} />
                    <Route exact path='/Welcome/login' component={Login}/>
                    <PrivateRoute exact path='/home/Cart' component={Cart} />
                    <PrivateRoute exact path='/home' component={Home} />
                    <PrivateRoute exact path='/home/:itemname' component={ItemInfo} />
                    <Redirect to='/Welcome' />
                </Switch>        
            </React.Fragment>
        );
    }
}

const mapStateToProps=state=>({
    items:state.items
});
  

export default withRouter(connect(mapStateToProps, { loadingUser })(Main)); 