const jwt=require("jsonwebtoken")

//creating new access token

const newToken=(user)=>{
    jwt.sign(user,process.env.ACCESS_KEY_SECRET,(err,myUser)=>{
        if(err){
            console.log(err)
        }else{
            return myUser
        }
    })
}

module.exports.newToken=newToken;