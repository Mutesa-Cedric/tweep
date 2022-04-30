
//libraries and modules
const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser = require('body-parser');
require("dotenv").config()
const mongoose=require("mongoose")
const {Router}=require("./routes/router")
const exphbs=require("express-handlebars")
const path=require("path")
//libraries and modules

//use
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use("/",Router)
app.use(express.static(path.join(__dirname, "./uploads/posts")));
app.use(express.static(path.join(__dirname, "./uploads/profiles")))
app.use(express.static(path.join(__dirname, "./uploads/covers")))

//use

//database connection
const databaseUrl=process.env.DATABASE_URL
mongoose.connect(databaseUrl,(err)=>{
    if(err){    
        console.log(err)
    }else{
        console.log("database connection established")
    }
})
//database connection


const port=process.env.PORT

app.listen(port,()=>{
    console.log('listening on port '+ port);
})
