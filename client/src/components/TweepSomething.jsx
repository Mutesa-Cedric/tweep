import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { Modal } from "@mui/material";
import React, { useState, useEffect } from "react";

let TweepSomething = (props) => {
    let postForm = document.getElementById("postForm")
    let file = document.getElementById("file")
    const [finishedPosting, setFinishedPosting] = useState(false);
    const [noThingToPost, setNoThingToPost] = useState(false);
    const [profileImage, setProfileImage] = useState('')
    const [hasProfileImage, setHasProfileImage] = useState(false)
    const [imageToPost, setImageToPost] = useState('')
    //getting profile of a user

    console.log(props)
    fetch(`https://mc-tweep.herokuapp.com/profiles/${props.userName}`).then(res => res.json()).then(data => {
        // console.log(data.profile)
        if (data.profile.profileImage) {
            setProfileImage(data.profile.profileImage)
            setHasProfileImage(true)
        }
    }, [])

    //getting profile of a user

    const handlePostSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData(postForm)
        formData.append('postedAt', `${new Date().getTime()}`)
        formData.append('postedBy', props.userName);
        // formData.append("media", file.files[0])

        if (file.files[0] === undefined) {
            fetch(`https://mc-tweep.herokuapp.com/posts/newPostWithoutImage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: formData.get('text'),
                    postedAt: formData.get('postedAt'),
                    postedBy: formData.get('postedBy')
                })
            }).then(response => response.json()).then(data => {
                if (data.saved === true) {
                    props.updateDomPost()
                    let textArea = document.getElementById('textarea')
                    textArea.textContent = null
                    textArea.value = null
                    props.cancelImage()
                    props.finishPosting()
                    window.location.reload()
                }
            }).catch(err => console.error(err))
        }
        else {
            let reader = new FileReader();
            reader.onload = function (event) {
                setImageToPost(event.target.result)
            };
            reader.readAsDataURL(file.files[0]);
            formData.append("media", imageToPost)
            fetch(`https://mc-tweep.herokuapp.com/posts/newPost/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postedAt: `${new Date().getTime()}`,
                    postedBy: props.userName,
                    media: props.image,
                    text: formData.get('text')
                })
            }).then(response => response.json())
                .then(data => {
                    if (data.saved === true) {
                        props.updateDomPost()
                        let textArea = document.getElementById('textarea')
                        textArea.textContent = null
                        textArea.value = null
                        props.cancelImage()
                        props.finishPosting()
                        props.updateDomPost()
                        window.location.reload()
                    }
                }).catch(err => console.log(err))
        }
    }

    return (
        <div className={"w-[650px] mx-auto sm:mx-4 mb-10 bg-white h-auto shadow-sm rounded-xl px-6 dark:bg-inherit dark:shadow-xl"}>
            <div className="w-full border-b-[1.5px]">
                <p className={"text-[#4F4F4F] font-[600] text-[14px] py-2 dark:text-white"}>Tweep something</p>
            </div>
            <form id="postForm" onSubmit={handlePostSubmit} onLoad={(e) => e.preventDefault()} encType="multipart/form-data">
                <div className="flex items-center mt-3">
                    {hasProfileImage ? <img src={profileImage} alt="profile" className="w-[36px] h-[36px] rounded-md mr-4" /> : <PersonIcon fontSize="large" className=" rounded-[50%] w-[36px] h-[36px] mr-4 bg-gray-200" style={{ fill: "#808080" }} />}
                    <textarea placeholder="what 's happening?" className={"placeholder:text-[#BDBDBD] focus:outline-none border-none w-full h-full bg-inherit dark:text-white"}
                        name="text"
                        id={"textarea"}
                    />
                </div>
                <div className="w-full mt-6 h-auto pl-12 flex items-center justify-between">
                    <div className="w-full flex items-center mb-4">
                        {props.finalPostEdit ?
                            <div className="relative flex">
                                <img src={props.image} alt="media" className="w-10 h-10" />
                                <CancelIcon fontSize="small" style={{ fill: "black" }} className="absolute left-7 hover:cursor-pointer   bottom-7" onClick={props.cancelImage} />
                            </div>
                            :
                            <label className=" w-20 mr-2 flex items-center h-max">
                                <ImageOutlinedIcon style={{ fill: "#2F80ED" }} fontSize="small" className="cursor-pointer" />
                                <span className='text-[#2F80ED] mx-2 cursor-pointer'>photo</span>
                                <input type="file" className="opacity-0" onChange={props.handleImage} name="media" id="file" />
                            </label>

                        }
                        <PublicIcon style={{ fill: "#2F80ED" }} fontSize="small" className="ml-2" />
                        <p className="text-[#2F80ED] text-[14px] cursor-pointer font-medium">Everyone can reply</p>
                    </div>
                    <div>
                        <button type="submit" className={"text-white text-[14px] font-medium bg-[#2F80ED] rounded-[4px] px-6 py-[6px]"} onClick={props.tweepPost}>Tweep</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default TweepSomething;