const express=require("express")
const router=express.Router()
const {register}=require("../controllers/authControllers/Signup.controller")
const {verifyEmail}=require("../controllers/authControllers/Verification.controller")
const {login}=require("../controllers/authControllers/Login.controller") 
//establishing routes

//get routes
router.get("/auth/verify/:id",verifyEmail);





//get routes

//post routes
router.post("/register",register)
router.post("/login",login) 



//post routes


//update routes






//update routes

//delete routes







//delete routes


//establishing routes


//exporting router

module.exports.Router=router;
