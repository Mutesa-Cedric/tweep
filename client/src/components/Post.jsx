import Comment from "./Comment";
import React, { useState, useEffect } from 'react';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import usePost from "../hooks/usePost";

const Post = (props) => {
    //states
    const [isLiking, setIsLiking] = useState(false)
    const [likesArray, setLikesArray] = useState(props.likesArray);
    const [showComments, setShowComments] = useState(false)
    const [autoFocus, setAutoFocus] = useState(false);
    const [numberOfComments, setNumberOfComments] = useState(props.comments);
    const [likes, setLikes] = useState(props.likes);
    const [saves, setSaves] = useState(props.saves);
    const [isSaving, setIsSaving] = useState(false);
    const [savesArray, setSavesArray] = useState(props.savesArray)
    const [isRetweeped, setIsRetweeped] = useState(false);
    const [retweeps, setRetweeps] = useState(props.retweeps);
    const [retweepsArray, setRetweepsArray] = useState(props.retweepsArray);
    const { user } = useAuth();
    const { postComment, handleLikePost, handleRetweep, handleSavePost } = usePost()

    const toggleShowComments = () => {
        setShowComments(prevState => {
            return !prevState
        })
        setAutoFocus(prevState => !prevState)
    }

    //commenting on a post
    const [commentData, setCommentData] = useState({
        comment: ''
    })
    const [sendVisible, setSendVisible] = useState(false)
    const handleCommentChange = (e) => {
        const { name, value } = e.target;
        setCommentData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    //showing and hidding send button

    useEffect(() => {
        if (commentData.comment === '') {
            setSendVisible(false)
        } else {
            setSendVisible(true)
        }
    }, [commentData])

    //showing and hiding send button

    //posting a comment
    const updateComments = () => {
        postComment(user.name, props.postId, commentData.comment);
    }

    useEffect(() => {
        if (savesArray.includes(props.currentUser)) {
            setIsSaving(true)
        }
        if (likesArray.includes(props.currentUser)) {
            setIsLiking(true)
        }
        if (retweepsArray.includes(props.currentUser)) {
            setIsRetweeped(true)
        }
    }, [])

    // update likes
    const updateLikes = () => {
        setIsLiking(!isLiking);
        handleLikePost(user.name, props.postId);
    }

    // updating saves
    const updateSaves = () => {
        if (isSaving) {
            setIsSaving(false);
            setSaves(prevSaves => prevSaves - 1);
        } else {
            setIsSaving(true);
            setSaves(prevSaves => prevSaves + 1);
        }
        handleSavePost(user.name, props.postId);
    }

    //retweeping
    const updateRetweeps = () => {
        setIsRetweeped(!isRetweeped);
        handleRetweep();
    }

    return <div
        className="bg-white border-[1px] w-[650px] h-auto flex flex-col justify-between sm:mx-4  mb-8 rounded-md pl-4 pr-6  py-4  dark:bg-inherit dark:border-gray-700">
        <div className="flex items-center justify-start my-2">
            {user.profileImage ?
                <img src={user.profileImage} alt="tweeper" className="w-[36px] h-[36px] rounded-md mr-4" />
                :
                <PersonIcon fontSize="large" className=" rounded-[50%] w-[36px] h-[36px] mr-4 bg-gray-200"
                    style={{ fill: "#808080" }} />
            }
            <div className="flex flex-col">
                <Link to={`/profile/?user=${user.name}`}>
                    <h1 className={"font-medium capitalize text-black cursor-pointer dark:text-white"}>{props.name}</h1>
                </Link>
                <p className="text-[#BDBDBD] text-[14px]">{props.createdAt}</p>
            </div>
        </div>
        <div className="mb-4 mt-2 flex">
            <p className="text-[#4F4F4F] dark:text-[#BDBDBD]">{props.text}</p>
        </div>
        {props.img !== undefined && <div className="flex object-cover h-[328px] ">
            <img src={props.img} alt="post" className="rounded-md text-[#4F4F4F] object-cover w-full " />
        </div>}
        <div
            className="flex text-[#BDBDBD] text-[13px] float-right border-b-[1.3px] items-center py-[6px] justify-end px-2">
            <p className="cursor-pointer ">{likes} Likes</p>
            <p className="cursor-pointer mx-4" onClick={toggleShowComments}>{numberOfComments} Comments</p>

            <p className="cursor-pointer mx-4">{retweeps} Retweeps</p>
            <p className="cursor-pointer ">{saves} Saved</p>
        </div>
        <div className="w-full flex justify-between items-center py-1 border-b-[1.3px]">
            <button onClick={toggleShowComments}
                className="text-[#4f4f4f] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px] dark:text-white dark:hover:bg-black dark:bg-inherit">
                <ChatBubbleOutlineOutlinedIcon fontSize="small" className="mr-2" /> Comment
            </button>

            {isRetweeped ?

                <button
                    onClick={updateRetweeps}
                    className="text-[#EB5757] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px] dark:hover:text-[#EB5757]  dark:bg-inherit dark:hover:bg-black">
                    <CachedOutlinedIcon fontSize="small" className="mr-2" />Retweeped
                </button>

                :

                <button
                    onClick={updateRetweeps}
                    className="text-[#4F4F4F] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px] dark:text-white dark:hover:bg-black dark:bg-inherit">
                    <CachedOutlinedIcon fontSize="small" className="mr-2" />Retweep
                </button>}

            {isLiking ?
                <button
                    onClick={updateLikes}
                    className={"text-[#EB5757] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px] dark:hover:bg-black dark:shadow-md dark:bg-inherit"}>
                    <FavoriteBorderOutlinedIcon fontSize="small" className="mr-2" />dislike
                </button>

                :

                <button
                    onClick={updateLikes




                    }
                    className={"text-[#4F4F4F] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px] dark:text-white dark:shadow-md dark:hover:bg-black bg-inherit"}>
                    <FavoriteBorderOutlinedIcon fontSize="small" className="mr-2" />Like
                </button>}
            {isSaving ?
                <button
                    onClick={updateSaves}
                    className={"text-[#EB5757] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px] dark:bg-black dark:bg-inherit"}>
                    <BookmarkAddOutlinedIcon fontSize="small" className="mr-2" />Saved
                </button>

                :
                <button
                    onClick={updateSaves}
                    className={"text-[#4F4F4F] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px] dark:text-white dark:hover:bg-black hover:bg-inherit"}>
                    <BookmarkAddOutlinedIcon fontSize="small" className="mr-2" />Save
                </button>}
        </div>
        {showComments &&
            <div
                className="w-full h-auto max-h-72 border-t-2 overflow-y-scroll flex flex-col">
                {commentElements.length !== 0 ? props.comments.map((comment, i) => (
                    <Comment key={i} {...comment} postId={props.postId} createdAt={new Date(comment.commentedAt).toDateString()} />
                )) :
                    <p className='text-gray-600 mx-auto py-6 capitalize dark:text-white'> no
                        comments yet! be first to comment</p>}
            </div>
        }
        <div className="flex items-center my-3 dark:z-10">
            {
                props.image ?
                    <img src={`${`${props.image}`}`} alt="profile" className="w-[36px] h-[36px] rounded-md mr-4" />
                    : <PersonIcon fontSize="large" className=" rounded-[50%] w-[36px] h-[36px] mr-4 bg-gray-200" style={{ fill: "#808080" }} />
            }
            <textarea
                autoFocus={autoFocus}
                placeholder="Tweep your reply"
                rows="1"
                className="bg-[#FAFAFA] w-full placeholder:text-[#BDBDBD] placeholder:font-medium placeholder:text-[14px] py-2 focus:outline-none   rounded-md border-none dark:bg-inherit dark:shadow-sm dark:placeholder:text-[#BDBDBD] dark:text-white"
                name="comment"
                onInput={handleCommentChange}
                value={commentData.comment}
            ></textarea>
            {sendVisible && <button
                className="px-5 py-2 flex items-center justify-center bg-blue-500 hover:bg-blue-600  rounded-xl"
                onClick={updateComments}><SendOutlinedIcon style={{ fill: "white" }} fontSize="small" className="" />
            </button>}
        </div>

    </div>
}

export default Post;