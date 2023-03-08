const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(MONGODB_URI,{
             useNewUrlParser: true,
             useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${connect.connection.host}`);
    }
    catch(error){
         console.log(`Error: ${error.message}`);
         process.exit();
    }
};

module.exports = connectDB;