const mongoose=require("mongoose")
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
        type:[Object],
        required:true,
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
            type:[String],
            default:[],
            required:true
        }
    },
    retweeps:{
        type:[String],
        default:[],
        required:true
    },
    saved:{
        type:[String],
        default:[],
        required:true
    },
    likes:{
        type:[String],
        default:[],
        required:true
    }
})

//posts schema

//exporting posts schema

module.exports.postsSchema=mongoose.model("post",postsSchema);
