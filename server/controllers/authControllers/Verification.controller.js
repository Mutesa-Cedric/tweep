const {usersSchema}=require("../../model/users.schema")
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

module.exports.verifyEmail=verifyEmail;