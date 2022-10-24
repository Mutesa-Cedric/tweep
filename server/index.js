
//libraries and modules
const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser = require('body-parser');
require("dotenv").config()
const mongoose=require("mongoose")
const {Router}=require("./routes/router")
const path=require("path")
//libraries and modules

//use
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());
app.use("/",Router)
//use

//database connection
const databaseUrl=process.env.DATABASE_URL
mongoose.connect(databaseUrl,(err)=>{
    err?console.log(err):console.log("database connection established!")
})
//database connection


const port=process.env.PORT||7000

app.listen(port,()=>{
    console.log('listening on port '+ port);
})
