import CameraAltIcon from '@mui/icons-material/CameraAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import React,{useState} from "react";
import {method} from "lodash/util";

const EditProfile=(props)=>{

    const [profileData,setProfileData]=useState({
        userName:props.userProfile.userName,
        email:props.user.email,
        bio:props.userProfile.bio?props.userProfile.bio:""
    })
    const [profileImage,setProfileImage]=useState(props.userProfile.profileImage)
    const [coverImage,setCoverImage]=useState(props.userProfile.coverImage)
    const [nothingToSave,setNothingToSave]=useState(false)

    console.log(`profile image ${profileImage} cover image ${coverImage}`)

    function updateProfileData(event) {
        let {name,value}=event.target;
        setProfileData(prevState =>
        {
            return {
                ...prevState,
                [name]:value
            }
        })
    }

    //posting edited profile

    //profile image
    function postProfile(profileImage) {
        let profileImageForm=document.getElementById("profileImageForm")
        let formData=new FormData(profileImageForm)
        formData.append("profileImg",profileImage)
        fetch(`http://localhost:7070/profiles/profileImg/${props.userProfile.userName}`,{
            method:"POST",
            body:formData
        }).then(response=>response.json()).then(data=>{
            console.log(data)
        }).catch(err=>console.log(err))
    }
    //profile image

    //post image
    function postCover(coverImage) {
        let coverImageForm=document.getElementById('coverImageForm');
        let formData=new FormData(coverImageForm)
        formData.append('coverImg',coverImage)
        fetch(`http://localhost:7070/profiles/profileImg/${props.userProfile.userName}`, {
            method: "POST",
            body: formData
        }).then(response => response.json()).then(data => {
            console.log(data)
        }).catch(err => console.log(err))
    }
    //post image

    //posting form data
    function postForm(data) {
        fetch(`http://localhost:7070/profiles/updateProfile`,{
            method:'PATCH',
            headers:{
                'content-type':"application/json"
            },
            body:JSON.stringify({
                userName:data.userName,
                email:data.email,
                bio:data.bio
            })
        }).then(response=>response.json()).then(data=>{
            console.log(data)
        }).catch(err=>console.log(err))
    }
    //posting form data

    //controlling posting process

    function controlPosting() {
        if((profileData.userName!==props.userProfile.userName||profileData.email!== props.user.email||profileData.bio!==props.userProfile.bio) && profileImage!==props.userProfile.profileImage && coverImage!==props.userProfile.coverImage ){
            postForm(profileData)
            postProfile(profileImage)
            postCover(coverImage)
        }else if((profileData.userName!==props.userProfile.userName||profileData.email!== props.user.email||profileData.bio!==props.userProfile.bio) && profileImage!==props.userProfile.profileImage){
            postForm(profileData)
            postProfile(profileImage)
        }else if((profileData.userName!==props.userProfile.userName||profileData.email!== props.user.email||profileData.bio!==props.userProfile.bio) &&coverImage!==props.userProfile.coverImage){
            postForm(profileData)
            postCover(coverImage)
        }
        else if(profileData.userName!==props.userProfile.userName||profileData.email!== props.user.email||profileData.bio!==props.userProfile.bio){
            postForm(profileData)
        }else if(profileImage!==props.userProfile.profileImage){
            postProfile(profileImage)
        }else if(coverImage!==props.userProfile.coverImage){
            postCover(coverImage)
        }else {
            setNothingToSave(true)
        }
    }

    //controlling posting process

    //posting edited profile

    console.log(profileData)
    return (
        <div>
            <div className="fixed z-[100] inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                 aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed justify-center items-center inset-0 bg-gray-600 bg-opacity-75 transition-opacity" aria-hidden="true">
                        <div className={"border-2 border-gray-400  bg-gray-800 shadow-xl flex flex-col w-2/6 h-[75%] mx-auto my-24 rounded-xl" }>
                            <div className={"bg-cover bg-no-repeat bg-center rounded-t-xl h-56 relative"} style={{backgroundImage:`url(http://localhost:7070/${props.userProfile.coverImage})`}}>
                                <div className={'absolute px-4 w-full flex  items-center justify-between top-2 font-bold text-white z-10'}>
                                    <KeyboardBackspaceIcon fontSize={'large'} className={'cursor-pointer hover:bg-white hover:text-gray-800 rounded-2xl text-gray-200'} onClick={props.toggleIsEditing}/>
                                    <button className={'bg-white text-gray-900 text-xl px-4 py-[2px] rounded-2xl hover:text-white hover:bg-gray-800 flex items-center'} onClick={controlPosting}>
                                        <span>Save</span>
                                    </button>
                                </div>
                                <div className={'cursor-pointer w-full h-full flex rounded-t-xl flex-col text-white relative font-medium items-center justify-center bg-gray-700 opacity-80'}>
                                    <CameraAltIcon fontSize={'large'} style={{fill:"white"}} className={'z-10'}/>
                                    <p>Choose Cover</p>
                                    <form id={'coverImageForm'}>
                                        <input type={"file"} className={'w-full opacity-0 absolute w-full z-10 h-full cursor-pointer'} onChange={(e)=>setCoverImage(e.target.files[0])}/>
                                    </form>
                                </div>
                            </div>
                            <div className={'h-24 w-24 rounded-[50%] absolute top-[36%] left-[46.5%] shadow-xl bg-center bg-no-repeat bg-cover'} style={{backgroundImage:`url(http://localhost:7070/${props.userProfile.profileImage})`}}>
                                <div className={'cursor-pointer w-full h-full flex flex-col text-white rounded-[50%] relative font-medium items-center justify-center bg-gray-700 opacity-80'}>
                                    <CameraAltIcon fontSize={'large'} style={{fill:"white"}} className={'opacity-100'}/>
                                    <p>Profile</p>
                                    <form id={'profileImageForm'}>
                                        <input type={"file"} className={'w-full opacity-0 absolute w-full h-full cursor-pointer'} onChange={(e)=>setProfileImage(e.target.files[0])}/>
                                    </form>
                                </div>
                            </div>
                            <form className={'text-white relative top-20 px-5 pb-8 flex flex-col items-center justify-evenly h-64'}>
                                    <input
                                        required={true}
                                        name={'userName'}
                                        value={profileData.userName}
                                        onInput={updateProfileData}
                                        type={"text"}
                                        placeholder={'UserName'} className={'h-12 focus:outline-none pl-6 rounded-2xl bg-inherit border-2 mt-4  w-full '}/>
                                    <input
                                        required={true}
                                        type={"email"}
                                        name={'email'}
                                        onInput={updateProfileData}
                                        value={profileData.email}
                                        placeholder={'Email'} className={'h-12  pl-6 w-full focus:outline-none  rounded-2xl bg-inherit border-2 mt-4'}/>
                                    <input
                                        name={'bio'}
                                        value={profileData.bio}
                                        onInput={updateProfileData}
                                        required={true}
                                        type={"text"}
                                        placeholder={'Bio'} className={'h-12 pl-6  w-full focus:outline-none  rounded-2xl bg-inherit border-2 mt-4'}/>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default  EditProfile;