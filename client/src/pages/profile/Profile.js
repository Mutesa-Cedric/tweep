import Navbar from '../../components/Navbar';
import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SideSection from '../../components/SideSection';
import Post from '../../components/Post';
import post from "../../images/post.jpg";
import backgroundCover from '../../images/background.png'
import profileAvatar from "../../images/profileAvatar.png"
// import cover from '../../images/cover2.jpg';

import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
let Profile = (props) => {

    //getting a search parameter from the url
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('user');

    //getting a search parameter from the url

    //states
    const [isFollowing,setIsFollowing]=useState(false)
    const [hasProfile, setHasProfile] = useState(false)
    const [posts, setPosts] = useState([])
    const [hasNoPost, setHasNoPost] = useState(false)
    const [currentUser, setCurrentUser] = useState({});
    const [searchedUser, setSearchedUser] = useState({});
    const [searchedUserFound, setSearchedUserFound] = useState(false);
    const [searchedUserFollowers, setSetSearchedUserFollowers] = useState(0);
    const [allSet, setAllSet] = useState(false);
    // console.log(currentUserProfile)
    console.log(isFollowing)
    //checking if the user is logged in
    let navigate = useNavigate()
    useEffect(() => {
        const accessToken = window.localStorage.getItem("accessToken")
        if (!accessToken) {
            return navigate('/auth/signup')
        }
        fetch(`http://localhost:7070/auth/verifyToken/${accessToken}`)
            .then(response => response.json())
            .then(data => {
                if (!data.authorized) {
                    return navigate('/auth/login')
                }
                fetch(`http://localhost:7070/profiles/${data.user.userName}`)
                    .then(response => response.json()).then(data => {
                    if (data.isFound) {
                        if(data.profile.userName===username){
                            return navigate('/currentProfile')
                        }
                        setCurrentUser(data.profile)
                        setHasProfile(true)
                    }
                    fetch(`http://localhost:7070/profiles/${username}`)
                        .then(response => response.json()).then(data => {
                        if (data.isFound) {
                            setSearchedUser(data.profile)
                            setSetSearchedUserFollowers(data.profile.followers.length)
                            setSearchedUserFound(true)
                            fetch(`http://localhost:7070/posts/${data.profile.userName}`).then(response => response.json())
                                .then(data => {
                                    if (!data.areFound) {
                                        setHasNoPost(true)
                                    } else {
                                        setPosts(data.posts)
                                    }
                                })
                                .catch(err => console.error(err))
                        }
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))


    }, [])

    console.log(`has no post ${hasNoPost}`)
    //checking if the user is logged in

    //following and unfollowing a user

    //checking if you follow a user or not
    useEffect(()=>{
        // console.log("following ?"+currentUser.following.includes(searchedUser.userName))
            if (searchedUserFound && currentUser.following.includes(searchedUser.userName)) {
                setIsFollowing(true)
            }

            setAllSet(true)
    },[searchedUserFound])

    const followUser = () => {
        setIsFollowing(true);
        setSetSearchedUserFollowers(searchedUserFollowers + 1);
        fetch("http://localhost:7070/profiles/updateFollowers/",{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                follower: currentUser.userName,
                following: searchedUser.userName
            })
        }).then(response => response.json()).then(data => {
            console.log(data)
        })

    }

    const unFollowUser = () => {
        setIsFollowing(false)
        setSetSearchedUserFollowers(searchedUserFollowers - 1)
        fetch("http://localhost:7070/profiles/updateFollowers/",{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                follower: currentUser.userName,
                following: searchedUser.userName
            })
        }).then(response => response.json()).then(data => {
            console.log(data)
        })
    }

    //following and unfollowing a user

    let postElements = posts.map(post => {
        return <Post
            key={post._id}
            postId={post._id}
            likes={post.likes.length}
            likesArray={post.likes}
            darkMode={props.darkMode}
            name={post.postedBy}
            profile={`http://localhost:7070/${post.postedBy}Profile.png`}
            createdAt={new Date(post.postedAt).toDateString()} text={post.text}
            img={post.media?`http://localhost:7070/${post.media}`:undefined} 
            comments={post.comments.length}
            retweeps={post.retweeps.length}
            retweepsArray={post.retweeps}
            saves={post.saved.length}
            savesArray={post.saved}
            commentsArray={post.comments}
            image={currentUser.profileImage}
            currentUser={currentUser.userName}
        />
    });


    if (hasProfile && searchedUserFound && allSet) {
        return (<div
                className={props.darkMode ? "bg-[#252329] h-screen overflow-x-hidden" : "relative bg-[#F2F2F2] h-screen overflow-x-hidden"}>
                {currentUser.profileImage ? <Navbar darkMode={props.darkMode} setDarkMode={props.setDarkMode}
                                                    profileImg={`http://localhost:7070/${`${currentUser.profileImage}`}`}
                                                    userName={currentUser.userName}/> :
                    <Navbar darkMode={props.darkMode} setDarkMode={props.setDarkMode}
                            userName={currentUser.userName}/>}
                <div>
                    {searchedUser.coverImage?<div
                        className="w-full  mt-16 h-[294px] bg-no-repeat bg-cover  px-[210px] flex items-end justify-center"
                        style={{backgroundImage: `url(http://localhost:7070/${searchedUser.coverImage})`}}>
                        <div
                            className={props.darkMode ? "bg-[#23212b] flex justify-between  w-full rounded-xl relative top-24  shadow-md mr-4 h-[163px]" : "bg-white flex justify-between w-full rounded-xl relative  top-24 z-0  shadow-sm mr-4 h-[163px]"}>
                            <div className="flex">
                                {searchedUser.profileImage?<div
                                    className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg "
                                    style={{backgroundImage: `url(http://localhost:7070/${searchedUser.profileImage})`}}>
                                </div>:<div
                                    className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg "
                                    style={{backgroundImage: `url(${profileAvatar})`}}>
                                </div>}
                                <div className="flex flex-col absolute left-[20%] top-4 w-2/6 h-auto">
                                    <div className="flex items-center justify-between  mb-4">
                                        <h1 className={props.darkMode ? "text-2xl font-[600] text-gray-300" : "text-2xl font-[600]"}>
                                            {searchedUser.userName}</h1>
                                        <p className={props.darkMode ? "text-[#828282] text-[14px] font-[600]" : "text-[#828282] text-[14px]"}>
                                            <span
                                                className={props.darkMode ? "font-[600] text-gray-300" : "font-[600] text-black"}>{searchedUser.following.length}</span> following
                                        </p>
                                        <p className={props.darkMode ? "text-[#828282] text-[14px] font-[600]" : "text-[#828282] text-[14px]"}>
                                            <span
                                                className={props.darkMode ? "font-[600] text-gray-300" : "font-[600] text-black"}>{searchedUserFollowers}</span> followers
                                        </p>
                                    </div>
                                    <div>
                                        <p className={props.darkMode ? "text-[#828282] font-[600]" : "text-[#828282]"}>
                                            {searchedUser.bio? searchedUser.bio : "This user has no bio yet !"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {isFollowing?
                                <button
                                    onClick={unFollowUser}
                                    className="bg-[#2F80ED] text-white h-max flex items-center justify-between py-1 px-5 capitalize rounded-sm mt-5 mx-10">
                                    <PersonRemoveAlt1OutlinedIcon fontSize="small" className="mr-2"/> unfollow
                                </button>

                                :

                                <button
                                    onClick={followUser}
                                    className="bg-[#2F80ED] text-white h-max flex items-center justify-between py-1 px-5 capitalize rounded-sm mt-5 mx-10">
                                    <PersonAddAlt1OutlinedIcon fontSize="small" className="mr-2"/> follow
                                </button>}
                        </div>
                    </div>:
                    <div
                    className="w-full  mt-16 h-[294px] bg-no-repeat bg-cover  px-[210px] flex items-end justify-center"
                    style={{backgroundImage: `url(${backgroundCover})`}}>
                    <div
                        className={props.darkMode ? "bg-[#23212b] flex justify-between  w-full rounded-xl relative top-24  shadow-md mr-4 h-[163px]" : "bg-white flex justify-between w-full rounded-xl relative  top-24 z-0  shadow-sm mr-4 h-[163px]"}>
                        <div className="flex">
                            {searchedUser.profileImage?<div
                                className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg "
                                style={{backgroundImage: `url(http://localhost:7070/${searchedUser.profileImage})`}}>
                            </div>:<div
                                className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg "
                                style={{backgroundImage: `url(${profileAvatar})`}}>
                            </div>}
                            <div className="flex flex-col absolute left-[20%] top-4 w-2/6 h-auto">
                                <div className="flex items-center justify-between  mb-4">
                                    <h1 className={props.darkMode ? "text-2xl font-[600] text-gray-300" : "text-2xl font-[600]"}>
                                        {searchedUser.userName}</h1>
                                    <p className={props.darkMode ? "text-[#828282] text-[14px] font-[600]" : "text-[#828282] text-[14px]"}>
                                        <span
                                            className={props.darkMode ? "font-[600] text-gray-300" : "font-[600] text-black"}>{searchedUser.following.length}</span> following
                                    </p>
                                    <p className={props.darkMode ? "text-[#828282] text-[14px] font-[600]" : "text-[#828282] text-[14px]"}>
                                        <span
                                            className={props.darkMode ? "font-[600] text-gray-300" : "font-[600] text-black"}>{searchedUserFollowers}</span> followers
                                    </p>
                                </div>
                                <div>
                                    <p className={props.darkMode ? "text-[#828282] font-[600]" : "text-[#828282]"}>
                                        {searchedUser.bio? searchedUser.bio : "This user has no bio yet !"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {isFollowing?
                            <button
                                onClick={unFollowUser}
                                className="bg-[#2F80ED] text-white h-max flex items-center justify-between py-1 px-5 capitalize rounded-sm mt-5 mx-10">
                                <PersonRemoveAlt1OutlinedIcon fontSize="small" className="mr-2"/> unfollow
                            </button>

                            :

                            <button
                                onClick={followUser}
                                className="bg-[#2F80ED] text-white h-max flex items-center justify-between py-1 px-5 capitalize rounded-sm mt-5 mx-10">
                                <PersonAddAlt1OutlinedIcon fontSize="small" className="mr-2"/> follow
                            </button>}
                    </div>
                </div>}
                    <div className=" mt-28 flex   xl:px-52  ">
                        <div className="mr-36">
                            <SideSection darkMode={props.darkMode} fixLinks={props.fixSideSearch}/>
                        </div>
                        <div className="w-[650px]">
                            {!hasNoPost && <h1 className=" text-gray-500 capitalize font-medium mb-4">posts
                                from {searchedUser.userName}</h1>}
                            {hasNoPost?<div className={props.darkMode ? "bg-inherit border-2 w-full flex flex-col items-center shadow-xl justify-center  capitalize text-gray-500 font-[500] py-24 border-gray-200" : "bg-gray-100 border-2 w-full flex flex-col items-center justify-center  capitalize text-gray-500 font-[500] py-24 border-gray-200"}>
                                <span className={'text-xl'}>this user has no posts yet!</span>
                            </div> :postElements}
                        </div>

                    </div>
                </div>

            </div>)
    } else {
        return (<div
                className={props.darkMode ? "w-full bg-[#252329] h-screen flex items-center justify-center" : "w-full h-screen flex items-center justify-center"}>
                <CircularProgress/>
            </div>)
    }
}

export default Profile;