const { profileSchema } = require("../../model/userProfile.schema")
const { cloudinary } = require("../../utils/cloudinary")
//new profile

const newProfile = async (req, res, next) => {
    try {
        const { userName } = req.body;

        const existingProfile = profileSchema.find({ userName: userName }, async (err, profile) => {
            if (err) return next(err)
            else {
                if (profile.length === 0) {
                    let profile = new profileSchema({
                        userName: userName
                    })

                    await profile.save((err, profile) => {
                        if (err) {
                            return console.error(err)
                        } else {
                            // console.log(profile)
                            next()
                        }
                    });
                } else {
                    res.json({
                        status: 400,
                        isCreated: false,
                        message: "the profile has already been created"
                    })
                }
            }
        })
    } catch (error) {

    }
}

//new profile

// getting all profiles

const getAllProfiles = async (req, res) => {
    try {
        await profileSchema.find((err, profiles) => {
            if (err) {
                return console.error(err)
            } else {
                if (profiles.length === 0) {
                    res.json({
                        status: 400,
                        success: false,
                        message: "no profiles found!"
                    })
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        numberOfProfiles: profiles.length,
                        profiles: profiles
                    })
                }
            }
        })
    } catch (error) {

    }
}


// getting all profiles

// getting a profile by username

const getProfileByUsername = async (req, res) => {
    try {
        let userName = req.params.userName
        await profileSchema.findOne({ userName: userName }, (err, profile) => {
            if (err) {
                return console.error(err)
            } else if (!profile) {
                res.json({
                    status: 404,
                    isFound: false,
                    message: "profile not found"
                })
            } else {
                res.json({
                    status: 200,
                    isFound: true,
                    profile: profile
                })
            }
        })
    } catch (error) {

    }

}


// getting a profile by username


// getting profile by id
const getProfileById = async (req, res) => {

    try {
        const id = req.params.id;
        await profileSchema.findById(id, (err, profile) => {
            if (err) {
                return res.json({
                    status: 404,
                    message: "invalid id"
                })
            } else if (!profile) {
                res.json({
                    status: 200,
                    isFound: false,
                    message: "profile not found"
                })
            } else {
                res.json({
                    status: 200,
                    isFound: true,
                    profile: profile
                })
            }
        });

    } catch (error) {

    }
}

// getting profile by id


// updating a profile

const updateProfile = async (req, res) => {
    try {
        const userName = req.params.userName
        const updates = req.body;
        await profileSchema.findOneAndUpdate({ userName: userName }, updates, { new: true }, (err, updatedProfile) => {
            if (err) {
                return console.error(err)
            } else {
                res.json({
                    updatedProfile: updatedProfile
                })
            }
        })
    } catch (error) {

    }

}
// updating a profile


// update profile with coverpic

const updateProfileWithCover = async (req, res) => {
    try {
        const userName = req.params.userName;
        const { coverString } = req.body;
        // console.log(coverString)
        let result = await cloudinary.uploader.upload(coverString, {
            upload_preset: "tweep_covers"
        })

        let coverImage = result.secure_url

        coverImage ?
            await profileSchema.findOneAndUpdate({ userName: userName }, { coverImage: coverImage }, { new: true }, (err, profile) => {
                if (err) {
                    return console.error(err)
                } else {
                    res.json({
                        status: 200,
                        updated: true,
                        newProfile: profile
                    })
                }
            }) : res.status(500).json({
                success:false,
                message:"failed to upload cover image"
            })
            
    } catch (error) {

    }

}

// update profile with coverpic

// update profile with profile image

const updateProfileWithProfileImage = async (req, res) => {
    try {
        const userName = req.params.userName;
        const { profileString } = req.body;
        let result = await cloudinary.uploader.upload(profileString, {
            upload_preset: 'tweep_profiles'
        })

        const profileImage = result.secure_url;
        profileImage ?
            profileSchema.findOneAndUpdate({ userName: userName }, { profileImage: profileImage }, { new: true }, (err, profile) => {
                if (err) {
                    return console.error(err)
                } else {
                    res.json({
                        status: 201,
                        updated: true,
                        newProfile: profile
                    })
                }
            }) : res.status(500).json({
                success: false,
                message: "failed to upload an image"
            })
    } catch (error) {
        return console.error(error)
    }
}

