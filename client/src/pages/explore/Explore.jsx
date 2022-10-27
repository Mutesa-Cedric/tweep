import Navbar from '../../components/Navbar';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
        // console.log(`filter ${filter}`)
        switch (filter) {
            case 'top':
                fetch(`https://mc-tweep.herokuapp.com/getTopPosts`).then(response => response.json()).then(data => {
                    setPosts(data.posts)
                });
                break;
            case 'latest':
                fetch(`https://mc-tweep.herokuapp.com/getLatestPosts`).then(response => response.json()).then(data => {
                    setPosts(data.posts)
                })
                break;
            case 'people':
                fetch(`https://mc-tweep.herokuapp.com/mostRetweepedPosts`).then(response => response.json()).then(data => {
                    setPosts(data.posts)
                })
                break;
            case 'media':
                fetch(`https://mc-tweep.herokuapp.com/mostCommentedPosts`).then(response => response.json()).then(data => {
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
            name={post.postedBy}
            createdAt={new Date(post.postedAt).toDateString()}
            text={post.text}
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
                    <Navbar toExplore={true}
                        profileImg={userProfile.profileImage}
                        userName={userProfile.userName} /> :
                    <Navbar userName={userProfile.userName} />}
                <div className=" mt-20 flex justify-between xl:px-52 ">
                    <div className=" h-auto flex   justify-between">
                        <Categories />
                    </div>
                    <div id="expContainer">
                        <div
                            className='relative  xl:w-auto sm:mx-4 w-[650px]   mb-4 items-center flex'>
                            <div className="absolute ml-4  rounded-lg">
                                <SearchOutlinedIcon fontSize="small" style={{ fill: "#BDBDBD" }} />
                            </div>
                            <input type='text'
                                placeholder='Search'
                                className={'bg-white pl-12 py-3 rounded-md border-none focus:outline-none  shadow-sm placeholder:text-[#BDBDBD] dark:bg-inherit dark:text-white'}
                            />
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
                className={ "w-full h-screen flex items-center justify-center dark:bg-[#252329]"}>
                <CircularProgress />
            </div>
        )
    }

}

export default Explore