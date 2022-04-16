const mongoose=require("mongoose")
const moment=require("moment")
//posts schema

const postsSchema=new mongoose.Schema({
    postedBy:{
        type:String,
        required:true,
        min:3,
        max:40
    },
    postedAt:{
        type:Date,
        required:true,
        default:moment().format('Do MMMM , h:mm a')
    },
    text:{
        type:String,
        required:false
    },
    media:{
        type:String,
        required:false
    },
    comments:{
        type:[String],
        required:true,
        default:[]
    },
    retweets:{
        type:Number,
        default:0,
        required:true
    },
    saved:{
        type:Number,
        default:0,
        required:true
    }
})

//posts schema

//exporting posts schema

module.exports.postsSchema=mongoose.model("post",postsSchema);
