import Navbar from '../../components/Navbar';
import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SideSection from '../../components/SideSection';
import Post from '../../components/Post';
import post from "../../images/post.jpg";
import post2 from "../../images/post2.jpg";
import tweeper from "../../images/tweeper.jpg";
import Lois from "../../images/Lois.jpg";
// import cover from '../../images/cover2.jpg';

import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';

let Profile = (props) => {

    //getting a search parameter from the url
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('user');

    //getting a search parameter from the url

    //states
    const [hasProfile, setHasProfile] = useState(false)
    const [posts, setPosts] = useState([])
    const [hasNoPost, setHasNoPost] = useState(false)
    const [currentUser, setCurrentUser] = useState({});
    const [searchedUser, setSearchedUser] = useState({});

    // const [user,setUser]=useState(username)
    // const [currentUserProfile,setCurrentUser]=useState({})
    // const [userProfile, setUserProfile] = useState({})


    // console.log(currentUserProfile)
    console.log(posts)
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
                        setCurrentUser(data.profile)
                        setHasProfile(true)
                    }
                    fetch(`http://localhost:7070/profiles/${username}`)
                        .then(response => response.json()).then(data => {
                        if (data.isFound) {
                            setSearchedUser(data.profile)
                            fetch(`http://localhost:7070/posts/${data.profile.userName}`).then(response => response.json())
                                .then(data => {
                                    if (data.posts.length === 0) {
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

    //checking if the user is logged in

    let postElements = posts.map(post => {
        return <Post
            key={post._id}
            postId={post._id}
            darkMode={props.darkMode}
            name={post.postedBy}
            profile={`http://localhost:7070/${post.postedBy}Profile.png`}
            createdAt={new Date(post.postedAt).toDateString()} text={post.text}
            img={`http://localhost:7070/${post.media}`}
            comments={post.comments.length}
            retweeps={post.retweets}
            saves={post.saved}
            commentsArray={post.comments}
            image={`http://localhost:7070/${`${searchedUser.profileImage}`}`}
            currentUser={currentUser.userName}
        />
    });


    if (hasProfile) {
        console.log('rendered')
        return (<div
                className={props.darkMode ? "bg-[#252329] h-screen overflow-x-hidden" : "relative bg-[#F2F2F2] h-screen overflow-x-hidden"}>
                {currentUser.profileImage ? <Navbar darkMode={props.darkMode} setDarkMode={props.setDarkMode}
                                                    profileImg={`http://localhost:7070/${`${currentUser.profileImage}`}`}
                                                    userName={currentUser.userName}/> :
                    <Navbar darkMode={props.darkMode} setDarkMode={props.setDarkMode}
                            userName={currentUser.userName}/>}
                <div>
                    <div
                        className="w-full  mt-16 h-[294px] bg-no-repeat bg-cover  px-[210px] flex items-end justify-center"
                        style={{backgroundImage: `url(${post})`}}>
                        <div
                            className={props.darkMode ? "bg-[#23212b] flex justify-between  w-full rounded-xl relative top-24  shadow-md mr-4 h-[163px]" : "bg-white flex justify-between w-full rounded-xl relative  top-24 z-0  shadow-sm mr-4 h-[163px]"}>
                            <div className="flex">
                                <div
                                    className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg "
                                    style={{backgroundImage: `url(http://localhost:7070/${searchedUser.profileImage})`}}>

                                </div>
                                <div className="flex flex-col absolute left-[20%] top-4 w-2/6 h-auto">
                                    <div className="flex items-center justify-between  mb-4">
                                        <h1 className={props.darkMode ? "text-2xl font-[600] text-gray-300" : "text-2xl font-[600]"}>
                                            {searchedUser.userName}</h1>
                                        <p className={props.darkMode ? "text-[#828282] text-[14px] font-[600]" : "text-[#828282] text-[14px]"}>
                                            <span
                                                className={props.darkMode ? "font-[600] text-gray-300" : "font-[600] text-black"}>{searchedUser.following}</span> following
                                        </p>
                                        <p className={props.darkMode ? "text-[#828282] text-[14px] font-[600]" : "text-[#828282] text-[14px]"}>
                                            <span
                                                className={props.darkMode ? "font-[600] text-gray-300" : "font-[600] text-black"}>{searchedUser.followers}</span> followers
                                        </p>
                                    </div>
                                    <div>
                                        <p className={props.darkMode ? "text-[#828282] font-[600]" : "text-[#828282]"}>
                                            {searchedUser.bio? searchedUser.bio : "This user has no bio yet !"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="bg-[#2F80ED] text-white h-max flex items-center justify-between py-1 px-5 capitalize rounded-sm mt-5 mx-10">
                                <PersonAddAlt1OutlinedIcon fontSize="small" className="mr-2"/> follow
                            </button>
                        </div>
                    </div>
                    <div className=" mt-28 flex justify-between  xl:px-52  ">
                        <div>
                            <SideSection darkMode={props.darkMode} fixLinks={props.fixSideSearch}/>
                        </div>
                        <div className="w-[650px]">
                            <h1 className="ml-5 text-gray-500 capitalize font-medium mb-4">posts
                                from {searchedUser.userName}</h1>
                            {postElements}
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