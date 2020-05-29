import React from 'react';
import { Card, CardBody, CardImg, CardHeader, Button } from 'reactstrap';
import Loading from './LoadingComponent';
import NavBar from './NavbarComponent';
import { Form, Control } from 'react-redux-form';
import { addComment } from '../Redux/ActionCreators';
import { connect } from 'react-redux';


class ItemInfo extends React.Component{
    
     

    handleSubmit(values){
        this.props.addComment(this.props.items.items[0]._id , this.props.userDetails!==null && this.props.userDetails.username, values.comment);
    }

    render(){
        
        if(this.props.items.isLoading){
            return(
                <div className="container" style={{ paddingTop:'300px', textAlign:'center' }}>
                    <div className="row">
                        <Loading />                            
                    </div>
                </div>
            );
        }else if(this.props.items.errMsg){
            return(
                <div className="container" style={{ paddingTop:'100px' }}>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <h3>{this.props.itemErrMsg}</h3>
                        </div>
                    </div>
                </div>
            );
        }else {
            return(
                <React.Fragment>
                    <NavBar />
                    <div className="view_item ">
                        <div className="container " style={{paddingTop:'100px'}}>
                            <div className="row mt-0">
                                <div className="col-12">
                                    <h2 className="ml-2">{this.props.items.items[0].itemname}</h2>
                                    <hr />
                                </div>
                            </div>    
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <Card>
                                        <CardImg  height="300px" src={"/Images/"+this.props.items.items[0].image} alt={this.props.items.items[0].itemname}/>
                                    </Card>            
                                </div>
                                <div className="col-12 col-md-8">
                                    <Card style={{height:'300px'}}  outline color="info">
                                        <CardHeader  style={{backgroundColor:'turquoise', textAlign:'center'}}><strong>Item Details</strong>
                                        </CardHeader>
                                        <CardBody  >
                                            <dl className="row" style={{textAlign:'center'}}>
                                                <dt className="col-6">Item name</dt>
                                                <dd className="col-6">{ this.props.items.items[0].itemname}</dd>
        
                                                <dt className="col-6">Price</dt>
                                                <dd className="col-6">&#8377;{ this.props.items.items[0].price}</dd>
        
                                                <dt className="col-6">Item type</dt>
                                                <dd className="col-6" style={{color:'red'}}>{ this.props.items.items[0].type}</dd>
        
                                                <dt className="col-6">Available for</dt>
                                                <dd className="col-6">{ this.props.items.items[0].availablefor}</dd>

                                            </dl>
                                        </CardBody>                
                                    </Card>
                                </div> 
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <h2>Comment</h2>
                                </div>
                            </div>

                            <Form model="User" onSubmit={(values) => this.handleSubmit(values)}>
                                <div className="row ">
                                    <div className="col-md-10  mt-1">               
                                        <Control.text   model=".comment"
                                                        id="comment"
                                                        name="comment"
                                                        placeholder="Enter your taste..."
                                                        className=" form-control mr-0"
                                                        style={{width:'100%', outline:'none',border:'none', backgroundColor:'rgb(228, 208, 208)', color:'gray',borderBottom:'1px solid gray'}}
                                                    />    
                                    </div>        
                                    <div className="col-md-2  mt-1" >
                                        <Button type="submit" style={{backgroundColor:'teal', width:'100%'}} className="ml-0"><i className="fa fa-paper-plane" aria-hidden="true"></i>
                                        </Button>
                                    </div>
                                </div> 
                            </Form> 
                            <div className="container mt-3 ">

                                {
                                this.props.items.items[0].comments.length>0?this.props.items.items[0].comments.map((user)=>{
                                    return (
                                        <React.Fragment key={user.id}>
                                            <div className="row mt-1" style={{borderBottom:'1px solid teal' }}>
                                                <div className="col-12">
                                                    <i className="fa fa-user"></i> <b>{user.username}</b>{' '}
                                                    <small>{new Date(user.date).toLocaleTimeString()}</small>
                                                    <br/>
                                                    <small style={{position:'absolute', top:'10', right:'0'}}>{new Date(user.date).toDateString()}</small>
                                                    <p>{user.comment}</p>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                }) : '' 
                                }

                            </div><br/><br/><br/>
                        </div>
                    </div>
                 </React.Fragment>
            ); 
        }
    }
}

const mapStateToProps=state=>({
    userDetails:state.users.userDetails,
    items:state.items
});
export default connect(mapStateToProps, { addComment })(ItemInfo);


