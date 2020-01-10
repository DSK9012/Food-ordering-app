const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const cartSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    items:[{
        itemId:{
            type:String,
            required:true
        },
        itemname:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:0
        }
    }]
});

const cart=mongoose.model("cart", cartSchema);

module.exports=cart;