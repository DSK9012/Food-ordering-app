const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Defining food item schema
const itemSchema=new Schema({
    itemname:String,
    availablefor:String,
    type:String,
    availabletime:String,
    price:Number
});

//Creating DB model/collection with defined itemSchema with the specified name in 1st parameter
const Item=mongoose.model("fooditems",itemSchema);


module.exports=Item;