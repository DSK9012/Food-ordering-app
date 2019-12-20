import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Cart from '../MyComponents/CartComponent';
import Home from '../MyComponents/HomeComponent';
import ItemInfo from './ItemInfoComponent';
import {fetchAllItems, fetchSpecificItems, fetchSortedItems, registerUser} from '../Redux/ActionCreators';
import {connect} from 'react-redux';
import { actions} from 'react-redux-form';
import Landing from './LandingPageComponent';
import Login from './LoginComponent';
import Register from './RegisterComponent';


const mapStateToProps=( state )=>{
    return{
      items:state.items,
      users:state.users
    }
  }
  
  const mapDispatchToProps =( dispatch )=> ({
    fetchAllItems:()=>{dispatch(fetchAllItems())},
    fetchSpecificItems:(specificType)=>{dispatch(fetchSpecificItems(specificType))},
    fetchSortedItems:(specificType, sortType)=>{dispatch(fetchSortedItems(specificType, sortType))},
    registerUser:(username, email, password, cpassword)=>{dispatch(registerUser(username, email, password, cpassword))},
    resetRegUserForm:()=>{dispatch(actions.reset('User'))}
});

class Main extends React.Component{

    componentDidMount(){
        this.props.fetchAllItems();
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
                    <Route exact path='/Welcome' component={()=><Landing items={this.props.items}/>} />
                    <Route exact path='/Welcome/register' component={()=><Register resetRegUserForm={this.props.resetRegUserForm} registerUser={this.props.registerUser} />} />
                    <Route exact path='/Welcome/login' component={()=><Login />} />
                    <Route exact path='/home' component={()=><Home  fetchSpecificItems={this.props.fetchSpecificItems} fetchSortedItems={this.props.fetchSortedItems} items={this.props.items} /> } />
                    <Route exact path='/home/:itemId' component={viewItem} />
                    <Route exact path='/home/Cart' component={Cart} />
                    <Redirect to='/Welcome' />
                </Switch>        
            </React.Fragment>
        );
    };
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps)(Main)); 