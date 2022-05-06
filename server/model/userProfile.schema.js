const mongoose=require("mongoose")

//profile schema
const profileSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:40
    },
    bio:{
        type:String,
        required:false,
        min:2,
        max:120
    },
    location:{
        type:String,
        required:false,
        min:2,
        max:80
    },
    profileImage:{
        type:String,
        min:2,
        max:60,
        required:false
    },
    coverImage:{
        type:String,
        min:2,
        max:60,
        required:false
    },
    followers:{
        type:[String],
        required:true,
        default:[]
    },
    following:{
        type:[String],
        required:true,
        default:[]
    }
})

//profile schema

//exporting profile schema

module.exports.profileSchema=mongoose.model("profile",profileSchema)