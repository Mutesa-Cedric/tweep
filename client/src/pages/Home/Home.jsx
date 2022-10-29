import Navbar from "../../components/Navbar";
import PreviewImage from "../../components/PreviewImage"
import '../../App.css';
import Post from "../../components/Post";
import TrendsForYou from "../../components/TrendsForYou";
import WhoToFollow from "../../components/WhoToFollow";
import TweepSomething from "../../components/TweepSomething";
import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import ProcessSuccessful from "../../components/ProcessSuccessful";
import useAuth from "../../hooks/useAuth";
import useData from "../../hooks/useData";


const Home = (props) => {
    const [hasFile, setHasFile] = useState(false)
    const [finalPostEdit, setFinalPostEdit] = useState(false)
    const [finishedPosting, setFinishedPosting] = useState(false);
    const { user, loading } = useAuth();
    const { posts, loadingPosts } = useData();


    let file;
    const [image, setImage] = useState(null)
    let handleImage = (event) => {
        file = event.target.files[0]
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                // console.log(event.target.result)
                setImage(event.target.result)

                setHasFile(true)
            };
            reader.readAsDataURL(file);
            // reader.readAsText(file);
        }
    }
    //handling image
    const hideEditPic = () => {
        setHasFile(false)
        window.location.reload()
    }

    //canceling image
    let cancelImage = () => {
        setImage(null);
        setFinalPostEdit(false);

    }
    //canceling image

    //finish editing

    const finishEditing = () => {
        setFinalPostEdit(true)
        setHasFile(false)
    }

    //finish editing

    //updating dom after new post
    const updateDomPost = () => {
        fetch(`https://mc-tweep.herokuapp.com/posts`).then(response => response.json()).then(data => {
            setPosts(data.posts)
            setHasFile(false)
        })
    }

    //updating dom after new post

    //setting finished posting

    const finishPosting = () => {
        setFinishedPosting(true)
    }

    loading ?
        <div className={"bg-[#F2F2F2] dark:bg-[#252329] h-auto overflow-x-hidden"}>
            {finishedPosting && <ProcessSuccessful message={'Your post was successfully uploaded!'} />}
            <PreviewImage aspect={4 / 3} message={"post"} hasFile={hasFile} image={image} hideEditPic={hideEditPic} finishEditing={finishEditing} />
            {user.profileImage ? <Navbar toHome={true} userName={user.userName} /> : <Navbar toHome={true} userName={user.userName} />}
            <div className=" mt-20   xl:px-52 ">
                <div className=" h-auto flex  justify-between">
                    {/* main */}
                    <div className="mx-auto" >
                        {<TweepSomething cancelImage={cancelImage} finishEditing={finishEditing} finalPostEdit={finalPostEdit} handleImage={handleImage} updateDomPost={updateDomPost} userName={user.userName} finishPosting={finishPosting} image={image} />}
                        {loadingPosts ? <CircularProgress /> :
                            posts.map(post =>
                                <Post key={post._id} post={post} />
                            )
                        }
                    </div>
                    <div className="md:ml-4" >
                        <TrendsForYou />
                        <WhoToFollow currentUser={user.userName} fixSide={props.fixSide} />
                    </div>
                    {/* side banners */}
                </div>
            </div>
        </div> :
        <div className={"w-full h-screen flex items-center justify-center dark:bg-[#252329]"}>
            <CircularProgress />
        </div>
}

export default Home