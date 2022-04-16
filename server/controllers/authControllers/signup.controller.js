const {usersSchema}=require("../../model/users.schema")
const {sendEmail}=require("../../utils/nodeMailer.js")
// const {newToken}=require("../../utils/jwt")
// const {hashPassword}=require("../../utils/bcrypt");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const saltRounds=10
//register function

const register=async(req,res)=>{

    try{
        const {userName,email,password}=req.body;

        //checking if username is teaken
        const existingUser= await usersSchema.findOne({email:email});
        if(existingUser){
            res.json({
                status:400,
                userExist:true,
                message:"user with a given email already exists"
            })
        }else{

            
            bcrypt.hash(password,saltRounds,async(err,hash)=>{
                if(err){
                    throw err;
                }else{

                    const user=new usersSchema({
                        userName:userName,
                        email:email,
                        password:hash
                     })

                 await user.save()

                 let userToSign={
                     userName:userName,
                     email:email
                 }
                 const accessToken=jwt.sign(userToSign,process.env.ACCESS_KEY_SECRET)

                 console.log(accessToken)
                 if(user){
                    let message=`${process.env.VERIFY_URL}/${user._id}`
                    sendEmail(email,"verify your account",message)
                    res.json({
                        status:201,
                        success:true,
                        message:"user created successfully!"
                    })
                 }

                }
            })
        }
    }catch(err){
        console.log(err)
    }
  
}

//register function

module.exports.register=register;