import React from 'react';
import { Card, CardBody, CardImg, CardHeader, Button } from 'reactstrap';
import Loading from './LoadingComponent';
import NavBar from './NavbarComponent';
import { Form, Control } from 'react-redux-form';
import { addComment } from '../Redux/ActionCreators';
import { connect } from 'react-redux';


class ItemInfo extends React.Component{
    
    constructor(props){
        super(props);

        this.state={
            comments:[]
        }
    }

    handleSubmit(values){
        this.props.addComment(this.props.item._id , this.props.userDetails!==null && this.props.userDetails.username, values.comment);
    }

    render(){
        
        if(this.props.itemIsLoading){
            return(
                <div className="container" style={{padding:'300px 0px 0px 0px'}}>
                    <div className="row justify-content-center">
                        <div>
                            <Loading />                        
                        </div>       
                    </div>
                </div>
            );
        }else if(this.props.itemErrMsg){
            return(
                <div className="container" style={{padding:'100px 0px 0px 0px'}}>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <h3>{this.props.itemErrMsg}</h3>
                        </div>
                    </div>
                </div>
            );
        }else if(this.props.item!==null){
            return(
                <React.Fragment>
                    <NavBar />
                    <div className="view_item">
                        <div className="container" style={{paddingTop:'100px'}}>
                            <div className="row mt-0">
                                <div className="col-12">
                                    <h2 className="ml-2">{this.props.item.itemname}</h2>
                                    <hr />
                                </div>
                            </div>    
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <Card>
                                        <CardImg  height="300px" src={"/Images/"+this.props.item.image} alt={this.props.item.itemname}/>
                                    </Card>            
                                </div>
                                <div className="col-12 col-md-8">
                                    <Card style={{height:'300px'}}  outline color="info">
                                        <CardHeader  style={{backgroundColor:'turquoise', textAlign:'center'}}><strong>Item Details</strong>
                                        </CardHeader>
                                        <CardBody  >
                                            <dl className="row" style={{textAlign:'center'}}>
                                                <dt className="col-6">Item name</dt>
                                                <dd className="col-6">{ this.props.item.itemname}</dd>
        
                                                <dt className="col-6">Price</dt>
                                                <dd className="col-6">&#8377;{ this.props.item.price}</dd>
        
                                                <dt className="col-6">Item type</dt>
                                                <dd className="col-6" style={{color:'red'}}>{ this.props.item.type}</dd>
        
                                                <dt className="col-6">Available for</dt>
                                                <dd className="col-6">{ this.props.item.availablefor}</dd>

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
                                        <Button type="submit" style={{backgroundColor:'teal', width:'100%'}} className="ml-0"><i className="fa fa-commenting" aria-hidden="true"></i>
                                        </Button>
                                    </div>
                                </div> 
                            </Form> 
                            <div className="container mt-3">

                                {
                                this.props.item.comments.length>0?this.props.item.comments.map((user)=>{
                                    return (
                                        <React.Fragment key={user.id}>
                                            <div className="row mt-1" style={{borderBottom:'1px solid teal' }}>
                                                <div className="col-12">
                                                    <i className="fa fa-user"></i> <b>{user.username}</b><br/><small style={{position:'absolute', top:'10', right:'0'}}>{user.date}</small>
                                                    <p>{user.comment}</p>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                }) : '' 
                                }

                            </div>
                        </div>
                    </div>
                 </React.Fragment>
            ); 
        }
    }
}

const mapStateToProps=state=>({
    userDetails:state.users.userDetails,
    item:state.items.items[0],
    itemErrMsg:state.items.errMsg,
    itemIsLoading:state.items.isLoading
})
export default connect(mapStateToProps, { addComment })(ItemInfo);


