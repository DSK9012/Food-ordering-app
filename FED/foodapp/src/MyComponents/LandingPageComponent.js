import React from 'react';
import {Navbar, Nav, NavItem, NavbarBrand, Button, Jumbotron, Card, CardImg} from 'reactstrap';
import { NavLink, Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';

class Landing extends React.Component{

    render(){
    
        return(
            <React.Fragment>
                <Navbar className="landing_navbar" dark expand="md"  fixed="top">
                    <div className="container">
                        <NavbarBrand href='/'><i class="fa fa-cutlery fa-lg" style={{textShadow:'0px 0px 3px white',color:'rgb(204, 120, 10)'}} aria-hidden="true"></i> <b>Wipro Food Items</b></NavbarBrand>    
                        <Nav navbar className="ml-auto">
                            <NavItem className="ml-3 mr-3">
                                <NavLink to='/Welcome/login' className="nav-link" onClick={this.toggleNav} style={{color:'white'}}>
                                    <i class="fa fa-user-circle fa-lg" aria-hidden="true" ></i> Log in
                                </NavLink>
                            </NavItem>           
                        </Nav>        
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h1>Welcome Hunger...</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div style={{textAlign:'center', paddingTop:'50px' }}>
                                    <Link to="/Welcome/Login" >
                                        <Button outline  className=" jumb_button mr-1">Log in</Button>
                                    </Link>
                                    <Link to="/Welcome/Register">
                                        <Button outline className="jumb_button">Register</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-8 offset-2 fast_time" style={{borderColor:'teal'}}>
                            <strong >All items</strong>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <RenderItems items={this.props.items} /><br/><br/><br/>
                </div>
            </React.Fragment>
        );
    }
}

function RenderItems(props){

    const allItems=props.items.items.map((item)=>{
        return(
            <React.Fragment>
                <div className="col-12 col-md-6 col-lg-4 mt-3">
                    <div className="all_item_box"> 
                        <div className="row mt-2 mb-2 mr-0" >
                            <div className="col-12 col-md-6 ">
                                <Link to={`/home/${item.id}`} style={{color:'black'}}>
                                    <Card key={item.id}>
                                        <CardImg height="150px" width="100%" src={'http://localhost:3001/'+item.image} alt={item.itemname}/>
                                    </Card>
                                </Link>
                            </div>
                            <div className="col-12 col-md-6" style={{textAlign:'center', fontFamily:'arial', height:'100px', width:'100%'}}>
                                <b>{item.itemname}</b>
                                <p className="mt-1 mb-1">&#8377;{item.price}</p>
                                <small style={{color:'red',fontWeight:'bold', fontStyle:'italic'}} >{item.type}</small><br/>                                
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    })

    if(props.items.itemsAreLoading){
        return(
            <div className="container">
            <div className="row justify-content-center" style={{padding:'200px 0px 0px 0px'}}>
                <div>
                    <Loading />
                </div>
            </div>
            </div>
        );
    }           
    else if(props.items.itemsErrMsg){
        return(
            <div className="container">
            <div className="row">
                <div>{this.props.items.itemsErrMsg}</div>
            </div>
            </div>
        );
    }
    else{
        return(
            <div className="container">
                <div className="row">
                    {allItems}
                </div>
            </div>
        );
    }
}


export default Landing;