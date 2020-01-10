const express=require("express");
const router=express.Router();
const auth=require("../middleware/authToken");
const Item=require("../models/foodItemModel");

//@Route POST /addComment
//@desc add comment
//@access Private
router.post("/addComment", auth, async (req, res)=>{

    const {itemId, username, comment}=req.body;

    const item={};
    if(username) item.username=username;
    if(comment) item.comment=comment;
    
    try {
    //get item index
    const getItem=await Item.findOne({_id:itemId});
        getItem.comments.unshift(item);
        await getItem.save();
        res.status(200).json(getItem);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});


//@Route GET /addComment
//@desc get comments
//@access Private
router.get("/fetchComments/:itemId", auth, async (req, res)=>{
    
    try {
    //get item index
    const getItem=await Item.find({_id:req.params.itemId});
    res.status(200).json(getItem.comments);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports=router;