const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const router=express.Router();
const {check, validationResult}=require("express-validator");
const User=require("../models/userModel");

// @route POST /user/register
// @desc Registering user
// @access Public
router.post("/user/register",
[
    check("username", "User name is required").not().isEmpty(),
    check("email", "email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("username", "Must be greater than 3 and less than 20 characters").isLength({min:3, max:20}),
    check("email","Plesae enter a valid mail").isEmail(),
    check("password", "Must be greater than 6 and less than 20 characters").isLength({min:6, max:20})
],
async (req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    const {username, email, password, cpassword}=req.body;

    try{
          //see user existed or not
          var checkUser=await User.findOne({ email });
          if(checkUser){
            return res.status(400).json({errors:[{msg:"User already exists"}]});
          }

          //checking re-entered password is same or not
          if(password!==cpassword){
            return res.status(400).json({ errors:[{msg:"Passwords doesn't match"}]});
          }

          //creating user object
          const user=new User({
              username,
              email,
              password
          });

          //hashing the password before saving it in DB
          const salt=await bcrypt.genSalt(10);
          user.password=await bcrypt.hash(password, salt);

          //saving user to DB
          await user.save();

          //creating payload
          const payload={
              user:{
                  id:user.id,
                  name:user.username
              }
          }

          //signing our token
          jwt.sign(payload, "myjwtsecret", {expiresIn:360000}, (error, token)=>{
            if(error) throw error;
            res.json({token});
          })

    } catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
}
);

// @route POST /user/login
// @desc  User login
// @access Public
router.post("/user/login",
[
    check("email", "Plesae enter a valid mail").isEmail(),
    check("password", "Password is required").not().isEmpty()
],
async (req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    const {email, password}=req.body;

    try{
          //see user existed or not
          var checkUser=await User.findOne({ email });
          if(!checkUser){
            return res.status(400).json({errors:[{msg:"No user found with this mail"}]});
          }

          //checking password
          const isMatched=await bcrypt.compare(password, checkUser.password);
          if(!isMatched){
              return res.status(400).json({errors:[{ msg:"Wrong password" }]})
          }

          //creating payload
          const payload={
              user:{
                  id:checkUser.id,
                  name:checkUser.username
              }
          }

          //signing our token
          jwt.sign(payload, "myjwtsecret", {expiresIn:360000}, (error, token)=>{
            if(error) throw error;
            res.json({token});
          })

    } catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
}
);    


module.exports=router;