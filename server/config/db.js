const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        mongoose.connect(process.env.MONGODB_URI);
        console.log("mongoDB connect Successfully!😁");
    }catch(error){
        console.error("Problem connecting to mongoDB", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;