const mongoose=require("mongoose")
//users schema
const usersSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    }
})

//users schema

//exporting user schema
module.exports.usersSchema=mongoose.model("user",usersSchema)
