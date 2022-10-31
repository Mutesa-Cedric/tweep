import Navbar from "../../components/Navbar";
import PreviewImage from "../../components/PreviewImage"
import '../../App.css';
import Post from "../../components/Post";
import TrendsForYou from "../../components/TrendsForYou";
import WhoToFollow from "../../components/WhoToFollow";
import TweepSomething from "../../components/TweepSomething";
import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
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
    const cancelImage = () => {
        setImage(null);
        setFinalPostEdit(false);

    }

    //finish editing

    const finishEditing = () => {
        setFinalPostEdit(true)
        setHasFile(false)
    }


    //setting finished posting

    const finishPosting = () => {
        setFinishedPosting(true)
    }

    return (
        <div className={"bg-[#F2F2F2] dark:bg-[#252329] h-auto overflow-x-hidden min-h-screen"}>
            {loading || !user ?
                <div className={"w-full h-screen flex items-center justify-center dark:bg-[#252329]"}>
                    <CircularProgress />
                </div> :
                <>
                    <PreviewImage aspect={4 / 3} message={"post"} hasFile={hasFile} image={image} hideEditPic={hideEditPic} finishEditing={finishEditing} />
                    {user.profileImage ? <Navbar toHome={true} /> : <Navbar toHome={true} userName={user.userName} />}
                    <div className=" mt-20   xl:px-52 ">
                        <div className=" h-auto flex  justify-between">
                            {/* main */}
                            <div className="mx-auto" >
                                {<TweepSomething cancelImage={cancelImage} finishEditing={finishEditing} finalPostEdit={finalPostEdit} handleImage={handleImage} userName={user.userName} finishPosting={finishPosting} image={image} />}
                                {loadingPosts  ? <CircularProgress /> :
                                    posts.map(post => (
                                        <Post key={post._id} {...post} />
                                    ))
                                }
                            </div>
                            <div className="md:ml-4" >
                                <TrendsForYou />
                                <WhoToFollow currentUser={user.userName} fixSide={props.fixSide} />
                            </div>
                            {/* side banners */}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
export default Home