import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState, useEffect } from 'react';
import axios from "../../axios.config";
import useAuth from "../hooks/useAuth";

const Comment = (props) => {

    const { user } = useAuth();
    const [isLiking, setIsLiking] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    //getting profile image of a commentor

    useEffect(() => {
        if (props.likes.includes(user.userName)) {
            setIsLiking(true)
        };

        async function getProfile() {
            await axios.get(`/profiles/${props.commentedBy}`).then(({ data }) => {
                if (data.profile.profileImage) {
                    setProfileImage(data.profile.profileImage)
                }
            })
        }
        getProfile();
    }, [])


    //getting profile image of a commentor


    async function updateLikes(postId) {
        await axios.patch(`/posts/updateComments/${postId}`, { like: user.userName })
    }

    //liking a comment
    const likeComment = () => {
        setIsLiking(true)
        setLikes(prevLikes => prevLikes + 1)
        updateLikes(props._id)
    }

    // disliking a comment
    const disLikeComment = () => {
        setIsLiking(false)
        setLikes(prevLikes => prevLikes - 1)
        updateLikes(props._id)
    }
    //liking and disliking a comment


    return (
        <div className="flex my-2 py-4 pr-4 w-full">
            <div className='flex w-full'>
                {profileImage ?
                    <img src={profileImage} alt="commentor" className="w-[36px] h-[36px] rounded-md mr-4" /> :
                    <PersonIcon fontSize="large" className=" rounded-[50%] w-[36px] h-[36px] mr-4 bg-gray-200"
                        style={{ fill: "#808080" }} />}
                <div className='flex flex-col w-full pl-2'>
                    <div
                        className='flex flex-col justify-center bg-[#FAFAFA] rounded-md mb-2 dark:bg-inherit dark:border-gray-700 dark:shadow-md dark:border-[0.2px] py-2 px-4'>
                        <div className='flex items-center mb-2'>
                            <p className={" font-medium mr-4 dark:text-white"}>{props.commentedBy}</p>
                            <p className="text-[14px] text-[#929191]">on {props.createdAt}</p>
                        </div>
                        <div>
                            <p className={"text-[#4F4F4F] dark:text-[#BDBDBD]"}>{props.body}</p>
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
                        <span>{props.likes.length} Likes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;