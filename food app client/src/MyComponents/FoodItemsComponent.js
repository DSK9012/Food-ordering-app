import React from 'react';
import { Card, CardImg, Button, ButtonGroup } from "reactstrap";
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import { connect } from 'react-redux';
import { fetchSpecificItems, addItem, getItem } from '../Redux/ActionCreators';

class FoodItems extends React.Component{

    constructor(props){
        super(props);

        this.state={
            time:new Date()
        }
    }


    componentDidMount(){
        this.props.fetchSpecificItems("Breakfast");
    }

    render(){

        const Items=this.props.items.specificItems.map((fooditems)=>{

            var p=parseInt(( fooditems.availabletime.substring(0,2) + fooditems.availabletime.substring(3,5) ),10);
            var q=parseInt(( fooditems.availabletime.substring(6,8) + fooditems.availabletime.substring(9,11) ),10);
            var r=parseInt(( fooditems.availabletime.substring(12,14) + fooditems.availabletime.substring(15,17) ),10);
            var s=parseInt(( fooditems.availabletime.substring(18,20) + fooditems.availabletime.substring(21,23) ),10);
            var ct=this.state.time.getHours()*100+this.state.time.getMinutes(); 

            if( (ct>=p && ct<=q) || (ct>=r && ct<=s) ){
                return(
                    <React.Fragment key={fooditems._id}>
                        <div className="col-12 col-md-6 col-lg-4 mt-3">
                            <div className="item_box"  > 
                                <RenderItem item={fooditems} getItem={this.props.getItem} addItem={this.props.addItem} items={this.props.items}/>
                            </div>       
                        </div>
                    </React.Fragment>
                );
            } else{
                return (<div></div>);
            }
        });

        if(this.props.items.isLoading){
            return(
                <div className="container">
                    <div className="row" style={{ paddingTop:'150px', textAlign:'center' }}>
                        <Loading />
                    </div>
                </div>
            );
        } else if(this.props.items.errMsg){
            return(
                <div className="container">
                    <div className="row" style={{ paddingTop:'150px', textAlign:'center' }}>
                        <h2 style={{color:'gray'}}>{this.props.items.errMsg}</h2>
                    </div>
                </div>
            );
        } else{
            return(
                <React.Fragment>
                    <div className="container mt-2">
                        <div className="row">
                            <div className="col-8 offset-2 fast_time">
                                <strong>{this.props.items.specificItems.length>0?(this.props.items.specificItems[0].availablefor):''} items</strong>
                            </div>
                        </div>
                        <div className="row">
                            {Items} 
                        </div>
                    </div>   
                </React.Fragment>
            );   
        }
  };
}



class RenderItem extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isFav:false 
        }
    }
    
    decItem(){
        if(this.props.items.cartItems.length>0 && this.props.items.cartItems[this.props.items.cartItems.map(item=>item.itemId).indexOf(this.props.item._id)].quantity>0){
            this.props.addItem(this.props.item._id, this.props.item.itemname, this.props.item.image, this.props.item.type, this.props.item.price, this.props.items.cartItems.filter((item)=>item.itemId===this.props.item._id).length===1 ? --this.props.items.cartItems[this.props.items.cartItems.map(item=>item.itemId).indexOf(this.props.item._id)].quantity : 0);
        }
    }
    
    incItem(){
        this.props.addItem(this.props.item._id, this.props.item.itemname, this.props.item.image, this.props.item.type, this.props.item.price, this.props.items.cartItems.filter((item)=>item.itemId===this.props.item._id).length===1 ? ++this.props.items.cartItems[this.props.items.cartItems.map(item=>item.itemId).indexOf(this.props.item._id)].quantity : 1);
    }

    addFav(){
        this.setState({
            isFav:!this.state.isFav
        });
    }
    
    getItem(){
        this.props.getItem(this.props.item._id);
    }


    render(){

        return(
            <React.Fragment>
                <div className="row mt-2  mr-0" >
                    <div className="col-12 col-md-6 ">
                        <Link to={`/home/${this.props.item.itemname}`} style={{color:'black'}}>
                            <Card onClick={()=>this.getItem()}>
                                <CardImg height="150px" width="100%" src={"/Images/"+this.props.item.image} alt={this.props.item.itemname}/>
                            </Card>
                        </Link>
                    </div>
                    <div className="col-12 col-md-6" style={{textAlign:'center', fontFamily:'arial', width:'100%'}}>
                        <b>{this.props.item.itemname}</b>
                        <p className="mt-1 mb-1">&#8377;{this.props.item.price}</p>
                        <small style={{color:'red',fontWeight:'bold', fontStyle:'italic'}} >{this.props.item.type}</small><br/> 

                        {!(this.props.items.cartItems.filter((item)=>item.itemId===this.props.item._id).length===1) ?
                        (<Button className="add_but mt-2 mb-4" onClick={()=>this.incItem()} outline>ADD</Button>) :
                        (<ButtonGroup className="mt-2 mb-4" >
                            <Button onClick={()=>this.decItem()} style={{borderRadius:'30px 0px 0px 30px', borderColor:'teal', color:'teal'}} outline>-</Button>
                            <Button outline style={{borderColor:'teal', color:'teal'}}>{ this.props.items.cartItems.filter((item)=>item.itemId===this.props.item._id).length===1 ? this.props.items.cartItems[this.props.items.cartItems.map(item=>item.itemId).indexOf(this.props.item._id)].quantity : 0}</Button>
                            <Button onClick={()=>this.incItem()} style={{borderRadius:'0px 30px 30px 0px', borderColor:'teal', color:'teal'}} outline>+</Button>
                        </ButtonGroup>)
                        }
                        
                        {
                        this.state.isFav    ?
                        (<span onClick={()=>this.addFav()} style={{position:'absolute', bottom:'0', right:'0', textAlign:'center', color:'teal', width:'30px', height:'30px'}}><i className="fa fa-heart" aria-hidden="true"></i></span>)   :
                        (<span onClick={()=>this.addFav()} style={{position:'absolute', bottom:'0', right:'0', textAlign:'center', color:'black', width:'30px', height:'30px'}}><i className="fa fa-heart-o" aria-hidden="true"></i></span>)
                        }

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps=state=>({
    items:state.items,
    loading:state.users.loading
});


export default connect(mapStateToProps, { fetchSpecificItems, addItem, getItem })(FoodItems);