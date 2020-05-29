import React from "react";
import { Control, Form } from 'react-redux-form';
import { Button} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../Redux/ActionCreators';
import { connect } from 'react-redux';

class Login extends React.Component{


    handleSubmit(values){
        this.props.loginUser(values.email, values.password);
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
            return(
                <React.Fragment>
                    <div className="login_bg">
                        <div className="container">
                            <div className="row m-1">
                                <div className="col-12 col-md-4 offset-md-4 login_col">
                                <Link to="/Welcome" style={{textDecoration:'none', color:'black'}}><h3 className="mb-0" style={{fontStyle:'italic'}}>Jungies food items</h3></Link>
                                    <small style={{color:'gray', fontFamily:'arial'}} className="ml-1">we understand your hungry</small>
                                    <div className="mt-2">
                                        {alert}
                                    </div>
                                    <Form model="User" onSubmit={(values)=>this.handleSubmit(values)}>
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

const mapStateToProps=state=>({
    isAuthenticated:state.users.isAuthenticated,
    users:state.users
});


export default connect(mapStateToProps, { loginUser })(Login);