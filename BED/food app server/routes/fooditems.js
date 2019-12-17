const express=require("express");
const router=express.Router();
const auth=require("../middleware/authToken");

const Item=require("../models/foodItemModel");

//Getting all food items
router.get("/fooditems", async (req, res)=>{
    try{
        let items=await Item.find();
        return res.status(200).json(items);
        
    } catch(error){
        console.error(error.message);
        return res.status(500).send("Server error");
    }
});

//Getting specific items
router.get("/fooditems/:availablefor", auth, async (req, res)=>{
    try{
        let items=await Item.find({availablefor:req.params.availablefor});
        return res.status(200).json(items);
    } catch(error){
        console.error(error.message);
        return res.status(500).send("Server error");
    }
});


//Sorting items based on request from Low to High or High to Low prices 
router.get("/fooditems/:availablefor/:price", auth, async (req, res)=>{
    try{
        let items=await Item.find({availablefor:req.params.availablefor}).sort({price:req.params.price});
        return res.status(200).json(items);
    } catch(error){
        return  res.status(500).send("Server error");
    }
});


module.exports=router;