// update profile with profile image

//updating followers

const updateFollowers = (req, res) => {
    try {
        //follower is the one who is going to follow another
        //while following is the one who is going to be followed
        let { follower, following } = req.body;

        profileSchema.findOne({ userName: following }, (err, followingProfile) => {
            if (err) {
                res.json({
                    status: 404,
                    message: "profile not found"
                })
            } else {
                let followers = followingProfile.followers;
                if (followers.includes(follower)) {
                    let followerIndex = followers.indexOf(follower);
                    followers.splice(followerIndex, 1);
                    profileSchema.updateOne({ userName: following }, { $set: { followers: followers } }, (err, updatedPost) => {
                        if (err) {
                            res.json({
                                status: 404,
                                updated: false,
                                message: err
                            })
                        } else {
                            //here, the follower is removed from the followers array of the following profile
                            //the next step is to remove the following profile from the followers array of the follower
                            profileSchema.findOne({ userName: follower }, (err, followerProfile) => {
                                if (err) {
                                    res.json({
                                        message: "no profile found"
                                    })
                                } else {
                                    let followingArray = followerProfile.following;
                                    let followingIndex = following.indexOf(following);
                                    followingArray.splice(followingIndex, 1)
                                    profileSchema.updateOne({ userName: follower }, { $set: { following: followingArray } }, (err, updatedPost) => {
                                        if (err) {
                                            res.json({
                                                status: 404,
                                                message: "profile not updated successfully"
                                            })
                                        } else {
                                            res.json({
                                                status: 201,
                                                updated: true,
                                                message: "both follower and following were removed successfully!"
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    profileSchema.updateOne({ userName: following }, { $push: { followers: follower } }, (err, profile) => {
                        if (err) {
                            res.json({
                                status: 404,
                                updated: false,
                                message: "profile not found"
                            })
                        } else {
                            profileSchema.updateOne({ userName: follower }, { $push: { following: following } }, (err, followersProfile) => {
                                if (err) {
                                    res.json({
                                        status: 404,
                                        updated: false,
                                        message: "profile not found"
                                    })
                                } else {

                                    res.json({

                                        status: 200,
                                        updated: true,
                                        message: "both profiles were updated successfully",
                                        followersProfile: followersProfile,
                                        followingProfile: profile
                                    })
                                }
                            })
                        }
                    });
                }
            }
        })
    } catch (e) {
        // console.log(err)
    }
}

//updating followers

//getting two most followed users
const getMostFollowedUsers = async (req, res) => {
    try {
        let userName = req.params.userName;

        await profileSchema.find((err, profiles) => {
            if (err) {
                return console.error(err)
            } else {
                if (profiles.length === 0) {
                    res.json({
                        status: 400,
                        success: false,
                        message: "no profiles found!"
                    })
                } else {
                    let twoProfilesToFollow = [];
                    profiles.map(profile => {
                        if (!profile.followers.includes(userName) && profile.userName !== userName) {
                            twoProfilesToFollow.push(profile)
                        }
                    })

                    let sortedProfilesToFollow = twoProfilesToFollow.sort((a, b) => {
                        return b.followers.length - a.followers.length
                    }).slice(0, 2)

                    res.json({
                        status: 200,
                        success: true,
                        numberOfProfiles: sortedProfilesToFollow.length,
                        profiles: sortedProfilesToFollow
                    })
                }
            }
        })
    } catch (err) { }

}

//getting two most followed users



module.exports.newProfile = newProfile;
module.exports.getAllProfiles = getAllProfiles;
module.exports.updateProfile = updateProfile;
module.exports.getProfileByUsername = getProfileByUsername;
module.exports.getProfileById = getProfileById;
module.exports.updateProfileWithCover = updateProfileWithCover;
module.exports.updateProfileWithProfileImage = updateProfileWithProfileImage;
module.exports.updateFollowers = updateFollowers
module.exports.getMostFollowedUsers = getMostFollowedUsers;