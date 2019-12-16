import React from 'react';
import {Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';
import {  NavLink} from 'react-router-dom';
 
class NavBar extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isNavOpen:false,
            value:''
        }
        this.toggleNav=this.toggleNav.bind(this);
    
    }

    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen,
            
        });
    }


   

    render(){
        return(
            <React.Fragment>
                <Navbar className="home_navbar" dark expand="md"  fixed="top">
            <div className="container">
                 <NavbarBrand href='/'><i class="fa fa-cutlery fa-lg" style={{textShadow:'0px 0px 3px white',color:'rgb(204, 120, 10)'}} aria-hidden="true"></i> <b>Wipro Food Items</b> </NavbarBrand>    
                <NavbarToggler onClick={this.toggleNav} />
                <Collapse isOpen={this.state.isNavOpen} navbar > 
                    <Nav navbar className="ml-auto">
                        <NavItem >
                            <NavLink to='/Home/Cart' onClick={this.toggleNav} className="nav-link"  style={{color:'white'}} >
                                <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i> Cart
                            </NavLink>
                        </NavItem>
                        <NavItem className="ml-3 mr-3">
                           <NavLink to='/Home' className="nav-link" onClick={this.toggleNav}>
                                <i class="fa fa-user-circle fa-lg" aria-hidden="true" ></i>
                            </NavLink>
                        </NavItem>           
                    </Nav>
                </Collapse>       
            </div>
        </Navbar>
            </React.Fragment>
        );
    }
}

export default NavBar;