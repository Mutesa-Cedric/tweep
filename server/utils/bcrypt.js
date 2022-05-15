const bcrypt=require("bcrypt");

//function to hash a password
const hashPassword=(password,saltRounds)=>{
    bcrypt.hash(password,saltRounds,async(err,hash)=>{
        if(err){
            console.log(err)
        }else{
            return hash
        }
    })

}

module.exports.hashPassword=hashPassword;