const {usersSchema}=require("../../model/users.schema")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const login=async(req, res)=>{
    try{
        const {email,password} = req.body;
        const user=await usersSchema.findOne({email: email})
        if(!user){

            res.json({
                status:404,
                isFound:false,
                message:"user not found"
            })
        }else{
          bcrypt.compare(password,user.password,async(error,result)=>{
                if(error){
                    console.log(error);
                }else{
                    if(result){
                        let userToSign={
                            userName:user.userName,
                            email:email
                        }
                        const accessToken=jwt.sign(userToSign,process.env.ACCESS_KEY_SECRET)
                        res.json({
                            status:200,
                            loggedIn:true,
                            accessToken:accessToken
                        })
                    }else{
                        res.json({
                            status:404,
                            passwordMatch:false,
                            message:"incorrect password"
                        })
                    }
                }
           })
            
        }  
    }catch(err){
        console.log(err);
    }
}

module.exports.login=login;