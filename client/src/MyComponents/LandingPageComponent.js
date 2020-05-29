import React from 'react';
import { Button, Jumbotron, Card, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import { connect } from 'react-redux';
import { fetchAllItems } from '../Redux/ActionCreators';
import NavBar from './NavbarComponent';

class Landing extends React.Component{

    componentDidMount(){
        this.props.fetchAllItems();
    }
    
    render(){        

        return(
            <React.Fragment>
                <NavBar />
                <Jumbotron>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h1>Welcome Hunger...</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                            { (!this.props.isAuthenticated) &&
                                (<div className="col-12 col-sm-6">
                                    <div style={{textAlign:'center', paddingTop:'50px' }}>
                                        <Link to="/Welcome/Login" >
                                            <Button outline  className=" jumb_button mr-1">Log in</Button>
                                        </Link>
                                        <Link to="/Welcome/Register">
                                            <Button outline className="jumb_button">Register</Button>
                                        </Link>
                                    </div>
                                </div>)
                            }       
                        </div>
                    </div>
                </Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-8 offset-2 fast_time" style={{borderColor:'teal'}}>
                            <strong >All items</strong>
                        </div>
                    </div>
                </div>
                <div className="container mb-3">
                    <RenderItems items={this.props.items} /> 
                </div>
            </React.Fragment>
        );
    }
}

function RenderItems(props){

    const allItems=props.items.items.map((item)=>{
        return(
            <React.Fragment key={item._id}>
                <div className="col-12 col-md-6 col-lg-4 mt-3">
                    <div className="all_item_box" > 
                        <div className="row mt-2 mb-2 mr-0" >
                            <div className="col-12 col-md-6 ">        
                                <Card >
                                    <CardImg height="150px" width="100%" src={"/Images/"+item.image} alt={item.itemname}/>
                                </Card>
                            </div>
                            <div className="col-12 col-md-6" style={{textAlign:'center', fontFamily:'arial', height:'100px', width:'100%'}}>
                                <b>{item.itemname}</b>
                                <p className="mt-1 mb-1">&#8377;{ item.price }</p>
                                <small style={{ color:'red', fontWeight:'bold', fontStyle:'italic' }} >{item.type}</small><br/>                                
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    })

    if(props.items.isLoading){
        return(
            <div className="container">
                <div className="row" style={{ paddingTop:'100px', textAlign:'center' }}>
                    <Loading />
                </div>
            </div>
        );
    }           
    else if(props.items.errMsg){
        return(
            <div className="container">
            <div className="row justify-content-center" style={{ paddingTop:'100px' }}>
                <h2 style={{color:'gray'}}>{props.items.errMsg}</h2>
            </div>
        </div>
        );
    }
    else{
        return(
            <div className="container">
                <div className="row">
                    {allItems}
                </div>
            </div>
        );
    }
}

const mapStateToProps=state=>({
    items:state.items,
    isAuthenticated:state.users.isAuthenticated
});


export default connect(mapStateToProps, { fetchAllItems })(Landing);