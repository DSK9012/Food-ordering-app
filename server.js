const express=require("express");
const mongoose=require("mongoose");

const fooditems=require("./routes/fooditems");
const user=require("./routes/user");
const cart=require("./routes/cart");

const app=express();

//intializing express middleware
app.use(express.json({extended:false}));

//Routes
app.use(fooditems);
app.use(user);
app.use(cart);



//Connecting to our MongoDB using mongoose
const connectDB= async ()=>{
        try{
            const mongoPort="mongodb://localhost:27017/foodStore";
            await mongoose.connect(mongoPort, {useUnifiedTopology:true,  useNewUrlParser: true, useCreateIndex:true} );
            console.log(`You are connected to ${mongoPort} Database`);    
        } catch(error) {
            console.error(error.message);
            //Exit from process
            process.exit(1); 
        }
    }
connectDB();


//Running our Food App server
const serverPort=5000;
app.listen(serverPort,()=>{console.log(`Your food app server is running at port ${serverPort}`)});