const mongoose=require("mongoose")
const momment=require("moment")
//posts schema

const postsSchema=new mongoose.Schema({
    postedBy:{
        type:String,
        required:true,
        min:3,
        max:40
    },
    postedAt:{
        type:Number,
        required:true
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
        type:Array,
        reqired:true,
        default:[],
        commentBy:{
            type:String,
            min:2,
            max:40,
            required:true
        },
        commentedAt:{
            type:Date,
            required:true,
            default:new Date().toUTCString(),
        },
        body:{
            type:String,
            required:true
        },
        likes:{
            type:Number,
            default:0,
            required:true
        }
        // type:[String],
        // required:true,
        // default:0
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
