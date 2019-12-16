import React from "react";
import { Control, LocalForm} from 'react-redux-form';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class Login extends React.Component{

    render(){
        return(
            <React.Fragment>
                <div className="login_bg">
                    <div className="container">
                        <div className="row m-1">
                            <div className="col-12 col-md-4 offset-md-4 login_col">
                            <Link to="/Welcome" style={{textDecoration:'none', color:'black'}}><h2 className="mb-0" style={{fontStyle:'italic'}}>Wipro food items</h2></Link>
                                <small style={{color:'gray', fontFamily:'arial'}} className="ml-1">we understand your hungry</small>
                                <LocalForm model="Login" onSubmit={(values) => this.handleSubmit(values)}>
                                    <Control.text   model=".username" 
                                                    id="username" 
                                                    name="username" 
                                                    placeholder="User name or Email"
                                                    className="form-control mt-4 mb-4"
                                                    />
                                    <Control.text   model=".password" 
                                                    id="password" 
                                                    name="password" 
                                                    placeholder="Password"
                                                    className="form-control"
                                                    />
                                    <Button className="mt-3 mb-2" style={{width:'100%', backgroundColor:'teal', borderRadius:'1'}}>LOG IN</Button>
                                    <p style={{color:'gray'}}><small>Don't have account</small><br/>Click <Link to="/Welcome/register">here</Link> to register</p>
                                </LocalForm>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;