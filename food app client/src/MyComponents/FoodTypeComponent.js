import React from 'react';
import {UncontrolledPopover, PopoverHeader, PopoverBody, CustomInput} from 'reactstrap';
import {connect} from 'react-redux';
import {fetchSortedItems, fetchSpecificItems} from '../Redux/ActionCreators';

class FoodType extends React.Component{
    constructor(props){
        super(props);
        this.state={
            specificType:'',
            value:'',
            date:new Date(),
            month:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            day:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            isPopOpen:false
        }
     
    }

    currentTime(){
        setInterval(()=>{this.setState({date:new Date()})},1000);
    }

    togglePop(){
        this.setState({
            isPopOpen:!this.state.isPopOpen
        });
    }

  

    render(){
        return(
            <React.Fragment>
                <div className="second_nav">
                    <div className="container">
                        <div className="row">   
                            <div className="col-12 col-md-4 mt-3 " style={{textAlign:'center'}}>
                                <p onClick={()=>this.props.fetchSpecificItems("Breakfast")} className="nav-link fast_type"  >
                                    Breakfast{this.state.specificType}
                                </p>         
                                <p  onClick={()=>this.props.fetchSpecificItems("Lunch")} className="nav-link fast_type"  >
                                    Lunch
                                </p>         
                                <p  onClick={()=>this.props.fetchSpecificItems("Dinner")} className="nav-link fast_type" >
                                    Dinner  
                                </p>
                            </div>
                            <div className="col-12 col-md-4 mt-3 " style={{textAlign:'center'}} >
                                <input type="text" id="search" name="search"   value={this.state.value} placeholder="Search item by name...."  style={{width:'90%', outline:'none',border:'none', backgroundColor:'rgb(241, 238, 238)', color:'black',borderBottom:'1px solid gray'}} />
                            </div>
                            <div className="col-6 col-md-2 mt-3 " style={{textAlign:'center'}}>
                                <i class="fa fa-calendar fa-lg " style={{color:'rgb(253, 197, 76)'}} aria-hidden="true"></i> {this.state.date.getDate()} {this.state.month[this.state.date.getMonth()]}, {this.state.date.getFullYear()}                       
                            </div>
                            <div className="col-6 col-md-2 mt-3" style={{textAlign:'center'}}>
                                <span style={{cursor:'pointer'}} id="Popover" onClick={()=>this.togglePop()} ><i className="fa fa-filter fa-lg"  style={{color:'rgb(253, 197, 76)'}} aria-hidden="true"></i> Sort </span>    
                                <UncontrolledPopover  trigger="legacy"  placement="bottom" isOpen={this.state.isPopOpen} target="Popover"  >
                                    <PopoverHeader style={{textAlign:'center', backgroundColor:'rgb(253, 125, 69)', color:'white'}}>Sort items by</PopoverHeader>
                                    <PopoverBody className="ml-2 mr-5">
                                        <b>Price</b>
                                        <CustomInput onClick={()=>this.props.fetchSortedItems(this.props.item.availablefor, 1)} className="mt-1" type="radio" id="radio1" name="radio1" label="Low to High" />
                                        <CustomInput onClick={()=>this.props.fetchSortedItems(this.props.item.availablefor, -1)} className="mt-1" type="radio" id="radio2" name="radio1" label="High to Low" />
                                    </PopoverBody>
                                </UncontrolledPopover>
                            </div>         
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps=state=>{
    return {
        item:state.items.specificItems[0],
        user:state.users
    };
}

 

export default connect(mapStateToProps, {fetchSpecificItems, fetchSortedItems})(FoodType);