import React from 'react';
import { fetchCartItems, addItem } from '../Redux/ActionCreators';
import { connect } from 'react-redux';
import { Card, CardImg, Button, ButtonGroup } from 'reactstrap';
import Loading from './LoadingComponent';
import NavBar from './NavbarComponent';

class Cart extends React.Component{

  constructor(props){ 
    super(props);
    
    this.state={
      cost:0
    }
  }
   
  decItem(id, itemname, image, type, price, quantity){
    if(quantity>0){
      this.props.addItem(id, itemname, image, type, price, --quantity);
    }
  }

  incItem(id, itemname, image, type, price, quantity){
    this.props.addItem(id, itemname, image, type, price, ++quantity); 
  }
  
  componentDidMount(){
    this.props.fetchCartItems();
  }
  
   
  render(){
    
    var totalCost=0;
    const cartItems=this.props.items.cartItems.map((item)=>{
    
      totalCost=totalCost+item.price*item.quantity;     
        
      return (
        <React.Fragment key={item._id} >
            <div className="row" style={{ padding:'10px', borderBottom: '1px dotted black', textAlign:'center' }}>
              <div className="col-12 col-md-4" style={{borderRight:'1px solid silver'}}>
                <Card>
                  <CardImg height="100px" src={"/Images/"+item.image} alt={item.itemname} />
                </Card>
              </div>
              <div className="col-12 col-md-4" style={{borderRight:'1px solid silver'}}>
                <b>{item.itemname}</b><br/>
                <small style={{color:'red'}}>{item.type}</small>
                <p>&#8377;{item.price}</p>
              </div>
              <div className="col-12 col-md-4">
                <b style={{color:'rgb(223, 125, 69)'}}>Quantity : {item.quantity}</b><br/>
                <ButtonGroup className="mt-2">
                  <Button onClick={()=>this.decItem(item.itemId, item.itemname, item.image, item.type, item.price, item.quantity)} className="cart_but" style={{borderRadius:'30px 0px 0px 30px'}} outline>-
                  </Button>
                  <Button outline style={{color:'teal'}}>{item.quantity}</Button>
                  <Button onClick={()=>this.incItem(item.itemId, item.itemname, item.image,  item.type, item.price, item.quantity)} style={{borderRadius:'0px 30px 30px 0px'}} outline>+
                  </Button>
                </ButtonGroup>
                <h5>price : {item.quantity}x{item.price}=&#8377;{item.quantity*item.price}</h5>
              </div>
            </div><br/>
        </React.Fragment>
      );
    });

    if(this.props.items.isLoading){
      return(
        <div className="container">
          <div className="row" style={{ textAlign:'center', paddingTop:'200px' }}>
            <Loading />
          </div>
        </div>
      );                
    }else if(this.props.items.errMsg){
      return(
        <div className="container">
          <div className="row" style={{ textAlign:'center', paddingTop:'200px' }}>
            <h2>{this.props.items.errMsg}</h2>
          </div>
        </div>
      );                
    }else if(this.props.items.cartItems.length>0){
      return(
        <React.Fragment>
          <NavBar />
          <div className="container" style={{padding:'70px'}}>
            {cartItems}
          </div>
          <div className="container-fluid" style={{position:'relative'}}>
            <div className="row">
              <div className="col-12" style={{backgroundColor:'gray'}}>
                <div className="container" style={{textAlign:'center'}}>
                  <h2>Total price : &#8377;{totalCost}</h2>
                </div>
                </div>
            </div>
          </div>
        </React.Fragment>
      );
    }else{
      return(
        <React.Fragment>
          <NavBar />
          <div className="container">
            <div className="row justify-content-center" style={{paddingTop:'300px', color:'gray' }}>
              <h2><i className="fa fa-frown-o" aria-hidden="true"></i> No items added to cart, Plz add to place order...!</h2>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

}

const mapStateToProps=state=>({
  items:state.items
});

export default connect(mapStateToProps, { fetchCartItems, addItem })(Cart);
