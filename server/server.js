const express = require('express');
const dotenv=require('dotenv');

const dummyData= require('./DummyData');

const cors=require('cors');

const app = express();
dotenv.config();

const PORT_NUMBER = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get('/',(req,res)=>{
    res.send('API IS RUNNING');
});

app.get('/app/chat',(req,res)=>{
   res.json(dummyData);
});

app.get('/app/chat/:id',(req,res)=>{
   const {id} = req.params;
   res.send(`the id was ${id}`); 
});

app.listen(PORT_NUMBER,()=>{
    console.log(`server running on ${PORT_NUMBER}...`);
});