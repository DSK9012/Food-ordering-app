import React from "react";
import { Control, Form } from 'react-redux-form';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { registerUser } from '../Redux/ActionCreators';


class Login extends React.Component{
    
     
    handleSubmit(values){
        this.props.registerUser(values.username, values.email, values.password, values.cpassword);
    }
    
    render(){
        
        const alert=this.props.users.errors.map((error)=>{
            return(
                <React.Fragment>
                    <p style={{ backgroundColor:'red', borderRadius:'5px', color:'white', padding:'5px' }}>{error.msg}</p>
                </React.Fragment>
            );
        });

        if(this.props.isAuthenticated){
            return (<Redirect to="/home" />);
        } else{
            return (
                <React.Fragment>
                    <div className="login_bg">
                        <div className="container">
                            <div className="row m-1">
                                <div className="col-12 col-md-4 offset-md-4 login_col">
                                    <Link to="/Welcome" style={{ textDecoration:'none', color:'black' }}><h3 className="mb-0" style={{fontStyle:'italic' }}>Jungies food items</h3></Link>
                                    <small style={{ color:'gray', fontFamily:'arial' }} className="ml-1">we understand your hungry</small>
                                    <div className="mt-2">
                                        {alert}
                                    </div>
                                    <Form model="User" onSubmit={(values)=>this.handleSubmit(values)}>
                                        <Control.text   model=".username" 
                                                        id="username" 
                                                        name="username" 
                                                        placeholder="User name"
                                                        className="form-control mt-4"
                                                        
                                                    />
                                        <Control.text   model=".email" 
                                                        id="email" 
                                                        name="email" 
                                                        placeholder="Mail ID"
                                                        className="form-control mt-4"
                                                        
                                                    /> 
                                        <Control.password   model=".password" 
                                                        id="password" 
                                                        name="password" 
                                                        placeholder="Password"
                                                        className="form-control mt-4"
                                                        
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
}

const mapStateToProps=state=>({
    isAuthenticated:state.users.isAuthenticated,
    users:state.users
});

export default connect(mapStateToProps, { registerUser })(Login);