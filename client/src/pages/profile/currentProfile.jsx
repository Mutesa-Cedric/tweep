import Navbar from '../../components/Navbar';
import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import SideSection from '../../components/SideSection';
import Post from '../../components/Post';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditProfile from "./EditProfile";
import ProcessSuccessful from "../../components/ProcessSuccessful";
import backgroundCover from '../../images/background.png'
import { Link } from "react-router-dom";
import profileAvatar from "../../images/profileAvatar.png"
import useData from '../../hooks/useData';
import useAuth from '../../hooks/useAuth';


const CurrentProfile = (props) => {
    const { user } = useAuth();
    const { getPostsByUsername, loading } = useData();
    const [posts, _setPosts] = useState(getPostsByUsername(user.userName))
    const [isEditing, setIsEditing] = useState(false)

    const [successStatus, setSuccessStatus] = useState({
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

    // console.log(userProfile.profileImage)

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

    !loading ?
        <div className={"relative bg-[#F2F2F2] h-screen overflow-x-hidden dark:bg-[#252329]"}>
            {isEditing && <EditProfile updateDom={updateDom} successProfile={successProfile} successAll={successAll} successAbout={successAbout} successCover={successCover} userProfile={userProfile} user={user} toggleIsEditing={toggleIsEditing} />}
            {userProfile.profileImage ? <Navbar profileImg={`${`${userProfile.profileImage}`}`} userName={userProfile.userName} /> : <Navbar userName={userProfile.userName} />}
            {successStatus.profileSuccessful && <ProcessSuccessful message={'profile image updated successfully!! reload to view changes'} />}
            {successStatus.coverSuccessful && <ProcessSuccessful message={'cover image Updated successfully reload to view changes'} />}
            {successStatus.aboutSuccessful && <ProcessSuccessful message={'your \" about \" was updated successfully! reload to view changes'} />}
            {successStatus.allSuccessful && <ProcessSuccessful message={'your Profile was updated successfully reload to view changes'} />}
            <div >
                {user.coverImage ? <div className="w-full  mt-16 h-[294px] bg-no-repeat bg-cover  px-[210px] flex items-end justify-center" style={{ backgroundImage: `url(${userProfile.coverImage})` }} >
                    <div className={"bg-white flex justify-between w-full rounded-xl relative  top-24 z-0  shadow-sm mr-4 h-[163px] mb-4 dark:bg-[#23212b]"}>
                        <div className="flex">

                            {userProfile.profileImage ? <div className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg " style={{ backgroundImage: `url(${userProfile.profileImage})` }}>
                            </div> : <div className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg " style={{ backgroundImage: `url(${profileAvatar})` }}>
                            </div>}
                            <div className="flex flex-col absolute left-[20%] top-4 w-2/6 h-auto">
                                <div className="flex items-center justify-between  mb-4">
                                    <h1 className={"text-2xl font-[600] dark:text-gray-300"}>{userProfile.userName}</h1>
                                    <p className={"text-[#828282] text-[14px] dark:text-[#828282]"}><span className={"font-[600] text-black dark:text-gray-300"}>{userProfile.following.length}</span> following</p>
                                    <p className={"text-[#828282] text-[14px] dark:text-[#828282]"}><span className={"font-[600] text-black dark:text-gray-300"}>{userProfile.followers.length}</span>  followers</p>
                                </div>
                                <div>
                                    <p className={"text-[#828282] dark:font-medium"}>{userProfile.bio ? userProfile.bio : "You have no bio yet!"}</p>
                                </div>
                            </div>
                        </div>
                        <button className="bg-[#2F80ED] text-white h-max flex items-center justify-between py-1 px-5 capitalize rounded-sm mt-5 mx-10" onClick={toggleIsEditing}>
                            <EditOutlinedIcon fontSize="small" className="mr-2" /> edit Profile
                        </button>
                    </div>
                </div> : <div className="w-full  mt-16 h-[294px] bg-no-repeat bg-cover  px-[210px] flex items-end justify-center" style={{ backgroundImage: `url(${backgroundCover})` }} >
                    <div className={"bg-white flex justify-between w-full rounded-xl relative  top-24 z-0  shadow-sm mr-4 h-[163px] mb-4 dark:bg-[#23212b] dark:shadow-md"}>
                        <div className="flex">
                            {userProfile.profileImage ? <div className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg " style={{ backgroundImage: `url(${userProfile.profileImage})` }}>
                            </div> : <div className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg " style={{ backgroundImage: `url(${profileAvatar})` }}>
                            </div>}
                            <div className="flex flex-col absolute left-[20%] top-4 w-2/6 h-auto">
                                <div className="flex items-center justify-between  mb-4">
                                    <h1 className={"text-2xl font-medium dark:text-gray-300"}>{userProfile.userName}</h1>
                                    <p className={"text-[#828282] text-[14px] dark:font-medium"}><span className={"font-medium text-black dark:text-gray-300"}>{userProfile.following.length}</span> following</p>
                                    <p className={"text-[#828282] text-[14px] dark:font-medium"}><span className={"font-medium text-black dark:text-gray-300"}>{userProfile.followers.length}</span>  followers</p>
                                </div>
                                <div>
                                    <p className={"text-[#828282] dark:font-medium"}>{userProfile.bio ? userProfile.bio : "You have no bio yet!"}</p>
                                </div>
                            </div>
                        </div>
                        <button className="bg-[#2F80ED] text-white h-max flex items-center justify-between py-1 px-5 capitalize rounded-sm mt-5 mx-10" onClick={toggleIsEditing}>
                            <EditOutlinedIcon fontSize="small" className="mr-2" /> edit Profile
                        </button>
                    </div>
                </div>}
                <div className=" mt-28 flex justify-between  xl:px-52  ">
                    <div>
                        <SideSection fixLinks={props.fixSideSearch} />
                    </div>
                    {posts.length === 0 ?
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
                            {posts.map(post =>
                                <Post key={post._id} {...post} />
                            )}
                        </div>
                    }
                </div>
            </div>

        </div>
        :
        <div className={"w-full h-screen flex items-center justify-center dark:bg-[#252329]"}>
            <CircularProgress />
        </div>
}

export default CurrentProfile;