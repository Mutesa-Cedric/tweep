const {profileSchema}=require("../../model/userProfile.schema")

//new profile

const newProfile=async(req,res,next) => {
    try {
        const {userName} = req.body;

        const existingProfile=profileSchema.find({userName: userName},async(err,profile) =>{
            if(err) return next(err)
            else{
                if(profile.length === 0){
                    let profile=new profileSchema({
                        userName: userName
                    })
               
                    await profile.save((err,profile) => {
                        if (err) {
                            return console.error(err)
                        } else {
                            console.log(profile)
                            next()
                        }
                    });
                }else{
                    res.json({
                        status:400,
                        isCreated:false,
                        message:"the profile has already been created"
                    })
                }
            }
        })       
    } catch (error) {
        return console.error(error)
    }
}

//new profile

// getting all profiles

const getAllProfiles= async(req,res)=>{
    try {
        await profileSchema.find((err,profiles)=>{
            if (err) {
                return console.error(err)
            } else {
                if(profiles.length===0){
                    res.json({
                        status:400,
                        success:false,
                        message:"no profiles found!"
                    })
                }else{
                    res.json({
                        status:200,
                        success:true,
                        numberOfProfiles:profiles.length,
                        profiles:profiles
                    })
                }
            }
        })
    } catch (error) {
        return console.error(error)
    }
}


// getting all profiles

// getting a profile by username

const getProfileByUsername =async(req,res) => {
    try {
        let userName=req.params.userName
        await profileSchema.findOne({userName:userName},(err,profile) => {
            if (err) {
                return console.error(err)
            } else if(!profile) {
                res.json({
                    status:404,
                    isFound:false,
                    message:"profile not found"
                })   
            }else{
                res.json({
                    status:200,
                    isFound:true,
                    profile:profile
                })
            }
        }) 
    } catch (error) {
        return console.error(error)
    }
    
}


// getting a profile by username


// getting profile by id
const getProfileById = async(req,res)=>{

    try {
        const id=req.params.id;
        await profileSchema.findById(id,(err,profile)=>{
            if(err){
                return res.json({
                    status:404,
                    message:"invalid id"
                })
            }else if(!profile){
                res.json({
                    status:200,
                    isFound:false,
                    message:"profile not found"
                })
            }else{
                res.json({
                    status:200,
                    isFound:true,
                    profile:profile
                })
            }
        });
        
    } catch (error) {
        return console.error(error)
    }
}

// getting profile by id


// updating a profile

const updateProfile= async(req,res)=>{
    try {
        const userName=req.params.userName
        const updates=req.body;
        await  profileSchema.findOneAndUpdate({userName: userName},updates,{new:true},(err,updatedProfile)=>{
            if (err) {
                return console.error(err)
            } else {
                res.json({
                    updatedProfile: updatedProfile
                })
            }
        })
    } catch (error) {
        return console.error(error)   
    }
    
}
// updating a profile


// update profile with coverpic

const updateProfileWithCover=async(req,res)=>{
    try {
        const userName=req.params.userName;
        const coverImage=req.file.filename;
        await profileSchema.findOneAndUpdate({userName: userName},{coverImage: coverImage},{new:true},(err,profile)=>{
        if(err){
            return console.error(err)
        }else{
            res.json({
                status:200,
                updated:true,
                newProfile:profile
            })
        }
      })
    } catch (error) {
        return console.error(error)
    }
    
}

// update profile with coverpic

// update profile with profile image

const updateProfileWithProfileImage =async(req,res)=>{
    try {
        const userName = req.params.userName;
        profileImage =req.file.filename;

        await profileSchema.findOneAndUpdate({userName:userName},{profileImage:profileImage},{new:true},(err,profile)=>{
            if (err) {
                return console.error(err)
            } else {
                res.json({
                    status:201,
                    updated:true,
                    newProfile:profile
                })
            }
        })
    } catch (error) {
        return console.error(error)
    }
}

// update profile with profile image


module.exports.newProfile = newProfile;
module.exports.getAllProfiles=getAllProfiles;
module.exports.updateProfile = updateProfile;
module.exports.getProfileByUsername=getProfileByUsername;
module.exports.getProfileById=getProfileById;
module.exports.updateProfileWithCover=updateProfileWithCover;
module.exports.updateProfileWithProfileImage=updateProfileWithProfileImage;