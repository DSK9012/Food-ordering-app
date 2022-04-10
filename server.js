const express=require("express");
const path = require('path');
const fooditems=require("./routes/fooditems");
const user=require("./routes/user");
const cart=require("./routes/cart");
const comments=require("./routes/comments");
const connectDB = require("./config/db");

const app=express();
const cors = require('cors');

// connect to DB
connectDB();

app.use(cors());

//intializing express middleware
app.use(express.json({extended:false}));

//Routes
app.use(fooditems);
app.use(user);
app.use(cart);
app.use(comments);

// Serve static assets in production
if(process.env.NODE_ENV==='production'){
    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Running our Food App server
const serverPort=process.env.PORT || 5001;
app.listen(serverPort, ()=>{console.log(`Your food app server is running at port ${serverPort}`)});