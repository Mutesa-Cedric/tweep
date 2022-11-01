import CameraAltIcon from '@mui/icons-material/CameraAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import React, { useEffect, useState } from "react";
import PreviewImage from "../../components/PreviewImage";
import axios from "../../../axios.config";
import useAuth from "../../hooks/useAuth"

const EditProfile = (props) => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState({
        userName: "",
        email: "",
        bio: ""
    })

    useEffect(() => {
        if (user) {
            setProfileData({
                userName: user.userName,
                email: user.email,
                bio: user.bio ? user.bio : ""
            });
            console.log(user)
        }
    }, [user])
    //states

    const [profileImage, setProfileImage] = useState(user.profileImage)
    const [coverImage, setCoverImage] = useState(user.coverImage)
    const [cropProfile, setCropProfile] = useState(false);
    const [cropCover, setCropCover] = useState(false);
    const [isCropping, setIsCropping] = useState(false);
    const [profileToCrop, setProfileToCrop] = useState(null);
    const [coverToCrop, setCoverToCrop] = useState(null);
    const [finishedProfile, setFinishedProfile] = useState(false);
    const [finishedCover, setFinishedCover] = useState(false);

    //states

    function updateProfileData(event) {
        let { name, value } = event.target;
        setProfileData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    //posting edited profile

    //profile image
    async function postProfile() {
        await axios.post(`/profiles/profileImg/${user.userName}`, {
            profileString: profileToCrop
        })
    }

    //post image
    async function postCover() {
        await axios.post(`/profiles/cover/${user.userName}`, {
            coverString: coverToCrop
        })
    }

    //post image

    //posting form data
    async function postForm(data) {
        await axios.patch(`/profiles/updateProfile/${user.userName}`, {
            userName: data.userName,
            email: data.email,
            bio: data.bio
        })
    }


    //controlling posting process
    let myTestString = /^\s*$/
    console.log(myTestString.test(profileData.bio))

    function controlPosting() {
        if ((profileData.userName !== user.userName && profileData.userName !== '' || profileData.email !== props.user.email || profileData.bio !== user.bio && !myTestString.test(profileData.bio)) && profileImage !== user.profileImage && coverImage !== user.coverImage) {
            postForm(profileData)
            postProfile(profileImage)
            postCover(coverImage)
            props.successAll()
            props.updateDom()
        } else if ((profileData.userName !== user.userName || profileData.email !== props.user.email || profileData.bio !== user.bio) && profileImage !== user.profileImage) {
            postForm(profileData)
            postProfile(profileImage)
            props.successProfile()
            setTimeout(() => {
                props.successAbout()
            }, 1000)
            props.updateDom()

        } else if ((profileData.userName !== user.userName || profileData.email !== props.user.email || profileData.bio !== user.bio) && coverImage !== user.coverImage) {
            postForm(profileData)
            postCover(coverImage)
            props.successCover()
            setTimeout(() => {
                props.successAbout()
            }, 1000)
            props.updateDom()
        } else if (profileData.userName !== user.userName || profileData.email !== props.user.email || profileData.bio !== user.bio) {
            postForm(profileData)
            props.successAbout()
            props.updateDom()

        } else if (profileImage !== user.profileImage) {
            postProfile(profileImage)
            props.successProfile()
            props.updateDom()

        } else if (coverImage !== user.coverImage) {
            postCover(coverImage)
            props.successCover()
            props.updateDom()

        }
    }

    //controlling posting process

    // let myProfile=document.getElementById('profileImage')
    //editing profile
    useEffect(() => {
        if (profileImage !== user.profileImage) {
            setIsCropping(true)
            let fileReader = new FileReader()
            fileReader.onload = (e) => {
                setProfileToCrop(e.target.result)
            }
            fileReader.readAsDataURL(profileImage)
            setIsCropping(true)
            setCropProfile(true)
            setCropCover(false)
        }
    }, [profileImage])

    //editing cover
    useEffect(() => {
        if (coverImage !== user.coverImage && coverImage !== null) {
            setIsCropping((prevState) => !prevState)
            let fileReader = new FileReader()
            fileReader.onload = (e) => {
                setCoverToCrop(e.target.result)
            }
            fileReader.readAsDataURL(coverImage)
            setIsCropping(true)
            setCropCover(true)
            setCropProfile(false)
        }
    }, [coverImage])


    //finish editing

    const finishEditingProfile = () => {
        setIsCropping(false)
        setFinishedProfile(true)
    }

    const finishEditingCover = () => {
        setIsCropping(false)
        setFinishedCover(true)
    }

    //finish editing

    //showing or hiding image cropper
    // console.log(profileData)

    if (isCropping) {
        return <>
            {cropProfile && <PreviewImage hasFile={true} aspect={2 / 1.3} finishEditing={finishEditingProfile}
                message={'Profile image'} image={profileToCrop} />}
            {cropCover &&
                <PreviewImage hasFile={true} aspect={2 / 2} message={'Cover image'} finishEditing={finishEditingCover}
                    image={coverToCrop} />}
        </>
    }

    return (
        <div>
            <div className="fixed z-[100] inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                        className="fixed justify-center items-center inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
                        aria-hidden="true">
                        <div
                            className={"border-2 border-gray-400  bg-gray-800 shadow-xl flex flex-col w-2/6 h-[75%] mx-auto my-24 rounded-xl"}>
                            <div className={"bg-cover bg-no-repeat bg-center rounded-t-xl h-56 relative"}
                                id={"coverImageHolder"}
                                style={{ backgroundImage: finishedCover ? `url(${coverToCrop})` : `url(${user.coverImage})` }}>
                                <div
                                    className={'absolute px-4 w-full flex  items-center justify-between top-2 font-bold text-white z-10'}>
                                    <KeyboardBackspaceIcon fontSize={'large'}
                                        className={'cursor-pointer hover:bg-white hover:text-gray-800 rounded-2xl text-gray-200'}
                                        onClick={props.toggleIsEditing} />
                                    <button
                                        className={'bg-white text-gray-900 text-xl px-4 py-[2px] rounded-2xl hover:text-white hover:bg-gray-800 flex items-center'}
                                        onClick={controlPosting}>
                                        <span>Save</span>
                                    </button>
                                </div>

                                <div
                                    className={'cursor-pointer  w-full h-full flex rounded-t-xl flex-col text-white relative font-medium items-center justify-center bg-gray-700 opacity-80'}>
                                    <CameraAltIcon fontSize={'large'} style={{ fill: "white" }} className={'z-10'} />
                                    <p>Choose Cover</p>
                                    <form id={'coverImageForm'} className={'w-full h-full absolute'}>
                                        <input type={"file"}
                                            id={'coverImage'}
                                            className={' opacity-0 left-0 absolute w-full z-10 h-full cursor-pointer'}
                                            onChange={(e) => setCoverImage(e.target.files[0])} />
                                    </form>
                                </div>
                            </div>

                            <div
                                className={'h-24 w-24 rounded-[50%] absolute top-[36%] left-[46.5%] shadow-xl bg-center bg-no-repeat bg-cover'}
                                style={{ backgroundImage: finishedProfile ? `url(${profileToCrop})` : `url(${user.profileImage})`, backgroundPosition: "center" }}>
                                <div
                                    className={'cursor-pointer w-full h-full flex flex-col text-white rounded-[50%] relative font-medium items-center justify-center bg-gray-700 opacity-80'}>
                                    <CameraAltIcon fontSize={'large'} style={{ fill: "white" }}
                                        className={'opacity-100'} />
                                    <p>Profile</p>
                                    <form id={'profileImageForm'}
                                        className={' absolute w-full h-full rounded-[50%]'}>
                                        <input type={"file"}
                                            id={'profileImage'}
                                            className={'opacity-0 left-0 rounded-[50%] z-10 absolute w-full h-full cursor-pointer'}
                                            onChange={(e) => setProfileImage(e.target.files[0])} />
                                    </form>
                                </div>
                            </div>
                            {/*}*/}
                            <form
                                className={'text-white relative top-20 px-5 pb-8 flex flex-col items-center justify-evenly h-64'}>
                                <input
                                    required={true}
                                    name={'userName'}
                                    value={profileData.userName}
                                    onInput={updateProfileData}
                                    type={"text"}
                                    placeholder={'UserName'}
                                    className={'h-12 focus:outline-none pl-6 rounded-2xl bg-inherit border-2 mt-4  w-full '} />
                                <input
                                    required={true}
                                    type={"email"}
                                    name={'email'}
                                    onInput={updateProfileData}
                                    value={profileData.email}
                                    placeholder={'Email'}
                                    className={'h-12  pl-6 w-full focus:outline-none  rounded-2xl bg-inherit border-2 mt-4'} />
                                <input
                                    name={'bio'}
                                    value={profileData.bio}
                                    onInput={updateProfileData}
                                    required={true}
                                    type={"text"}
                                    placeholder={'Bio'}
                                    className={'h-12 pl-6  w-full focus:outline-none  rounded-2xl bg-inherit border-2 mt-4'} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;