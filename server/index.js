
//libraries and modules
const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');

//use
app.use(cors());
// app.use(bodyParser(urlencoded=true))

//use

const port=7070
app.listen(port,()=>{
    console.log('listening on port '+ port);
})
