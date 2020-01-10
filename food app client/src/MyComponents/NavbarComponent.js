import React from 'react';
import { Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../Redux/ActionCreators'; 
import { connect } from 'react-redux';

class NavBar extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isNavOpen:false
        }
    }

    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen
        });
    }

    render(){

        const publicLinks=(
            <React.Fragment>
                <NavItem >
                    <NavLink to='/Welcome/login' className="nav-link" onClick={()=>this.toggleNav()} style={{color:'white'}}>
                        <i className="fa fa-user-circle fa-lg" aria-hidden="true" ></i> Log in
                    </NavLink>
                </NavItem>
            </React.Fragment>
        );

        const privateLinks=(
            <React.Fragment>
                <NavItem className="mr-3" active>
                    <NavLink to='/home' className="nav-link " onClick={()=>this.toggleNav()} style={{color:'white'}}>
                        <i className="fa fa-home fa-lg" aria-hidden="true" ></i> Home
                    </NavLink>
                </NavItem>
                <NavItem className="mr-3" >
                    <NavLink to='/home/cart' onClick={()=>this.toggleNav()} className="nav-link"  style={{color:'white'}} >
                        <i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i> Cart
                    </NavLink>
                </NavItem>
                <UncontrolledDropdown >
                    <DropdownToggle tag="dropdown" className="nav-link" caret style={{cursor:'pointer', color:'white'}}>
                        <i className="fa fa-user-circle fa-lg" aria-hidden="true" ></i>{this.props.user.userDetails!==null && this.props.user.userDetails.username.toUpperCase()} 
                    </DropdownToggle>    
                    <DropdownMenu >
                        <DropdownItem tag="dropdown" className="drop" >
                            <NavLink style={{color:'black'}} className="nav-link" to="">
                                <i className="fa fa-user" aria-hidden="true"></i> My Profile
                            </NavLink>
                        </DropdownItem>
                        <DropdownItem tag="dropdown" className="drop" >
                            <NavLink className="nav-link"  style={{color:'black'}} to="">
                                <i className="fa fa-heart" aria-hidden="true"></i> My Favourites
                            </NavLink>
                        </DropdownItem>
                        <DropdownItem tag="dropdown" className="drop" >
                            <NavLink style={{color:'black'}} to='/Welcome' className="nav-link" onClick={this.props.logoutUser} >
                                <i className="fa fa-sign-out" aria-hidden="true"></i> Log out
                            </NavLink>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>     
            </React.Fragment>
        );

        return(
            <React.Fragment>
                <Navbar className="home_navbar" dark expand="md"  fixed="top">
                    <div className="container">
                        <NavbarBrand  href='/welcome'><i className="fa fa-cutlery fa-lg" style={{textShadow:'0px 0px 3px white',color:'rgb(204, 120, 10)'}} aria-hidden="true"></i> 
                            <b> Wipro Food Items</b> 
                        </NavbarBrand>
                        <NavbarToggler onClick={()=>this.toggleNav()} className="mr-0"/>    
                        <Collapse isOpen={this.state.isNavOpen} navbar > 
                            <Nav navbar className="ml-auto">
                                {!this.props.user.isAuthenticated ? publicLinks : privateLinks}           
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}


const mapStateToProps=state=>({
    user:state.users
});


export default connect(mapStateToProps, { logoutUser })(NavBar);