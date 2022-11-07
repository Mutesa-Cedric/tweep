import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import SideSection from '../../components/SideSection';
import Post from '../../components/Post';
import backgroundCover from '/images/background.png'
import profileAvatar from "/images/profileAvatar.png"
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import useAuth from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import axios from "../../../axios.config"
import { useNavigate } from 'react-router';
const Profile = (props) => {
    const navigate = useNavigate();
    const { user, } = useAuth();
    const { posts } = useData()
    //getting a search parameter from the url
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('user');
    //getting a search parameter from the url

    const [isFollowing, setIsFollowing] = useState(false)
    const [userPosts, setUserPosts] = useState(null)
    const [searchedUser, setSearchedUser] = useState(null);
    const [searchedUserFollowers, setSetSearchedUserFollowers] = useState(0);

    const getProfile = () => {
        if (username && !searchedUser) {
            axios.get(`/profiles/${username}`).then(({ data }) => {
                setSearchedUser(data.profile);
                setSetSearchedUserFollowers(data.profile.followers.length);
            }).catch(err => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        getProfile();
        if (posts && username) {
            setUserPosts(posts.filter(post => post.postedBy === username))
        }
    }, [username, posts])

    useEffect(() => {
        if (user && user.userName == username) navigate("/currentProfile")
        if (searchedUser && user && user.following.includes(searchedUser.userName)) {
            setIsFollowing(true)
        }
    }, [searchedUser, user])

    // update followers
    const updateFollowers = async () => {
        isFollowing ? setSetSearchedUserFollowers(searchedUserFollowers - 1) : setSetSearchedUserFollowers(searchedUserFollowers + 1);
        setIsFollowing(!isFollowing);
        await axios.patch("/profiles/updateFollowers", {
            follower: user.userName,
            following: searchedUser.userName
        })
    }

    //following and unfollowing a user
    return (
        <>
            {
                !searchedUser ?
                    <div className={"w-full lg:h-[90vh] h-screen flex items-center justify-center dark:bg-[#252329]"}>
                        <CircularProgress />
                    </div> :
                    <div>
                        <div
                            className="w-full  mt-16 lg:h-[294px] md:h-[350px] h-[400px] bg-no-repeat bg-cover bg-center dark:border-b dark:border-gray-500  xl:px-[210px] lg:px-[100px] md:px-[20px] px-2 flex items-end justify-center"
                            style={{ backgroundImage: `url(${searchedUser.coverImage ? searchedUser.coverImage : backgroundCover})` }}>
                            <div
                                className={"bg-white flex  justify-between w-full rounded-xl relative top-24 z-0  shadow-sm  mr-4 xl:h-[163px] md:h-[200px] h-auto dark:bg-[#23212b] dark:bg-inherit dark:shadow-xl"}>
                                <div className="flex">
                                    <div className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg "
                                        style={{ backgroundImage: `url(${searchedUser.profileImage ? searchedUser.profileImage : profileAvatar})` }}>
                                    </div>
                                    <div className="flex flex-col absolute xl:left-[20%] lg:left-[23%] md:left-[26%] left-[45%] top-4 w-2/6 h-auto ">
                                        <div className="flex items-center justify-between  mb-4 space-x-4">
                                            <h1 className={"text-2xl font-medium dark:text-gray-300"}>
                                                {searchedUser.userName}</h1>
                                            <p className={"text-[#828282] text-[14px] dark:font-semibold"}>
                                                <span className={"font-medium text-black dark:text-gray-300"}>{searchedUser.following.length}</span> following
                                            </p>
                                            <p className={"text-[#828282] text-[14px] dark:font-semibold"}>
                                                <span className={"font-[600] text-black dark:text-gray-300"}>{searchedUserFollowers}</span> followers
                                            </p>
                                        </div>
                                        <div>
                                            <p className={"text-[#828282] dark:font-semibold"}>
                                                {searchedUser.bio ? searchedUser.bio : "This user has no bio yet !"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={updateFollowers}
                                    className="bg-[#2F80ED] text-white h-max flex items-center justify-between py-1 px-5 capitalize rounded-sm mt-5 mx-10">
                                    {isFollowing ? <PersonRemoveAlt1OutlinedIcon fontSize="small" className="mr-2" /> : <PersonAddAlt1OutlinedIcon fontSize="small" className="mr-2" />}{isFollowing ? "unfollow" : "follow"}
                                </button>
                            </div>
                        </div>
                        <div className=" mt-28 flex   xl:px-52  ">
                            <div className="mr-36">
                                <SideSection fixLinks={props.fixSideSearch} />
                            </div>
                            <div className="w-[650px]">
                                {userPosts.length === 0 && <h1 className=" text-gray-500 capitalize font-medium mb-4">posts
                                    from {searchedUser.userName}</h1>}
                                {userPosts.length === 0 ? <div className={"bg-gray-100 border-2 w-full flex flex-col items-center justify-center  capitalize text-gray-500 font-[500] py-24 border-gray-200 dark:bg-inherit dark:shadow-xl"}>
                                    <span className={'text-xl'}>this user has no posts yet!</span>
                                </div> : userPosts.map(post => (
                                    <Post key={post._id} {...post} />
                                ))}
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
export default Profile;