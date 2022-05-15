const {usersSchema}=require("../../model/users.schema")
const jwt=require("jsonwebtoken")
//email verification 
const verifyEmail=async(req,res)=>{
    try{
        const id=req.params.id;
        const user=await usersSchema.findOne({_id:id})
        if(!user){
            res.json({
                status:400,
                updated:false,
                message:"invalid link!"
            })
        }else{
            await usersSchema.updateOne({ _id: user._id, verified: true });
            res.json({
                status:200,
                updated:true,
                message:"email verification successfull!"
            })
        }
    }catch(err){
        res.status(404).send(err.message)
    }
}
//email verification

// access token verification

let verifyToken=async(req,res)=>{
    try {
        let accessToken=req.params.accessToken
        jwt.verify(accessToken,process.env.ACCESS_KEY_SECRET,(err,account)=>{
            if (err) {
             return res.json({
                    status:403,
                    authorized:false,
                    message:"invalid access token"
                })
            } else {
                res.json({
                    status:200,
                    authorized:true,
                    user:account
                })
            }
        })
    } catch (error) {
        return console.error(error)
    }
}

// access token verification


module.exports.verifyEmail=verifyEmail;
module.exports.verifyToken=verifyToken;