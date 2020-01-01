import React from "react";
import { Control, Form} from 'react-redux-form';
import {Button} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import {loginUser} from '../Redux/ActionCreators';
import {connect} from 'react-redux';

class Login extends React.Component{


    handleSubmit(values){
        this.props.loginUser(values.email, values.password);
        alert(JSON.stringify(values));
        //this.props.resetRegUserForm();
    }


    render(){
        if(this.props.isAuthenticated){
            return (<Redirect to="/home" />);

        } else{
            return(
                <React.Fragment>
                    <div className="login_bg">
                        <div className="container">
                            <div className="row m-1">
                                <div className="col-12 col-md-4 offset-md-4 login_col">
                                <Link to="/Welcome" style={{textDecoration:'none', color:'black'}}><h3 className="mb-0" style={{fontStyle:'italic'}}>Wipro food items</h3></Link>
                                    <small style={{color:'gray', fontFamily:'arial'}} className="ml-1">we understand your hungry</small>
                                    <Form model="User" onSubmit={(values) => this.handleSubmit(values)}>
                                        <Control.text   model=".email" 
                                                        id="email" 
                                                        name="email" 
                                                        placeholder="Email"
                                                        className="form-control mt-4 mb-4"
                                                        />
                                        <Control.password   model=".password" 
                                                        id="password" 
                                                        name="password" 
                                                        placeholder="Password"
                                                        className="form-control"
                                                        />
                                        <Button type="submit" className="mt-3 mb-2" style={{width:'100%', backgroundColor:'teal', borderRadius:'1'}}>LOG IN</Button>
                                        <p style={{color:'gray'}}><small>Don't have account</small><br/>Click <Link to="/Welcome/register">here</Link> to register</p>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps=state=>{
    return {
        isAuthenticated:state.users.isAuthenticated
    };
}

const mapDispatchToProps=dispatch=>({
    loginUser:(email, password)=>{dispatch(loginUser(email, password))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);