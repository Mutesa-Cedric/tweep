const { postsSchema } = require('../../model/posts.schema')
const { indexOf } = require("lodash/array");
const { cloudinary } = require('../../utils/cloudinary')
//new post
const newPost = async (req, res) => {
    try {
        console.log(req.body)
        const { postedBy, text, media } = req.body;
        const postedAt = req.body.postedAt
        await cloudinary.uploader.upload(media, {
            upload_preset: "tweep_posts"
        }, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                // console.log(result)
                const post = new postsSchema({
                    postedBy: postedBy,
                    text: text,
                    postedAt: postedAt,
                    media: result.secure_url
                })
                post.save((err, post) => {
                    if (err) {
                        return res.json({
                            status: 500,
                            success: false,
                            message: "post not saved!"
                        })
                    } else {
                        res.json({
                            status: 201,
                            saved: true,
                            post: post,
                            message: "post saved successfully"
                        })
                    }
                })
            }
        })

    } catch (error) {
        return console.error(error)
    }
}
//new post

//new post without image

const newPostWithoutImage = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
        const postedAt = req.body.postedAt

        const post = new postsSchema({
            postedBy: postedBy,
            text: text,
            postedAt: postedAt,
        })
        await post.save((err, post) => {
            if (err) {
                return res.json({
                    status: 500,
                    success: false,
                    message: "post not saved!"
                })
            } else {
                res.json({
                    status: 201,
                    saved: true,
                    post: post,
                    message: "post saved successfully"
                })
            }
        })
    } catch (error) {
        return console.error(error)
    }
}
//new post without image

//getting all posts

const getAllPosts = async (req, res) => {
    try {
        await postsSchema.find((err, posts) => {
            if (err) {
                throw err
            } else {
                if (posts.length === 0) {
                    res.json({
                        status: 404,
                        areFound: false,
                        message: "no posts found!"
                    })
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        numberOfPosts: posts.length,
                        posts: posts
                    })
                }
            }
        }).sort({ postedAt: -1 })
    } catch (error) {
        // return console.error(error)
    }
}

//getting all posts

//getting a post by _id

let getPostById = async (req, res) => {
    try {
        let id = req.params.id;
        await postsSchema.findById(id, (err, post) => {
            if (err) {
                res.json({
                    status: 404,
                    success: false,
                    message: "post not found!"
                })
            } else {
                res.json({
                    status: 200,
                    success: true,
                    post: post
                })
            }
        })
    } catch (error) {
        return console.error(error)
    }
}

//getting a post by _id

//updating a post

const updatePost = async (req, res) => {
    try {
        let postId = req.params.id;
        let updates = req.body;

        if (!await postsSchema.updateOne({ _id: postId }, updates, (err, post) => {
            if (err) {
                res.json({
                    status: 404,
                    success: false,
                    message: "post not found!"
                })
            } else {
                res.json({
                    status: 204,
                    updated: true,
                    updatedPost: post
                })
            }
        })) {
            res.json({
                status: 404,
                success: false,
                message: "post not found!"
            })
        }

    } catch (error) {
        return console.error(error)
    }
}


//updating a post

// updating post comments

const updateComments = async (req, res) => {
    try {
        let postId = req.params.id
        let { comments } = req.body
        if (await postsSchema.updateOne({ _id: postId }, { $push: { comments: comments } })) {
            res.json({
                status: 203,
                message: "updated!",
                success: true
            })
        }
    } catch (error) {
        res.json({
            message: error
        })
    }
}

// updating post comments


const updateLikesOfComment = (req, res) => {
    let postId = req.params.postId;
    let commentedAt = req.params.commentedAt;
    let like = req.body.like;
    try {
        postsSchema.findOne({ _id: postId }, (err, post) => {
            if (err) {
                res.json({
                    status: 404,
                    updated: false,
                    message: err
                })
            } else {
                if (!post) {
                    res.json({
                        status: 404,
                        updated: false,
                        message: "post not found!"
                    })
                } else {
                    let comments = post.comments;
                    let index = comments.findIndex(comment => comment.commentedAt.toString() === commentedAt);
                    if (index === -1) {
                        res.json({
                            status: 404,
                            updated: false,
                            message: "comment not found!"
                        })
                    } else {

                        if (comments[index].likes.includes(like)) {
                            let likeIndex = comments[index].likes.indexOf(like)
                            comments[index].likes.splice(likeIndex, 1)
                            postsSchema.updateOne({ _id: postId }, { $set: { comments: comments } }, (err, updatedPost) => {
                                if (err) {
                                    res.json({
                                        status: 404,
                                        updated: false,
                                        message: err
                                    })
                                } else {
                                    res.json({
                                        status: 200,
                                        updated: true,
                                        message: "like removed from a comment",
                                        updatedPost: updatedPost
                                    })
                                }
                            })

                        } else {
                            comments[index].likes.push(like);
                            postsSchema.updateOne({ _id: postId }, { $set: { comments: comments } }, (err, updatedPost) => {
                                if (err) {
                                    res.json({
                                        status: 404,
                                        updated: false,
                                        message: err
                                    })
                                } else {
                                    res.json({
                                        status: 200,
                                        updated: true,
                                        message: "like added to a comment",
                                        updatedPost: updatedPost
                                    })
                                }
                            })
                        }
                    }
                }
            }
        })
    } catch (error) {

    }
}

