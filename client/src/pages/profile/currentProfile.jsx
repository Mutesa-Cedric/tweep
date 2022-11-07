import React, { useState, useEffect } from "react";
import SideSection from '../../components/SideSection';
import Post from '../../components/Post';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditProfile from "./EditProfile";
import backgroundCover from '/images/background.png'
import { Link } from "react-router-dom";
import profileAvatar from "/images/profileAvatar.png"
import useData from '../../hooks/useData';
import useAuth from '../../hooks/useAuth';


const CurrentProfile = (props) => {
    const { user } = useAuth();
    const { loadingPosts, posts } = useData();
    const [isEditing, setIsEditing] = useState(false)
    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {
        if (user && posts) {
            setUserPosts(posts.filter(post => post.postedBy === user.userName))
        }
    }, [user, posts]);

    const [setSuccessStatus] = useState({
        coverSuccessful: false,
        profileSuccessful: false,
        aboutSuccessful: false,
        allSuccessful: false
    });
    //states

    //handling profile editing

    const toggleIsEditing = () => {
        setIsEditing(prevState => {
            return !prevState;
        })
    }
    //handling profile editing

    //handling success message
    let successProfile = () => {
        setIsEditing(false)
        setSuccessStatus(() => {
            return {
                profileSuccessful: true,
                coverSuccessful: false,
                aboutSuccessful: false,
                allSuccessful: false
            }
        })
    }

    let successCover = () => {
        setIsEditing(false)
        setSuccessStatus(() => {
            return {
                profileSuccessful: false,
                coverSuccessful: true,
                aboutSuccessful: false,
                allSuccessful: false
            }
        })
    }

    let successAbout = () => {
        setIsEditing(false)
        setSuccessStatus(() => {
            return {
                profileSuccessful: false,
                coverSuccessful: false,
                aboutSuccessful: true,
                allSuccessful: false
            }
        })
    }

    // console.log(user.profileImage)

    let successAll = () => {
        setIsEditing(false)
        setSuccessStatus(() => { })
        return {
            profileSuccessful: false,
            coverSuccessful: false,
            aboutSuccessful: false,
            allSuccessful: true
        }
    }

    //handling success message

    return (
        <>
            {isEditing && <EditProfile successProfile={successProfile} successAll={successAll} successAbout={successAbout} successCover={successCover} toggleIsEditing={toggleIsEditing} />}
            <div className="w-full  mt-16 h-[294px] bg-no-repeat bg-cover  xl:px-[210px] lg:px-[100px] md:px-[20px] px-2 flex items-end justify-center" style={{ backgroundImage: `url(${user.coverImage ? backgroundCover : user.coverImage})` }} >
                <div className={"bg-white flex justify-between w-full rounded-xl relative  top-24 z-0  shadow-sm mr-4 xl:h-[163px] md:h-[200px] mb-4 dark:bg-[#23212b] dark:shadow-md"}>
                    <div className="flex">
                        <div className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg " style={{ backgroundImage: `url(${user.profileImage ? user.profileImage : profileAvatar})` }}> </div>
                        <div className="flex flex-col absolute xl:left-[20%] lg:left-[23%] md:left-[26%] left-[45%] top-4 w-2/6 h-auto">
                            <div className="flex items-center justify-between  mb-4 space-x-2">
                                <h1 className={"text-2xl font-medium dark:text-gray-300"}>{user.userName}</h1>
                                <p className={"text-[#828282] text-[14px] dark:font-medium"}><span className={"font-medium text-black dark:text-gray-300"}>{user.following.length}</span> following</p>
                                <p className={"text-[#828282] text-[14px] dark:font-medium"}><span className={"font-medium text-black dark:text-gray-300"}>{user.followers.length}</span>  followers</p>
                            </div>
                            <div>
                                <p className={"text-[#828282] dark:font-medium"}>{user.bio ? user.bio : "You have no bio yet!"}</p>
                            </div>
                        </div>
                    </div>
                    <button className="bg-[#2F80ED] text-white h-max flex items-center justify-between py-1 px-5 capitalize rounded-sm mt-5 mx-10" onClick={toggleIsEditing}>
                        <EditOutlinedIcon fontSize="small" className="mr-2" /> edit Profile
                    </button>
                </div>
            </div>
            <div className=" mt-28 flex justify-between  xl:px-52  ">
                <div>
                    <SideSection fixLinks={props.fixSideSearch} />
                </div>
                {!userPosts && !loadingPosts ?
                    <div className={"bg-gray-100 border-2 w-full flex flex-col items-center justify-center  capitalize text-gray-500 font-[500] mx-4 border-gray-200 dark:bg-inherit dark:border-gray-200 dark:shadow-xl"}>
                        <span className={'text-xl'}>you have no posts yet!</span>
                        <Link to={"/"}>
                            <button className={'text-white shadow-md text-[16px] bg-blue-500 px-4 py-1 my-4 rounded-sm'}>
                                <span>
                                    Create One
                                </span>
                            </button>
                        </Link>
                    </div>
                    :
                    <div className="w-[745px]">
                        <h1 className="ml-5 text-gray-500 capitalize font-medium mb-4">Your posts</h1>
                        {userPosts && userPosts.length === 0 && <h1 className=" text-gray-500 capitalize font-medium mb-4"> your posts</h1>}
                        {!userPosts || userPosts.length === 0 && !loadingData ? <div className={"bg-gray-100 border-2 w-full flex flex-col items-center justify-center  capitalize text-gray-500 font-[500] py-24 border-gray-200 dark:bg-inherit dark:shadow-xl"}>
                            <span className={'text-xl'}>You have no posts yet!</span>
                        </div> : userPosts.map(post => (
                            <Post key={post._id} {...post} />
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default CurrentProfile; 