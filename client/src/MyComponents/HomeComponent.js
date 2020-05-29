import React from 'react';
import FoodType from './FoodTypeComponent';
import FoodItems from './FoodItemsComponent';
import NavBar from './NavbarComponent';

class Home extends React.Component{

    render(){
        return(
            <React.Fragment>    
                <div className="home">
                    <NavBar />            
                    <FoodType />
                    <FoodItems />
                </div>
            </React.Fragment>
        );
    }
}


export default Home;