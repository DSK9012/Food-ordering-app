import React from "react";
import { Control, Form, Errors} from 'react-redux-form';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validPassword=(val)=>/^[A-Z]+[a-z]+[!@#$&%0-9]/i.test(val);


class Login extends React.Component{
    
     
    handleSubmit(values){
        this.props.registerUser(values.username, values.email, values.password, values.cpassword);
        alert('Current State is: ' + JSON.stringify( values));
        this.props.resetRegUserForm();
    }
    
    render(){
        return(
            <React.Fragment>
                <div className="login_bg">
                    <div className="container">
                        <div className="row m-1">
                            <div className="col-12 col-md-4 offset-md-4 login_col">
                                <Link to="/Welcome" style={{textDecoration:'none', color:'black'}}><h3 className="mb-0" style={{fontStyle:'italic'}}>Wipro food items</h3></Link>
                                <small style={{color:'gray', fontFamily:'arial'}} className="ml-1">we understand your hungry</small>
                                <Form model="User" onSubmit={(values) => this.handleSubmit(values)}>
                                    <Control.text   model=".username" 
                                                    id="username" 
                                                    name="username" 
                                                    placeholder="User name"
                                                    className="form-control mt-4"
                                                    validators={{
                                                        required, 
                                                        minLength:minLength(5),
                                                        maxLength:maxLength(15),
                                                    }}
                                                />
                                    <Errors className="text-danger"
                                            model=".username"
                                            show="touched"
                                            messages={{
                                                required:"User name is required",
                                                minLength:"Must be greater than 5 characters",
                                                maxLength:"Must be less than 15 characters"
                                            }}  
                                            />  
                                    <Control.text   model=".email" 
                                                    id="email" 
                                                    name="email" 
                                                    placeholder="Mail ID"
                                                    className="form-control mt-4"
                                                    validators={{
                                                        required,
                                                        validEmail
                                                    }}
                                                />
                                    <Errors className="text-danger"
                                            model=".email"
                                            show="touched"
                                            messages={{
                                                required:"Email is required",
                                                validEmail:"Enter valid mail"
                                            }}  
                                            />          
                                    <Control.password   model=".password" 
                                                    id="password" 
                                                    name="password" 
                                                    placeholder="Password"
                                                    className="form-control mt-4"
                                                    validators={{
                                                        required,
                                                        minLength:minLength(8),
                                                        maxLength:maxLength(15),
                                                        validPassword
                                                    }}
                                                />
                                    <Errors className="text-danger"
                                            model=".password"
                                            show="touched"
                                            messages={{
                                                required:"Password is required",
                                                minLength:"Must be greater than 8 characters",
                                                maxLength:"Must be less than 15 characters",
                                                validPassword:"Doesn't meet password requirement"
                                            }}  
                                            />  
                                    <Control.password   model=".cpassword" 
                                                    id="cpassword" 
                                                    name="cpassword" 
                                                    placeholder="Confirm password"
                                                    className="form-control mt-4 "
                                            />          
                                    <Button type="submit" className="mt-4 mb-2" style={{width:'100%', backgroundColor:'teal', borderRadius:'1'}}>REGISTER</Button>
                                    <p style={{color:'gray'}}><small>Already have an account</small><br/>Click <Link to="/Welcome/login">here</Link> to Log in</p>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;