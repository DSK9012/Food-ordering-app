import React from 'react';
import {Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';
import {  NavLink} from 'react-router-dom';
import {logoutUser} from '../Redux/ActionCreators'; 
import {connect} from 'react-redux';

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

        const publicLinks=(
            <React.Fragment>
                <NavItem >
                    <NavLink to='/Welcome/login' className="nav-link" onClick={this.toggleNav} style={{color:'white'}}>
                        <i className="fa fa-user-circle fa-lg" aria-hidden="true" ></i> Log in
                    </NavLink>
                </NavItem>
            </React.Fragment>
        );

        const privateLinks=(
            <React.Fragment>
                <NavItem className="mr-3">
                    <NavLink to='/home' className="nav-link active-link" onClick={this.toggleNav} style={{color:'white'}}>
                        <i className="fa fa-home fa-lg" aria-hidden="true" ></i> Home
                    </NavLink>
                </NavItem>
                <NavItem className="mr-3" >
                    <NavLink to='/Home/Cart' onClick={this.toggleNav} className="nav-link"  style={{color:'white'}} >
                        <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i> Cart
                    </NavLink>
                </NavItem>
                <NavItem className="">
                    <NavLink to='/Welcome' className="nav-link" onClick={this.props.logoutUser} style={{color:'white'}}>
                        <span><i className="fa fa-user-circle fa-lg" aria-hidden="true" ></i> Log out</span>
                    </NavLink>
                </NavItem>        
            </React.Fragment>
        );

        return(
            <React.Fragment>
                <Navbar className="home_navbar" dark expand="md"  fixed="top">
                    <div className="container">
                        <NavbarBrand  href='/welcome'><i class="fa fa-cutlery fa-lg" style={{textShadow:'0px 0px 3px white',color:'rgb(204, 120, 10)'}} aria-hidden="true"></i> <b>Wipro Food Items</b> </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} className="mr-0"/>    
                        <Collapse isOpen={this.state.isNavOpen} navbar > 
                            <Nav navbar className="ml-auto">
                                {!this.props.isAuthenticated ? publicLinks : privateLinks}           
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}


const mapStateToProps=state=>{
    return {
        isAuthenticated:state.users.isAuthenticated
    };
}

export default connect(mapStateToProps, {logoutUser})(NavBar);