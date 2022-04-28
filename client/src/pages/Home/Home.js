import Navbar from "../../components/Navbar";
import '../../App.css';
import Post from "../../components/Post";
import TrendsForYou from "../../components/TrendsForYou";
import WhoToFollow from "../../components/WhoToFollow";
import TweepSomething from "../../components/TweepSomething";
import React,{useState,useEffect} from "react";
import post from "../../images/post.jpg";
import post2 from "../../images/post2.jpg";
import tweeper from "../../images/tweeper.jpg";
import Lois from "../../images/Lois.jpg";
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from "react-router-dom"

let Home=(props)=>{
    let navigate=useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [hasProfile, setHasProfile] = useState(false)
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
                   fetch(`http://localhost:7070/profiles/${data.user.userName}`)
                   .then(response=>response.json())
                   .then(data=>{
                      setUserProfile(data.profile)
                      setHasProfile(true)
                   }) 
                }
            })
            .catch(err=>console.error(err))
        }
    },[])

    //checking if the user is logged in
    
    // getting a user profile

 

    // getting a user profile



    // fixing who to follow section
  
    // fixing who to follow section


    if(hasProfile){
        return (
            <div className={props.darkMode?"bg-[#252329] h-auto overflow-x-hidden":"bg-[#F2F2F2] h-auto overflow-x-hidden"}>

                {userProfile.profileImage ? <Navbar toHome={true} darkMode={props.darkMode} setDarkMode={props.setDarkMode} profileImg={`http://localhost:7070/${`${userProfile.profileImage}`}`} userName={userProfile.userName}/>:<Navbar darkMode={props.darkMode} setDarkMode={props.setDarkMode} userName={userProfile.userName}/>}
                <div className=" mt-20   xl:px-52 ">
                    <div className=" h-auto flex  justify-between">
                        {/* main */}
                        <div className="mx-auto" >
                          {userProfile.profileImage ?  <TweepSomething darkMode={props.darkMode} profileImg={`http://localhost:7070/${`${userProfile.profileImage}`}`}/>:<TweepSomething darkMode={props.darkMode}/>}
                            <Post darkMode={props.darkMode} name="Peyton Lyons" profile={tweeper} createdAt='24 August at 20:43' text="Traveling-it leaves you speechless, then turns you into a storyteller." img={post} comments={449} retweeps={59004} saves={234}/>
                            <Post darkMode={props.darkMode} name="Bianca Lois" profile={Lois} createdAt='24 August at 20:43' text="“We travel, some of us forever, to seek other places, other lives, other souls.” – Anais Nin" img={post2} comments={208} retweeps={2764} saves={178}/>
                            <Post darkMode={props.darkMode} name="Mikael Stanley" createdAt='13 September at 12:41' text="Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. -Steve Jobs" comments={23} retweeps={10} saves={20}/>
                        </div>
                        {/* main */}
                        {/* side banners */}
                        <div className="md:ml-4" >
                             <TrendsForYou darkMode={props.darkMode}/>
                             <WhoToFollow fixSide={props.fixSide} darkMode={props.darkMode}/> 
                        </div>    
                        {/* side banners */}
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

export default Home