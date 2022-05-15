import Navbar from "../../components/Navbar";
import PreviewImage from "../../components/PreviewImage"
import '../../App.css';
import Post from "../../components/Post";
import TrendsForYou from "../../components/TrendsForYou";
import WhoToFollow from "../../components/WhoToFollow";
import TweepSomething from "../../components/TweepSomething";
import React,{useState,useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from "react-router-dom";
import ProcessSuccessful from "../../components/ProcessSuccessful";

let Home=(props)=>{
    let navigate=useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [hasProfile, setHasProfile] = useState(false);
    const [hasFile,setHasFile]=useState(false)
    const [finalPostEdit,setFinalPostEdit]=useState(false)
    const [posts,setPosts]=useState([])
    const [finishedPosting, setFinishedPosting] = useState(false);
    const [hasNoPost, setHasNoPost] = useState(false);
    // console.log(postData)
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
                }else if(!data.verified){
                    navigate('/verifyEmail')
                }else{
                   fetch(`http://localhost:7070/profiles/${data.user.userName}`)
                   .then(response=>response.json())
                   .then(data=>{
                      setUserProfile(data.profile)
                      setHasProfile(true)
                    fetch("http://localhost:7070/posts/")
                    .then(response=>response.json()).then(data=>{
                        if(data.areFound===false){
                            return setHasNoPost(true)
                        }
                        setPosts(data.posts)
                        setHasNoPost(false)
                    })
                   }) 
                }
            })
            .catch(err=>console.error(err))
        }
    },[])

    
        let postElements= posts.map(post=>{
            return <Post
             key={post._id}
             likesArray={post.likes}
             likes={post.likes.length}
             postId={post._id}
             darkMode={props.darkMode} 
             name={post.postedBy} 
             profile={`http://localhost:7070/${post.postedBy}Profile.png` } 
             createdAt={new Date(post.postedAt).toDateString()} text={post.text} 
             img={post.media?`http://localhost:7070/${post.media}`:undefined} 
             comments={post.comments.length} 
             retweeps={post.retweeps.length}
             retweepsArray={post.retweeps}
             saves={post.saved.length}
             savesArray={post.saved}
             commentsArray={post.comments}
             image={`http://localhost:7070/${`${userProfile.profileImage}`}`}
             currentUser={userProfile.userName}
             />
        }) 

    //checking if the user is logged in
    
    //handling image

    let file;
    const [image,setImage]=useState(null)
    let handleImage=(event)=>{
        file=event.target.files[0]
        if(file){
          let reader = new FileReader();
          reader.onload = function(event) {
            // console.log(event.target.result)
            setImage(event.target.result)

            setHasFile(true)
          };
          reader.readAsDataURL(file);
    
          // reader.readAsText(file);
        }
    }
    //handling image
    const hideEditPic=()=>{
        setHasFile(false)
        window.location.reload()
    }

    //canceling image
    let cancelImage=()=>{
        setImage(null);
        setFinalPostEdit(false);
        
    }
    //canceling image


    //finish editing

    const finishEditing=()=>{
        setFinalPostEdit(true)
        setHasFile(false)
    }

    //finish editing

    //updating dom after new post
    const updateDomPost=()=>{
        fetch('http://localhost:7070/posts').then(response=>response.json()).then(data=>{
            setPosts(data.posts)
            setHasFile(false)
        })
    }

    //updating dom after new post

    //setting finished posting

    const finishPosting=()=>{
        setFinishedPosting(true)
    }


    if(hasProfile){
        return (
            <div className={props.darkMode?"bg-[#252329] h-auto overflow-x-hidden":"bg-[#F2F2F2] h-auto overflow-x-hidden"}>
                {finishedPosting && <ProcessSuccessful message={'Your post was successfully uploaded!'}/>}
                <PreviewImage aspect={4/3} message={"post"} hasFile={hasFile} image={image} hideEditPic={hideEditPic} finishEditing={finishEditing}/>
                {userProfile.profileImage ? <Navbar toHome={true} darkMode={props.darkMode} setDarkMode={props.setDarkMode} profileImg={`http://localhost:7070/${`${userProfile.profileImage}`}`} userName={userProfile.userName}/>:<Navbar darkMode={props.darkMode} setDarkMode={props.setDarkMode} userName={userProfile.userName}/>}
                <div className=" mt-20   xl:px-52 ">
                    <div className=" h-auto flex  justify-between">
                        {/* main */}
                        <div className="mx-auto" >
                          {userProfile.profileImage ?  <TweepSomething  cancelImage={cancelImage} finishPosting={finishPosting} updateDomPost={updateDomPost} finalPostEdit={finalPostEdit} image={image} userName={userProfile.userName} handleImage={handleImage} darkMode={props.darkMode} profileImg={`http://localhost:7070/${`${userProfile.profileImage}`}`}/>:<TweepSomething updateDomPost={updateDomPost} darkMode={props.darkMode}/>}

                            {hasNoPost?<p className={'text-2xl font-bold text-gray-'}>no posts yet!</p>:postElements}
                        </div>
                        {/* main */}
                        {/* side banners */}
                        <div className="md:ml-4" >
                             <TrendsForYou darkMode={props.darkMode}/>
                             <WhoToFollow currentUser={userProfile.userName} fixSide={props.fixSide} darkMode={props.darkMode}/>
                        </div>
                        {/* side banners */}
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className={props.darkMode?"w-full bg-[#252329] h-screen flex items-center justify-center":"w-full h-screen flex items-center justify-center"}>
                 <CircularProgress/>
            </div>
        )
    }
}

export default Home