const {postsSchema}=require('../../model/posts.schema')
//new post
const newPost=async(req,res)=>{
    try {
        const {postedBy,text}=req.body;
        const postedAt=req.time
        const post=new postsSchema({
            postedBy:postedBy,
            text:text,
            postedAt:postedAt,
            media:req.file.filename
            // media:req.file
        })
        await post.save((err,post)=>{
            if(err){
               return res.json({
                    status:500,
                    success:false,
                    message:"post not saved!"
                })
            }else{
                res.json({
                    status:201,
                    saved:true,
                    post:post,
                    message:"post saved successfully"
                })
            }
        })
    } catch (error) {
        return console.error(error)
    } 
}
//new post

//getting all posts

const getAllPosts = async(req,res)=>{
    try {
        await postsSchema.find((err,posts)=>{
            if(err){
                throw err
            }else{
                if(posts.length===0){
                    res.json({
                        status:404,
                        areFound:false,
                        message:"no posts found!"
                    })
                }else{
                    res.json({
                        status:200,
                        success:true,
                        numberOfPosts:posts.length,
                        posts:posts
                    })
                }
               
            }
        })
    } catch (error) {
        return console.error(error)
    }
}

//getting all posts

//getting posts by username

const getPostsByUsername = async(req,res)=>{
    try {
        let userName=req.params.userName;
        await postsSchema.find({postedBy:userName},(err,posts)=>{
            if (err) {
                return console.error(err)
            } else {
                if(posts.length===0){
                    res.json({
                        status:404,
                        areFound:false,
                        message:"no posts found!"
                    })
                }else{
                res.json({
                    status:200,
                    success:true,
                    numberOfPosts:posts.length,
                    posts:posts
                })
            }
        }
        })
    } catch (error) {
        return  console.error(error)   
    }
     let userName=req.params.userName
}

//getting posts by username

//getting a post by _id
let getPostById = async(req,res)=>{
    try {
        let id=req.params.id;
        await postsSchema.findById(id,(err,post)=>{
            if(err){
                res.json({
                    status:404,
                    success:false,
                    message:"post not found!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    post:post
                })
            }
        })
    } catch (error) {
        return console.error(error)
    }
}

//getting a post by _id

//updating a post

const updatePost = async(req,res)=>{
    try {
        let postId=req.params.id;
        let updates=req.body;
        await postsSchema.findByIdAndUpdate(postId,updates,{new:true},(err,post)=>{
            if (err) {
                res.json({
                    status: 404,
                    success:false,
                    message:"post not found!"
                })
            } else {
                res.json({
                    status:204,
                    updated:true,
                    updatedPost:post
                })
            }
        })
        
    } catch (error) {
        return console.error(error)
    }
}


//updating a post

// updateting post comments

const updateComments=async(req,res) => {
    try {
        let postId = req.params.id
        let {comments}=req.body
            if(await postsSchema.updateOne({_id: postId}, {$push: {comments:comments}})){
                res.json({
                    status:203,
                    message:"updated!"
                })
                }    
        } catch (error) {
            res.json({
                message:error
            })
        }
}

// updateting post comments



//deleting a post

const deletePost= async(req,res)=>{
    try {
        let id=req.params.id;
        await postsSchema.findByIdAndDelete(id,(err,data)=>{
        if(err){
            res.json({
                status:400,
                success:false,
                message:"post not found!"
            })
        }else{
            res.json({
                status:200,
                deleted:true,
                deletedPost:data
            })
        }
        })
    } catch (error) {
        return console.error(error)
    }
}

//deleting a post
module.exports.getPostById=getPostById;
module.exports.newPost=newPost;
module.exports.getAllPosts=getAllPosts;
module.exports.getPostsByUsername=getPostsByUsername;
module.exports.updatePost=updatePost;
module.exports.deletePost=deletePost;
module.exports.updateComments=updateComments;