const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
console.log(db);
//Connecting to our MongoDB using mongoose
const connectDB = async () => {
    try {
       
        // const mongoPort="mongodb://localhost:27017/foodStore";
        await mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
        console.log(`You are connected to Database`);
    } catch (error) {
         
        console.error(error.message);
        //Exit from process
        process.exit(1);
    }
}

module.exports = connectDB;