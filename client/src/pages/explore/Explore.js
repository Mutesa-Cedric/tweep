import Navbar from '../../components/Navbar';
import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Categories from './Categories';
import Post from "../../components/Post";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

let Explore = (props) => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    const filter = urlParams.get('filter');

    // console.log(`filter ${filter}`)
    let navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [hasProfile, setHasProfile] = useState(false)
    const [posts, setPosts] = useState([]);
    //checking if the user is logged in
    useEffect(() => {
        const accessToken = window.localStorage.getItem("accessToken")
        if (!accessToken) {
            navigate('/auth/signup')
        } else {
            fetch(`http://localhost:7070/auth/verifyToken/${accessToken}`)
                .then(response => response.json())
                .then(data => {
                    if (!data.authorized) {
                        navigate('/auth/login')
                    } else {
                        fetch(`http://localhost:7070/profiles/${data.user.userName}`)
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
        // console.log(`filter ${filter}`)
        switch (filter) {
            case 'top':
                fetch(`http://localhost:7070/getTopPosts`).then(response => response.json()).then(data => {
                    setPosts(data.posts)
                });
                break;
            case 'latest':
                fetch(`http://localhost:7070/getLatestPosts`).then(response => response.json()).then(data => {
                    setPosts(data.posts)
                })
                break;
            case 'people':
                fetch(`http://localhost:7070/mostRetweepedPosts`).then(response => response.json()).then(data => {
                    setPosts(data.posts)
                })
                break;
            case 'media':
                fetch(`http://localhost:7070/mostCommentedPosts`).then(response => response.json()).then(data => {
                    setPosts(data.posts)
                })
                break;
                default:
        }
    }, [filter])

    const postElements = posts.map(post => {
        return <Post
            key={post._id}
            likesArray={post.likes}
            likes={post.likes.length}
            postId={post._id}
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
            image={`http://localhost:7070/${`${userProfile.profileImage}`}`}
            currentUser={userProfile.userName}
        />
    })


    if (hasProfile) {
        return (
            <div
                className={props.darkMode ? "bg-[#252329] h-screen overflow-x-hidden" : "bg-[#F2F2F2] h-screen overflow-x-hidden"}>
                {userProfile.profileImage ?
                    <Navbar toExplore={true} darkMode={props.darkMode} setDarkMode={props.setDarkMode}
                            profileImg={`http://localhost:7070/${`${userProfile.profileImage}`}`}
                            userName={userProfile.userName}/> :
                    <Navbar darkMode={props.darkMode} setDarkMode={props.setDarkMode} userName={userProfile.userName}/>}
                <div className=" mt-20 flex justify-between xl:px-52 ">
                    <div className=" h-auto flex   justify-between">
                        <Categories darkMode={props.darkMode}/>
                    </div>
                    <div id="expContainer">
                        <div
                            className='w-full  xl:w-auto sm:mx-4 sm:w-full md:w-[600px] lg:w-[650px]   mb-4 items-center flex'>
                            <div className="absolute ml-4  rounded-lg">
                                <SearchOutlinedIcon fontSize="small" style={{fill: "#BDBDBD"}}/>
                            </div>
                            <input type='text'
                                   placeholder='Search'
                                   className={props.darkMode ? "w-full bg-inherit pl-12 py-3 z-index-100 rounded-md border-none focus:outline-none  shadow-lg placeholder:text-gray-300 z-index-100 text-white" : 'w-full bg-white pl-12 py-3 rounded-md border-none focus:outline-none  shadow-sm placeholder:text-[#BDBDBD]'}
                            />
                            {/* <button className='absolute right-[16%] bg-[#2F80ED] text-white px-4  capitalize py-1 rounded-md'>
                                <span className="text-[14px] font-medium">search</span>
                            </button> */}
                        </div>
                        <div className="mx-auto w-[745px] ">
                            {postElements}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div
                className={props.darkMode ? "w-full bg-[#252329] h-screen flex items-center justify-center" : "w-full h-screen flex items-center justify-center"}>
                <CircularProgress/>
            </div>
        )
    }

}

export default Explore