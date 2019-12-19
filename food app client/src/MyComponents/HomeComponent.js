import React from 'react';
import FoodType from '../MyComponents/FoodTypeComponent';
import FoodItems from './FoodItemsComponent';
import NavBar from '../MyComponents/NavbarComponent';

class Home extends React.Component{

    render(){
        return(
            <React.Fragment>    
                <div className="home">    
                    <NavBar/>        
                    <FoodType items={this.props.items.items} fetchSpecificItems={this.props.fetchSpecificItems} fetchSortedItems={this.props.fetchSortedItems} />
                    <FoodItems items={this.props.items} />
                </div>
            </React.Fragment>
        );
    }
}

export default Home;