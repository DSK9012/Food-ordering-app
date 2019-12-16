const express=require("express");
const mongoose=require("mongoose");

//Getting all routes related to fooditems collection
const fooditems=require("./routes/fooditems");

const app=express();

app.use(fooditems);

//Connecting to our MongoDB using mongoose
const connectDB= async ()=>{
        try{
            const mongoPort="mongodb://localhost:27017/foodStore";
            await mongoose.connect(mongoPort, {useUnifiedTopology:true,  useNewUrlParser: true} );
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