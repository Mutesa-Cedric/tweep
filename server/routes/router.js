const express=require("express")
const router=express.Router()
const {register}=require("../controllers/authControllers/Signup.controller")
const {verifyEmail,verifyToken,resendEmailVerificationCode}=require("../controllers/authControllers/Verification.controller")
const {login}=require("../controllers/authControllers/Login.controller") 
const {getAllPosts,getSavedTweeps,newPostWithoutImage,getMostRetweepedPosts,getMostCommentedPosts,getTopPosts,getPostsByUsername,updateLikesOfComment,updatePost,updateSaved,deletePost,newPost,getPostById,updateLikes,updateComments,updateRetweeps}=require("../controllers/postControllers/posts.controllers")
const {uploadMedia}=require("../controllers/uploadControllers/postUploads.controllers");
const {newProfile,updateProfile,getMostFollowedUsers,updateProfileWithCover,updateProfileWithProfileImage,getAllProfiles,getProfileByUsername,getProfileById,updateFollowers}=require("../controllers/profileControllers/profile.controller")
const {uploadCover}=require("../controllers/uploadControllers/coverUploads")
const {uploadProfile}=require("../controllers/uploadControllers/profileUploads.controllers")
//establishing routes

//get routes
router.get("/auth/verify/:id",verifyEmail);
router.get("/posts",getAllPosts);
router.get("/posts/:userName",getPostsByUsername)
router.get("/posts/byid/:id",getPostById)
router.get("/posts/getSavedTweeps/:userName",getSavedTweeps)
router.get("/profiles",getAllProfiles)
router.get("/profiles/:userName",getProfileByUsername);
router.get("/profiles/byid/:id",getProfileById);
router.get("/auth/verifyToken/:accessToken",verifyToken);
router.get("/getTopPosts",getTopPosts)
router.get('/getLatestPosts',getAllPosts)
router.get('/mostRetweepedPosts',getMostRetweepedPosts)
router.get('/mostCommentedPosts',getMostCommentedPosts)
router.get("/getMostFollowedUsers/:userName",getMostFollowedUsers);

//get routes

//post routes
router.post("/register",newProfile,register)
router.post("/login",login) 
router.post("/posts/newPost",uploadMedia,newPost)
router.post("/profiles/cover/:userName",uploadCover,updateProfileWithCover)
router.post("/profiles/profileImg/:userName",uploadProfile,updateProfileWithProfileImage);
router.post('/posts/newPostWithoutImage',newPostWithoutImage);
router.post('/verification/verifyEmail',verifyEmail);
router.post("/verification/resendCode",resendEmailVerificationCode)
//post routes

//update routes

router.patch("/posts/:id",updatePost)
router.patch("/profiles/updateProfile/:userName",updateProfile)
router.patch("/posts/updateComments/:id",updateComments)
router.patch("/posts/updateRetweeps/:id",updateRetweeps);
router.patch("/posts/updateLikes/:id",updateLikes);
router.patch('/posts/updateSaved/:id',updateSaved);
router.patch("/posts/updateComments/:postId/updateLikes/:commentedAt",updateLikesOfComment);
router.patch('/profiles/updateFollowers/',updateFollowers)
//update routes

//delete routes
router.delete("/posts/:id",deletePost)




//delete routes


//establishing routes


//exporting router

module.exports.Router=router;
