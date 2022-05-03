import Comment from "./Comment";
import React, {useState, useEffect} from 'react';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

let Post = (props) => {

    //showing comments
    const [showComments, setShowComments] = useState(false)
    const [autoFocus, setAutoFocus] = useState(false);
    const toggleShowComments = () => {
        setShowComments(prevState => {
            return !prevState
        })
        setAutoFocus(prevState => !prevState)
    }
    // console.log(autoFocus)
    const [comments, setComments] = useState(props.commentsArray)

    let commentElements = comments.map(comment => {
        return <Comment
            key={comment.commentedAt}
            darkMode={props.darkMode}
            profileImg={`http://localhost:7070/${comment.commentedBy}Profile.png`}
            name={comment.commentedBy}
            createdAt={new Date(comment.commentedAt).toDateString()}
            body={comment.body}
            likes={comment.likes}

        />
    })

    //commenting on a post
    const [commentData, setCommentData] = useState({
        comment: ''
    })
    const [sendVisible, setSendVisible] = useState(false)
    const handleCommentChange = (e) => {

        const {name, value} = e.target;
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
    const postComment = () => {
        fetch(`http://localhost:7070/posts/updateComments/${props.postId}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            }, body: JSON.stringify({
                comments: {
                    commentedBy: props.currentUser,
                    body: commentData.comment,
                    commentedAt: new Date().getTime()
                }
            })
        }).then(response => response.json()).then(data => {
            // console.log(data)
            if (data.success) {
                fetch(`http://localhost:7070/posts/byid/${props.postId}`, {
                    method: "GET"
                }).then(response => response.json()).then(data => {
                    // console.log(data.post.comments)
                    setComments(data.post.comments);
                    setCommentData(prevState => {
                        return {
                            comment: ''
                        }
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => console.log(err))
    }
    //posting a comment

    //commenting on a post


    return <div
        className={props.darkMode ? "bg-inherit shadow-xl  border-[0.2px] border-gray-700 xl:w-auto sm:mx-4 sm:w-full md:w-[600px] lg:w-[650px]    h-auto flex flex-col justify-between  mb-8 rounded-md pl-4 pr-6  py-4 " : "bg-white border-[1px] w-[745px] h-auto flex flex-col justify-between xl:w-auto sm:mx-4 sm:w-full md:w-[600px] lg:w-[650px]  mb-8 rounded-md pl-4 pr-6  py-4 "}>
        <div className="flex items-center justify-start my-2">
            {props.profile !== undefined &&
                <img src={props.profile} alt="tweeper" className="w-[36px] h-[36px] rounded-md mr-4"></img>}
            {props.profile === undefined &&
                <PersonIcon fontSize="large" className=" rounded-[50%] w-[36px] h-[36px] mr-4 bg-gray-200"
                            style={{fill: "#808080"}}/>}
            <div className="flex flex-col">
                <h1 className={props.darkMode ? "font-medium capitalize text-white" : "font-medium capitalize text-black"}>{props.name}</h1>
                <p className="text-[#BDBDBD] text-[14px]">{props.createdAt}</p>
            </div>
        </div>
        <div className="mb-4 mt-2 flex">
            <p className={props.darkMode ? "text-[#BDBDBD]" : "text-[#4F4F4F]"}>{props.text}</p>
        </div>
        {props.img !== undefined && <div className="flex object-cover h-[328px] ">
            <img src={props.img} alt="post" className="rounded-md text-[#4F4F4F] w-full "/>
        </div>}
        <div
            className="flex text-[#BDBDBD] text-[13px] float-right border-b-[1.3px] items-center py-[6px] justify-end px-2">
            <p className="cursor-pointer mx-4" onClick={toggleShowComments}>{props.comments} Comments</p>
            <p className="cursor-pointer mx-4">{props.retweeps} Retweeps</p>
            <p className="cursor-pointer ">{props.saves} Saved</p>
        </div>
        <div className="w-full flex justify-between items-center py-1 border-b-[1.3px]">
            <button onClick={toggleShowComments}
                    className={props.darkMode ? "text-white flex hover:bg-black text-[14px] bg-inherit shadow-md px-8 hover: py-2 font-medium rounded-[8px]" : "text-[#4f4f4f] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]"}>
                <ChatBubbleOutlineOutlinedIcon fontSize="small" className="mr-2"/> Comment
            </button>
            <button
                className={props.darkMode ? "text-white flex hover:bg-black text-[14px] bg-inherit shadow-md px-8 hover: py-2 font-medium rounded-[8px]" : "text-[#4F4F4F] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]"}>
                <CachedOutlinedIcon fontSize="small" className="mr-2"/>Retweep
            </button>
            <button
                className={props.darkMode ? "text-white flex hover:bg-black text-[14px] bg-inherit shadow-md px-8 hover: py-2 font-medium rounded-[8px]" : "text-[#4F4F4F] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]"}>
                <FavoriteBorderOutlinedIcon fontSize="small" className="mr-2"/>Like
            </button>
            <button
                className={props.darkMode ? "text-white flex hover:bg-black text-[14px] bg-inherit shadow-md px-8 hover: py-2 font-medium rounded-[8px]" : "text-[#4F4F4F] flex hover:bg-[#F2F2F2] text-[14px] bg-gray-50 px-8 hover: py-2 font-medium rounded-[8px]"}>
                <BookmarkAddOutlinedIcon fontSize="small" className="mr-2"/>Save
            </button>
        </div>
        {showComments &&

            <div
                className={props.darkMode ? "w-full h-auto border-t-2 overflow-y-scroll flex flex-col " : "w-full h-auto max-h-72 border-t-2 overflow-y-scroll flex flex-col"}>
                {commentElements.length !== 0 ? commentElements :
                    <p className={props.darkMode ? "mx-auto py-6 capitalize text-white" : 'text-gray-600 mx-auto py-6 capitalize'}> no
                        comments yet! be first to comment</p>}
            </div>
        }
        <div className={props.darkMode ? "flex items-center my-3 z-10" : "flex items-center my-3"}>
            <img src={props.image} alt="profile" className="w-[36px] h-[36px] rounded-md mr-4"/>
            <textarea
                autoFocus={autoFocus}
                placeholder="Tweep your reply"
                rows="1"
                className={props.darkMode ? "bg-inherit shadow-sm  w-full placeholder:text-[#BDBDBD] text-white placeholder:font-medium placeholder:text-[14px] py-2 focus:outline-none   rounded-md border-none" : "bg-[#FAFAFA] w-full placeholder:text-[#BDBDBD] placeholder:font-medium placeholder:text-[14px] py-2 focus:outline-none   rounded-md border-none"}
                name="comment"
                onInput={handleCommentChange}
                value={commentData.comment}
            ></textarea>
            {sendVisible && <button
                className="px-5 py-2 flex items-center justify-center bg-blue-500 hover:bg-blue-600  rounded-xl"
                onClick={postComment}><SendOutlinedIcon style={{fill: "white"}} fontSize="small" className=""/>
            </button>}
        </div>

    </div>
}

export default Post;