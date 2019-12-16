import React from 'react';
import {Card, CardBody, CardImg, CardHeader, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
class ItemInfo extends React.Component{
 
    render(){


        if(this.props.itemIsLoading)
        {
            return(
                <div className="container" style={{padding:'300px 0px 0px 0px'}}>
                    <div className="row justify-content-center">
                        <div>
                            <Loading />                        
                        </div>       
                    </div>
                </div>
            );
        }
        else if(this.props.itemErrMsg)
        {
            return(
                <div className="container" style={{padding:'100px 0px 0px 0px'}}>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <h3>{this.props.errMsg}</h3>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.props.item!=null)
        {
                return(
                    <React.Fragment>
                        <div className="view_item">
                                <div className="container" style={{paddingTop:'100px'}}>
                                    <div className="row mt-0">
                                        <div className="col-12">
                                            <Breadcrumb>
                                                <BreadcrumbItem>
                                                    <Link to='/home' className="bredhome">Home</Link>
                                                </BreadcrumbItem>
                                                <BreadcrumbItem active>
                                                    {this.props.item.itemname}
                                                </BreadcrumbItem>
                                            </Breadcrumb>
                                        </div>
                                        <div className="col-12">
                                            <h2 className="ml-2">{this.props.item.itemname}</h2>
                                            <hr />
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-12 col-md-4">
                                            <Card>
                                                <CardImg  height="300px" src={'http://localhost:3001/'+this.props.item.image} alt={this.props.item.itemname}/>
                                            </Card>            
                                        </div>
            
                                        <div className="col-12 col-md-8">
                                            <Card style={{height:'300px'}}  outline color="info">
                                            <CardHeader  style={{backgroundColor:'turquoise', 'text-align':'center'}}><strong>Item Details</strong></CardHeader>
                                                <CardBody  >
                                                    <dl className="row" style={{textAlign:'center'}}>
                                                        <dt class="col-6">Item name</dt>
                                                        <dd class="col-6">{ this.props.item.itemname}</dd>
            
                                                        <dt class="col-6">Price</dt>
                                                        <dd class="col-6">&#8377;{ this.props.item.price}</dd>
            
                                                        <dt class="col-6">Item type</dt>
                                                        <dd class="col-6" style={{color:'red'}}>{ this.props.item.type}</dd>
            
                                                        <dt class="col-6">Available for</dt>
                                                        <dd class="col-6">{ this.props.item.availablefor}</dd>

                                                    </dl>
                                                </CardBody>                
                                            </Card>
                                        </div> 
                                    </div><br/>
                                </div>
                                </div>
                    </React.Fragment>
                );
        }
       
    }
}

export default ItemInfo;
