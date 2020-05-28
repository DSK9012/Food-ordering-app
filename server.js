const express=require("express");

const fooditems=require("./routes/fooditems");
const user=require("./routes/user");
const cart=require("./routes/cart");
const comments=require("./routes/comments");
const connectDB = require("./config/db");

const app=express();

// connect to DB
connectDB();

//intializing express middleware
app.use(express.json({extended:false}));

//Routes
app.use(fooditems);
app.use(user);
app.use(cart);
app.use(comments);



//Running our Food App server
const serverPort=process.env.PORT || 5000;
app.listen(serverPort, ()=>{console.log(`Your food app server is running at port ${serverPort}`)});