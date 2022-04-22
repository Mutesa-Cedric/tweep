const express=require("express")
const router=express.Router()
const {register}=require("../controllers/authControllers/Signup.controller")
const {verifyEmail}=require("../controllers/authControllers/Verification.controller")
const {login}=require("../controllers/authControllers/Login.controller") 
const {getAllPosts,getPostsByUsername,updatePost,deletePost,newPost,getPostById}=require("../controllers/postControllers/posts.controllers")
// const {upload,storage}=require("../controllers/uploadControllers/postUploads.controllers")
const {uploadMedia}=require("../controllers/uploadControllers/postUploads.controllers")
//establishing routes

//get routes
router.get("/auth/verify/:id",verifyEmail);
router.get("/posts",getAllPosts);
router.get("/posts/:userName",getPostsByUsername)
router.get("/posts/byid/:id",getPostById)


//get routes

//post routes
router.post("/register",register)
router.post("/login",login) 
router.post("/posts/newPost",uploadMedia,newPost)


//post routes


//update routes

router.patch("/posts/:id",updatePost)




//update routes

//delete routes
router.delete("/posts/:id",deletePost)






//delete routes


//establishing routes


//exporting router

module.exports.Router=router;
