import Navbar from '../../components/Navbar';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SideSection from '../../components/SideSection';
import Post from '../../components/Post';
import { Link } from 'react-router-dom';

let Bookmarks = (props) => {

    let navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [hasProfile, setHasProfile] = useState(false)
    const [savedPosts, setSavedPosts] = useState([]);
    const [hasNoSavedPosts, setHasNoSavedPosts] = useState(false);

    console.log(savedPosts)
    //checking if the user is logged in 
    useEffect(() => {
        const accessToken = window.localStorage.getItem("accessToken")
        if (!accessToken) {
            navigate('/auth/signup')
        } else {
            fetch(`https://mc-tweep.herokuapp.com/auth/verifyToken/${accessToken}`)
                .then(response => response.json())
                .then(data => {
                    if (!data.authorized) {
                        navigate('/auth/login')
                    } else {
                        fetch(`https://mc-tweep.herokuapp.com/profiles/${data.user.userName}`)
                            .then(response => response.json())
                            .then(data => {
                                setUserProfile(data.profile)
                                setHasProfile(true)
                            })
                    }
                })
                .catch(err => console.error(err))
        }
    }, [])

    useEffect(() => {
        if (hasProfile) {
            fetch(`https://mc-tweep.herokuapp.com/posts/getSavedTweeps/${userProfile.userName}`).then(response => response.json()).then(data => {
                if (data.posts.length === 0) {
                    setHasNoSavedPosts(true)
                } else {
                    setSavedPosts(data.posts)
                }
            })
        }
    }, [hasProfile])


    const postElements = savedPosts.map(post => {
        return <Post
            key={post._id}
            likesArray={post.likes}
            likes={post.likes.length}
            postId={post._id}
            name={post.postedBy}
            createdAt={new Date(post.postedAt).toDateString()} text={post.text}
            img={post.media ? `${post.media}` : undefined}
            comments={post.comments.length}
            retweeps={post.retweeps.length}
            retweepsArray={post.retweeps}
            saves={post.saved.length}
            savesArray={post.saved}
            commentsArray={post.comments}
            image={userProfile.profileImage}
            currentUser={userProfile.userName}
        />
    })

    if (hasProfile) {
        return (
            <div
                className={"bg-[#F2F2F2] h-screen overflow-x-hidden dark:bg-[#252329]"}>
                {userProfile.profileImage ?
                    <Navbar toBookmarks={true}
                        profileImg={`https://tweep1.herokuapp.com/${`${userProfile.profileImage}`}`}
                        userName={userProfile.userName} /> :
                    <Navbar userName={userProfile.userName} />}
                <div className=" mt-32 flex justify-between xl:px-52 ">
                    <div className={'mr-24'}>
                        <SideSection fixLinks={props.fixSideSearch} />
                    </div>
                    <div className="w-[745px]">

                        {hasNoSavedPosts ?
                            <div className={'w-full h-full border-2 bg-gray-100 flex items-center flex-col justify-center dark:shadow-md dark:bg-inherit'}>
                                <span className={'text-gray-500 text-lg capitalize'}>You have no saved Tweeps.</span>
                                <Link to={'/'}>
                                    <button className={'bg-blue-400 hover:bg-blue-500 my-4 text-white px-4 py-1 rounded-sm'}>
                                        <span className={'capitalize '}>go save one</span>
                                    </button>
                                </Link>

                            </div> : postElements}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div
                className={"w-full h-screen flex items-center justify-center dark:bg-[#252329]"}>
                <CircularProgress />
            </div>
        )
    }
}

export default Bookmarks;