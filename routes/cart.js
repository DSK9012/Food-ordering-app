const express=require("express");
const router=express.Router();
const Cart=require("../models/Cart");
const auth=require("../middleware/authToken");

//@Route Post /cart
//@desc putting cart items
//@access Private
router.post("/cart", auth, async (req, res)=>{
    const {itemId, itemname, type, price, quantity}=req.body;

    const cart={};
    cart.user=req.user.id;
    cart.items={};
    if(itemId) cart.items.itemId=itemId;
    if(itemname) cart.items.itemname=itemname;
    if(type) cart.items.type=type;
    if(price) cart.items.price=price;
    if(quantity) cart.items.quantity=quantity;
    
    try {
            //check user existed or not
            const user=await Cart.findOne({user:req.user.id});
            
            if(user){

            //check item existed or not
            const getIndex=user.items.map(item=>item.itemId).indexOf(itemId);
            if(getIndex!==-1){
                
                user.items[getIndex]=cart.items;
                await user.save();    
                return res.status(200).send("Item updated successfully");
            
            } else{

            user.items.unshift(cart.items);
            await user.save();
            return res.status(200).send("Item added successfully");
            
            }
        
        } else{
            
            //create
            const newUser=new Cart({
                user:req.user.id,
                items:[cart.items]
            });
            await newUser.save();
            res.status(200).send("User and Item added successfully");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});


//@Route GET /cartItems
//@desc Get all cart items
//@access Private
router.get("/cartItems", auth, async (req, res)=>{
    
    try {
    
        //check user has cart or not
        const user=await Cart.findOne({user:req.user.id});
        if(user && user.items.length>0){
            return res.status(200).json(user.items);
        }  else{
            return res.status(200).send("No items in cart");
        } 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }

});


module.exports=router;