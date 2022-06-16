const express = require('express');
const dotenv=require('dotenv');

const connectDB = require('./config/db');
const dummyData = require('./DummyData');
const userRouter = require('./routes/userRoutes');

const cors=require('cors');

const app = express();
app.use(express.json());

dotenv.config();


const PORT_NUMBER = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get('/',(req,res)=>{
    res.send('API IS RUNNING');
});

app.use('/user',userRouter);

app.listen(PORT_NUMBER,()=>{
    connectDB(); 
    console.log(`server running on ${PORT_NUMBER}...`);
});