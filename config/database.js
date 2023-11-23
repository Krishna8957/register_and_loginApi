
// third step mongodb connect karna 
const mongoose = require("mongoose");

const connectDB = async () => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/registerDB");
        console.log("DB conneting successful");
    } catch (error) {
        console.error("DB conneting faild");
    }
}


module.exports = connectDB;