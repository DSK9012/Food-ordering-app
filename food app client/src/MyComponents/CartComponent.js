import React from 'react';
import {fetchCartItems, addItem} from '../Redux/ActionCreators';
import { connect } from 'react-redux';
import {Card, CardImg, Button, ButtonGroup} from 'reactstrap';
import {Loading} from './LoadingComponent';
import NavBar from './NavbarComponent';

class Cart extends React.Component{

   
  decItem(id, itemname, type, price, quantity){
      if(quantity>0)
      {
        this.props.addItem(id, itemname, type, price, --quantity);
    }
  }

  incItem(id, itemname, type, price, quantity){
    this.props.addItem(id, itemname, type, price, ++quantity); 
  }
  
  componentDidMount(){
     this.props.fetchCartItems();
  }
  
   
  render(){
  
    const cartItems=this.props.items.cartItems.map((item)=>{
      return (
        <React.Fragment>
            <div className="row" style={{ padding:'10px',borderBottom: '1px dotted black', textAlign:'center' }}>
            <div className="col-12 col-md-4" style={{borderRight:'1px solid silver'}}>
              <Card>
                <CardImg height="100px" src={item.image} alt={item.itemname} />
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
                <Button onClick={()=>this.decItem(item.itemId, item.itemname, item.type, item.price, item.quantity)} className="cart_but" style={{borderRadius:'30px 0px 0px 30px'}} outline>-</Button>
                <Button outline style={{color:'teal'}}>{item.quantity}</Button>
                <Button onClick={()=>this.incItem(item.itemId, item.itemname, item.type, item.price, item.quantity)} style={{borderRadius:'0px 30px 30px 0px'}} outline>+</Button>
              </ButtonGroup>
              <h5>price : {item.quantity}x{item.price}={item.quantity*item.price}</h5>
            </div>
            </div><br/>
        </React.Fragment>
      );
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
                else if(this.props.items.cartItems.length>0){
                  return(
                    <React.Fragment>
                      <NavBar />
                      <div className="container" style={{padding:'70px'}}>
                        {cartItems}
                     
                      </div>
                    </React.Fragment>
                  );
                }
                else{
                  return(
                    <React.Fragment>
                      <div className="conatiner">
                        <h1>{this.props.items.cartItems}</h1>
                      </div>
                    </React.Fragment>
                  );
                }
  };
}

const mapStateToProps=state=>{
  return {
    items:state.items
  };
}

export default connect(mapStateToProps, {fetchCartItems, addItem})(Cart);