//updating retweeps

const updateRetweeps = async (req, res) => {
    try {
        let postId = req.params.id;
        let { retweep } = req.body;

        await postsSchema.findOne({ _id: postId }, (err, post) => {
            if (err) {
                res.json({
                    status: 404,
                    success: false,
                    message: "post not found!"
                })
            } else {
                if (post.retweeps.includes(retweep)) {
                    let retweepIndex = post.retweeps.indexOf(retweep);
                    post.retweeps.splice(retweepIndex, 1);
                    post.save((err, post) => {
                        if (err) {
                            res.json({
                                status: 404,
                                success: false,
                                message: "post not found!"
                            })
                        } else {
                            res.json({
                                status: 200,
                                success: true,
                                message: "retweet removed!",
                                post: post
                            })
                        }
                    })
                } else {
                    postsSchema.updateOne({ _id: postId }, { $push: { retweeps: retweep } }, (err, post) => {
                        if (err) {
                            return res.json({
                                status: 404,
                                success: false,
                                message: "post not found!"
                            })
                        }
                        res.json({
                            status: 203,
                            message: "updated!",
                            success: true
                        })
                    })
                }
            }
        })
    } catch (error) {
    }
}

//updating retweeps

//updating likes

const updateLikes = async (req, res) => {
    try {

        let postId = req.params.id;
        let { like } = req.body;

        await postsSchema.findOne({ _id: postId }, (err, post) => {
            if (err) {
                res.json({
                    status: 404,
                    success: false,
                    message: "post not found!"
                })
            } else {
                if (post.likes.includes(like)) {
                    let likeIndex = post.likes.indexOf(like);
                    post.likes.splice(likeIndex, 1);

                    post.save((err, post) => {
                        if (err) {
                            res.json({
                                status: 404,
                                success: false,
                                message: "post not found!"
                            })
                        } else {
                            res.json({
                                status: 200,
                                success: true,
                                message: "like removed successfully!",
                                remainingLikes: post.likes.length
                            })
                        }
                    })
                } else {
                    postsSchema.updateOne({ _id: postId }, { $push: { likes: like } }, (err, post) => {
                        if (err) {
                            return res.json({
                                status: 404,
                                success: false,
                                message: "post not found!"
                            })
                        }
                        res.json({
                            status: 203,
                            message: "like added successfully!",
                            success: true
                        })
                    })
                }
            }
        })
    } catch (error) {
    }
}
//updating likes

//update saved
const updateSaved = async (req, res) => {
    try {
        let postId = req.params.id;
        let { save } = req.body;

        await postsSchema.findOne({ _id: postId }, (err, post) => {
            if (err) {
                res.json({
                    status: 404,
                    success: false,
                    message: "post not found!"
                })
            } else {
                if (post.saved.includes(save)) {
                    let saveIndex = post.saved.indexOf(save);
                    post.saved.splice(saveIndex, 1);
                    post.save((err, post) => {
                        if (err) {
                            res.json({
                                status: 404,
                                success: false,
                                message: "post not found!"
                            })
                        } else {
                            res.json({
                                status: 200,
                                success: true,
                                message: "save removed successfully!",
                                remainingSaves: post.saved.length
                            })
                        }
                    })
                } else {
                    postsSchema.updateOne({ _id: postId }, { $push: { saved: save } }, (err, post) => {
                        if (err) {
                            return res.json({
                                status: 404,
                                success: false,
                                message: "post not found!"
                            })
                        }
                        res.json({
                            status: 203,
                            message: "save added successfully!",
                            success: true
                        })
                    })
                }
            }

        })

    } catch (error) {
    }
}
//update saved

//deleting a post

const deletePost = async (req, res) => {
    try {
        let id = req.params.id;
        await postsSchema.findByIdAndDelete(id, (err, data) => {
            if (err) {
                res.json({
                    status: 400,
                    success: false,
                    message: "post not found!"
                })
            } else {
                res.json({
                    status: 200,
                    deleted: true,
                    deletedPost: data
                })
            }
        })
    } catch (error) {
        return console.error(error)
    }
}

//deleting a post


//exporting functions
module.exports.getPostById = getPostById;
module.exports.newPost = newPost;
module.exports.getAllPosts = getAllPosts;
module.exports.getPostsByUsername = getPostsByUsername;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
module.exports.updateComments = updateComments;
module.exports.updateRetweeps = updateRetweeps;
module.exports.updateLikes = updateLikes;
module.exports.updateSaved = updateSaved;
module.exports.updateLikesOfComment = updateLikesOfComment;
module.exports.newPostWithoutImage = newPostWithoutImage;
//exporting functions