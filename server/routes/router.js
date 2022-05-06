const express=require("express")
const router=express.Router()
const {register}=require("../controllers/authControllers/Signup.controller")
const {verifyEmail,verifyToken}=require("../controllers/authControllers/Verification.controller")
const {login}=require("../controllers/authControllers/Login.controller") 
const {getAllPosts,getPostsByUsername,updateLikesOfComment,updatePost,updateSaved,deletePost,newPost,getPostById,updateLikes,updateComments,updateRetweeps}=require("../controllers/postControllers/posts.controllers")
const {uploadMedia}=require("../controllers/uploadControllers/postUploads.controllers");
const {newProfile,updateProfile,updateProfileWithCover,updateProfileWithProfileImage,getAllProfiles,getProfileByUsername,getProfileById}=require("../controllers/profileControllers/profile.controller")
const {uploadCover}=require("../controllers/uploadControllers/coverUploads")
const {uploadProfile}=require("../controllers/uploadControllers/profileUploads.controllers")
//establishing routes

//get routes
router.get("/auth/verify/:id",verifyEmail);
router.get("/posts",getAllPosts);
router.get("/posts/:userName",getPostsByUsername)
router.get("/posts/byid/:id",getPostById)
router.get("/profiles",getAllProfiles)
router.get("/profiles/:userName",getProfileByUsername);
router.get("/profiles/byid/:id",getProfileById);
router.get("/auth/verifyToken/:accessToken",verifyToken);
//get routes

//post routes
router.post("/register",newProfile,register)
router.post("/login",login) 
router.post("/posts/newPost",uploadMedia,newPost)
router.post("/profiles/cover/:userName",uploadCover,updateProfileWithCover)
router.post("/profiles/profileImg/:userName",uploadProfile,updateProfileWithProfileImage);
//post routes


//update routes

router.patch("/posts/:id",updatePost)
router.patch("/profiles/updateProfile/:userName",updateProfile)
router.patch("/posts/updateComments/:id",updateComments)
router.patch("/posts/updateRetweeps/:id",updateRetweeps);
router.patch("/posts/updateLikes/:id",updateLikes);
router.patch('/posts/updateSaved/:id',updateSaved);
router.patch("/posts/updateComments/:postId/updateLikes/:commentedAt",updateLikesOfComment);
//update routes

//delete routes
router.delete("/posts/:id",deletePost)




//delete routes


//establishing routes


//exporting router

module.exports.Router=router;
