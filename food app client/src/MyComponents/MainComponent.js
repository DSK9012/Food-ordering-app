import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Cart from '../MyComponents/CartComponent';
import Home from '../MyComponents/HomeComponent';
import ItemInfo from './ItemInfoComponent';
import {loadingUser} from '../Redux/ActionCreators';
import {connect} from 'react-redux';
import Landing from './LandingPageComponent';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import PrivateRoute from '../MyComponents/PrivateRoute';
import setAuthToken from '../utils/setAuthToken';


if(localStorage.token){
    setAuthToken(localStorage.token);
  }

class Main extends React.Component{

    componentDidMount(){
        this.props.loadingUser();
      }

    render(){

        const viewItem=({match})=>{
            return(
                <React.Fragment>
                    <ItemInfo item={this.props.items.items.filter((item)=>item.id===parseInt(match.params.itemId,10))[0]} itemIsLoading={this.props.items.isLoading} itemErrMsg={this.props.items.errMsg}/>
                </React.Fragment>
            );
        };
        return(
            <React.Fragment>
                <Switch>
                    <Route exact path='/Welcome' component={Landing} />
                    <Route exact path='/Welcome/register' component={Register} />
                    <Route exact path='/Welcome/login' component={Login}/>
                    <PrivateRoute exact path='/home/Cart' component={Cart} />
                    <PrivateRoute exact path='/home' component={Home} />
                    <Route exact path='/home/:itemId' component={viewItem} />
                    <Redirect to='/Welcome' />
                </Switch>        
            </React.Fragment>
        );
    };
}

const mapStateToProps=( state )=>{
    return {
        items:state.items,
        users:state.users
    };
  }
  

export default withRouter(connect( mapStateToProps, {loadingUser})(Main)); 