
import Navbar from '../../components/Navbar';
import React , {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SideSection from '../../components/SideSection';
import Post from '../../components/Post';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditProfile from "./EditProfile";
import ProcessSuccessful from "../../components/ProcessSuccessful";
import PreviewImage from "../../components/PreviewImage";
const  CurrentProfile=(props)=>{
    let navigate=useNavigate()
    //states
    const [userProfile, setUserProfile] = useState({})
    const [hasProfile, setHasProfile] = useState(false)
    const [posts,setPosts]=useState([])
    const [hasNoPost,setHasNoPost]=useState(false)
    const [isEditing,setIsEditing]=useState(false)
    const [user,setUser]=useState({})
    const [successStatus, setSuccessStatus] = useState({
        coverSuccessful:false,
        profileSuccessful:false,
        aboutSuccessful:false,
        allSuccessful:false
    });
    //states

    console.log("actual profile:")
    console.log(userProfile)

    // console.log(isEditing)
    //checking if the user is logged in
    useEffect(()=>{
        const accessToken=window.localStorage.getItem("accessToken")
        if(!accessToken){
            navigate('/auth/signup')
        }else{
            fetch(`http://localhost:7070/auth/verifyToken/${accessToken}`)
                .then(response=>response.json())
                .then(data=>{
                    if(!data.authorized){
                        navigate('/auth/login')
                    }else{
                        setUser(data.user)
                        // getting a user profile
                        fetch(`http://localhost:7070/profiles/${data.user.userName}`)
                            .then(response=>response.json())
                            .then(data=>{
                                setUserProfile(data.profile)
                                setHasProfile(true)

                                //getting the posts of a user
                                fetch(`http://localhost:7070/posts/${data.profile.userName}`).then(response=>response.json())
                                    .then(data=>{
                                        if(data.posts.length===0){
                                            setHasNoPost(true)
                                        }else{
                                            setPosts(data.posts)
                                        }
                                    }).catch(err=>console.error(err))

                                //getting the posts of a user

                            })
                    }
                })
                .catch(err=>console.error(err))
        }
    },[])
    //checking if the user is logged in

    //creating post elements
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
            image={`http://localhost:7070/${`${userProfile.profileImage}`}`}
            currentUser={userProfile.userName}
        />
    });


    //handling profile editing

    const toggleIsEditing=()=>{
        setIsEditing(prevState => {
            return !prevState;
        })
    }
    //handling profile editing

    //handling success message
    let successProfile=()=>{
        setIsEditing(false)
        setSuccessStatus(()=>{
            return {
                profileSuccessful: true,
                coverSuccessful: false,
                aboutSuccessful: false,
                allSuccessful: false
            }
        })
    }

    let successCover=()=>{
        setIsEditing(false)
        setSuccessStatus(()=>{
            return {
                profileSuccessful: false,
                coverSuccessful: true,
                aboutSuccessful: false,
                allSuccessful: false
            }
        })
    }

    let successAbout=()=>{
        setIsEditing(false)
        setSuccessStatus(()=>{
            return {
                profileSuccessful: false,
                coverSuccessful: false,
                aboutSuccessful: true,
                allSuccessful: false
            }
        })
    }

    let successAll=()=>{
        setIsEditing(false)
        setSuccessStatus(()=>{})
        return {
            profileSuccessful: false,
            coverSuccessful: false,
            aboutSuccessful: false,
            allSuccessful: true
        }
    }

    //handling success message

    //auto updating content
    const updateDom=()=>{
        fetch(`http://localhost:7070/profiles/${user.userName}`).then(response=>response.json()).then(data=>{
            if(data.isFound){
                // setUserProfile(data.profile)
                // console.log("updated profile:")
                // console.log(userProfile)
                setTimeout(()=>{
                    window.location.reload()
                },3000)
            }
        }).catch(err=>console.error(err))
    }

    //auto updating content

    if(hasProfile){
        return (
            <div className={props.darkMode?"bg-[#252329] h-screen overflow-x-hidden":"relative bg-[#F2F2F2] h-screen overflow-x-hidden"}>
                {isEditing && <EditProfile updateDom={updateDom} successProfile={successProfile} successAll={successAll} successAbout={successAbout} successCover={successCover}  userProfile={userProfile} user={user} toggleIsEditing={toggleIsEditing}/>}
                {userProfile.profileImage ? <Navbar  darkMode={props.darkMode} setDarkMode={props.setDarkMode} profileImg={`http://localhost:7070/${`${userProfile.profileImage}`}`} userName={userProfile.userName}/>:<Navbar darkMode={props.darkMode} setDarkMode={props.setDarkMode} userName={userProfile.userName}/>}
                {successStatus.profileSuccessful && <ProcessSuccessful message={'profile image updated successfully!!'}/>}
                {successStatus.coverSuccessful && <ProcessSuccessful message={'cover image Updated successfully'}/>}
                {successStatus.aboutSuccessful && <ProcessSuccessful message={'your \" about \" was updated successfully!'}/>}
                {successStatus.allSuccessful && <ProcessSuccessful message={'your Profile was updated successfully'}/>}
                <div >
                    <div className="w-full  mt-16 h-[294px] bg-no-repeat bg-cover  px-[210px] flex items-end justify-center" style={{backgroundImage:`url(http://localhost:7070/${userProfile.coverImage})`}} >
                        <div className={props.darkMode?"bg-[#23212b] mb-4 flex justify-between  w-full rounded-xl relative top-24  shadow-md mr-4 h-[163px]":"bg-white flex justify-between w-full rounded-xl relative  top-24 z-0  shadow-sm mr-4 h-[163px] mb-4"}>
                            <div className="flex">
                                <div className="w-[152px] h-[152px] bg-no-repeat bg-cover absolute left-[2.5%] bottom-[35%] rounded-lg " style={{backgroundImage:`url(http://localhost:7070/${userProfile.profileImage})`}}>
                                </div>
                                <div className="flex flex-col absolute left-[20%] top-4 w-2/6 h-auto">
                                    <div className="flex items-center justify-between  mb-4">
                                        <h1 className={props.darkMode?"text-2xl font-[600] text-gray-300":"text-2xl font-[600]"}>{userProfile.userName}</h1>
                                        <p className={props.darkMode?"text-[#828282] text-[14px] font-[600]":"text-[#828282] text-[14px]"}><span className={props.darkMode?"font-[600] text-gray-300":"font-[600] text-black"}>{userProfile.following}</span> following</p>
                                        <p className={props.darkMode?"text-[#828282] text-[14px] font-[600]":"text-[#828282] text-[14px]"}><span className={props.darkMode?"font-[600] text-gray-300":"font-[600] text-black"}>{userProfile.followers}</span>  followers</p>
                                    </div>
                                    <div>
                                        <p className={props.darkMode?"text-[#828282] font-[600]":"text-[#828282]"}>{userProfile.bio?userProfile.bio:"You have no bio yet!"}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-[#2F80ED] text-white h-max flex items-center justify-between py-1 px-5 capitalize rounded-sm mt-5 mx-10" onClick={toggleIsEditing}>
                                <EditOutlinedIcon fontSize="small" className="mr-2"/> edit Profile
                            </button>
                        </div>
                    </div>
                    <div className=" mt-28 flex justify-between  xl:px-52  ">
                        <div>
                            <SideSection darkMode={props.darkMode} fixLinks={props.fixSideSearch}/>
                        </div>
                        <div className="w-[745px]" >
                            <h1 className="ml-5 text-gray-500 capitalize font-medium mb-4">Your posts</h1>
                            {!hasNoPost ?postElements:"you have no posts yet"}
                        </div>
                    </div>
                </div>

            </div>
        )
    }else{
        return (
            <div className={props.darkMode?"w-full bg-[#252329] h-screen flex items-center justify-center":"w-full h-screen flex items-center justify-center"}>
                <CircularProgress/>
            </div>
        )
    }
}

export default CurrentProfile;