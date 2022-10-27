import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState, useEffect } from 'react';

let Comment = (props) => {

    //checking if the user likes a comment
    const [isLiking, setIsLiking] = useState(false);
    const [likes, setLikes] = useState(props.likes)
    const [hasImage, setHasImage] = useState(false);
    const [profileImage, setProfileImage] = useState("");

    console.log(isLiking)
    useEffect(() => {
        if (props.likesArray.includes(props.currentUser)) {
            setIsLiking(true)
        }
    }, [])

    //getting profile image of a commentor

    useEffect(() => {
        fetch(`https://tweep1.herokuapp.com/profiles/${props.name}`).then(response => response.json()).then(data => {
            if (data.profile.profileImage) {
                setProfileImage(data.profile.profileImage)
                setHasImage(true)
            }
        })
    }, [])


    //getting profile image of a commentor


    //liking and disliking a comment
    const likeComment = () => {
        setIsLiking(true)
        setLikes(prevLikes => prevLikes + 1)
        fetch(`https://tweep1.herokuapp.com/posts/updateComments/${props.postId}/updateLikes/${props.time}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                like: props.currentUser
            })
        }).then(response => response.json()).then(data => {
            console.log(data)
        }).catch(err => console.log(err))

    }


    const disLikeComment = () => {
        setIsLiking(false)
        setLikes(prevLikes => prevLikes - 1)
        fetch(`https://tweep1.herokuapp.com/posts/updateComments/${props.postId}/updateLikes/${props.time}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                like: props.currentUser
            })
        }).then(response => response.json()).then(data => {
            console.log(data)
        }).catch(err => console.log(err))

    }
    //liking and disliking a comment

    return (
        <div className="flex my-2 py-4 pr-4 w-full">
            <div className='flex w-full'>
                {hasImage ?
                    <img src={profileImage} alt="commentor" className="w-[36px] h-[36px] rounded-md mr-4" /> :
                    <PersonIcon fontSize="large" className=" rounded-[50%] w-[36px] h-[36px] mr-4 bg-gray-200"
                        style={{ fill: "#808080" }} />}
                <div className='flex flex-col w-full pl-2'>
                    <div
                        className='flex flex-col justify-center bg-[#FAFAFA] rounded-md mb-2 dark:bg-inherit dark:border-gray-700 dark:shadow-md dark:border-[0.2px]'>
                        <div className='flex items-center mb-2'>
                            <p className={ " font-medium mr-4 dark:text-white"}>{props.name}</p>
                            <p className="text-[14px] text-[#929191]">on {props.createdAt}</p>
                        </div>
                        <div>
                            <p className={ "text-[#4F4F4F] dark:text-[#BDBDBD]"}>{props.body}</p>
                        </div>
                    </div>
                    <div className="text-[12px] text-[#BDBDBD]  flex items-center">
                        {isLiking ?
                            <button className={"text-[#EB5757] flex items-center"} onClick={disLikeComment}>
                                <FavoriteBorderOutlinedIcon
                                    fontSize="inherit" className="mr-1 " />dislike
                            </button>

                            :

                            <button className={"hover:text-[#EB5757] flex items-center"} onClick={likeComment}>
                                <FavoriteBorderOutlinedIcon
                                    fontSize="inherit" className="mr-1 " />like</button>
                        }
                        <span className="px-2 flex items-center">.</span>
                        <span>{likes} Likes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;