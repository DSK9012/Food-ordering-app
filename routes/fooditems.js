const express=require("express");
const router=express.Router();
const auth=require("../middleware/authToken");

const Item=require("../models/foodItemModel");

// @route GET /Home
// @desc Get all food items
// @access Public
router.get("/Home", async (req, res)=>{
    try{
        var items=await Item.find();
        return res.status(200).json(items);
        
    } catch(error){
        console.error(error.message);
        return res.status(500).send("Server error");
    }
});

// @route GET /Home/:availablefor
// @desc Get specific items
// @access Private
router.get("/Home/:availablefor", auth, async (req, res)=>{
    try{
        var items=await Item.find({availablefor:req.params.availablefor});
        return res.status(200).json(items);
    } catch(error){
        console.error(error.message);
        return res.status(500).send("Server error");
    }
});


// @route GET /Home/:availablefor/:sortType
// @desc Get sorted items
// @access Private
router.get("/Home/:availablefor/:sortType", auth, async (req, res)=>{
    try{
        var items=await Item.find({availablefor:req.params.availablefor}).sort({price:req.params.sortType});
        return res.status(200).json(items);
    } catch(error){
        return  res.status(500).send("Server error");
    }
});

// @route GET /:itemId
// @desc Get item by ID
// @access Private
router.get("/item/:itemId", auth, async (req, res)=>{
    try{
        var item=await Item.find({_id:req.params.itemId});
        return res.status(200).json(item);
    } catch(error){
        console.error(error);
        return  res.status(500).send("Server error");
    }
});


module.exports=router;