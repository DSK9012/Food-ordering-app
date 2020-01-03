import React from 'react';
import {Card, CardImg, Button, ButtonGroup} from "reactstrap";
import {Link} from 'react-router-dom';
import {Loading} from '../MyComponents/LoadingComponent';
import { connect } from 'react-redux';
import {fetchSpecificItems, addItem} from '../Redux/ActionCreators';

class FoodItems extends React.Component{

    constructor(props){
        super(props);

        this.state={
            time:new Date()
        }

        //this.selectedItems=this.selectedItems.bind(this);
    }
/*
    selectedItems=(items)=>{
        const Existing=this.state.selectedItems.filter((item)=>item.id===items.id);
        const newItems=this.state.selectedItems.filter((item)=>item.id!==items.id);
        
        if(Existing.length>0)
        {
            const updateExistingItem={...Existing[0], quntity:Existing[0].quantity+items.quantity, itemname:items.itemname};
            this.setState({
                selectedItems:[...newItems, updateExistingItem]
            });
        }
        else
        {
             
            this.setState({
                selectedItems:this.state.selectedItems.push(items)
            }); 
        }
    }
  
    */

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
        if( (ct>=p && ct<=q) || (ct>=r && ct<=s) )
        {    return(
            <React.Fragment>
                <div className="col-12 col-md-6 col-lg-4 mt-3">
                    <div className="item_box" > 
                        <RenderItem item={fooditems}  key={fooditems.id} addItem={this.props.addItem} items={this.props.items}/>
                    </div>       
                </div>
            </React.Fragment>
        );
        }
        else{
            return(<div></div>);
        }

        
        
    });
                if(this.props.items.itemsAreLoading)
                {
                    return(
                        <div className="container">
                        <div className="row justify-content-center" style={{padding:'200px 0px 0px 0px'}}>
                            <div>
                                <Loading />
                            </div>
                        </div>
                        </div>
                    );

                }
                else if(this.props.items.itemsErrMsg)
                {
                    return(
                        <div className="container">
                        <div className="row">
                            <div>{this.props.items.itemsErrMsg}</div>
                        </div>
                        </div>
                    );
                }
                else
                {
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
                            <div className="row">
                                
                            </div>
                        </div><br/><br/>    
                    </React.Fragment>
                    );
                }
  };
}



class  RenderItem extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state={
            quantity:0
        }
    }
      
      decItem(){
          if(this.state.quantity!==0)
          {
          this.setState({
              quantity:--this.state.quantity
          });  
        }
        this.props.addItem(this.props.item._id, this.props.item.itemname, this.props.item.type, this.props.item.price, this.props.items.cartItems.filter((item)=>item.itemId===this.props.item._id).length===1 ? --this.props.items.cartItems[this.props.items.cartItems.map(item=>item.itemId).indexOf(this.props.item._id)].quantity : 1);
      }
    
      incItem(){
        this.setState({
            quantity:++this.state.quantity
        });
        this.props.addItem(this.props.item._id, this.props.item.itemname, this.props.item.type, this.props.item.price, this.props.items.cartItems.filter((item)=>item.itemId===this.props.item._id).length===1 ? ++this.props.items.cartItems[this.props.items.cartItems.map(item=>item.itemId).indexOf(this.props.item._id)].quantity : 1);
    }
    
  
    render(){

        
    return(
        <React.Fragment>
            <div className="row mt-2 mb-2 mr-0" >
                <div className="col-12 col-md-6 ">
                    <Link to={`/home/${this.props.item.id}`} style={{color:'black'}}>
                        <Card>
                            <CardImg height="150px" width="100%" src={'http://localhost:3001/'+this.props.item.image} alt={this.props.item.itemname}/>
                        </Card>
                    </Link>
                </div>
                <div className="col-12 col-md-6" style={{textAlign:'center', fontFamily:'arial', height:'180px', width:'100%'}}>
                    <b>{this.props.item.itemname}</b>
                    <p className="mt-1 mb-1">&#8377;{this.props.item.price}</p>
                    <small style={{color:'red',fontWeight:'bold', fontStyle:'italic'}} >{this.props.item.type}</small><br/> 
                    <ButtonGroup className="mt-2">
                        <Button onClick={()=>this.decItem()} style={{borderRadius:'30px 0px 0px 30px'}} outline>-</Button>
                        <Button outline>{this.props.items.cartItems.filter((item)=>item.itemId===this.props.item._id).length===1 ? this.props.items.cartItems[this.props.items.cartItems.map(item=>item.itemId).indexOf(this.props.item._id)].quantity : 0}</Button>
                        <Button onClick={()=>this.incItem()} style={{borderRadius:'0px 30px 30px 0px'}} outline>+</Button>
                    </ButtonGroup>
                </div>
            </div>
           
        </React.Fragment>
    );
    }
}

const mapStateToProps=state=>{
    return {
        items:state.items
    };
}


export default connect(mapStateToProps, {fetchSpecificItems, addItem})(FoodItems);